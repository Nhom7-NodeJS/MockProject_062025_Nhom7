import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinaryV2, UploadApiResponse } from "cloudinary";

import Cloudinary from "@/config/config-cloudinary";
import { MimeTypes } from "@/constants/mimetype";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";

// List of valid mimetypes
const ALLOWED_MIMETYPES = new Set<string>([
  MimeTypes.JPG,
  MimeTypes.PNG,
  MimeTypes.PDF,
]);

// Store files in memory and validate MIME type
const storage = multer.memoryStorage();
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (ALLOWED_MIMETYPES.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(`Unsupported file type: ${file.originalname} (${file.mimetype})`)
    );
  }
};

// Accept all incoming files into memory
const upload = multer({ storage, fileFilter }).any();

export const processRequestFiles = [
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupedFiles: Record<string, Express.Multer.File[]> = {};
      for (const file of req.files as Express.Multer.File[]) {
        if (!groupedFiles[file.fieldname]) {
          groupedFiles[file.fieldname] = [];
        }
        groupedFiles[file.fieldname].push(file);
      }

      // Upload files and collect their URLs
      // Each evidence can have multiple files
      const uploadResults: Record<string, string[]> = {};

      for (const [field, files] of Object.entries(groupedFiles)) {
        uploadResults[field] = [];

        for (const file of files) {
          const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = Cloudinary.uploader.upload_stream(
              { folder: "evidences" },
              (error, result) => {
                if (error || !result) {
                  return reject(
                    new AppError(
                      ErrorMessages.FILE_UPLOAD_FAILED,
                      HttpStatusCode.BAD_REQUEST,
                      ErrorCode.FILE_UPLOAD_FAILED,
                      [{
                        field: "attachments",
                        message: `Failed to upload ${file.originalname}`,
                      }]
                    )
                  );
                }
                resolve(result);
              }
            );
            stream.end(file.buffer);
          });
          uploadResults[field].push(result.secure_url);
          
        }
      }

      // Attach the upload results to request
      req.body.uploadedFiles = uploadResults;

      next();
    } catch (err: any) {
      if (err.message?.startsWith("Unsupported file type")) {
        return next(
          new AppError(
            ErrorMessages.UNSUPPORTED_FILE_TYPE,
            HttpStatusCode.BAD_REQUEST,
            ErrorCode.UNSUPPORTED_FILE_TYPE,
            [{
              field: "attachments",
              message: err.message,
            }]
          )
        );
      }

      return next(
        new AppError(
          ErrorMessages.FILE_PROCESS_FAILED,
          HttpStatusCode.BAD_REQUEST,
          ErrorCode.FILE_PROCESS_FAILED,
          [{
            field: "attachments",
            message: err.message ?? "Unexpected file processing error",
          }]
        )
      );
    }
  },
];