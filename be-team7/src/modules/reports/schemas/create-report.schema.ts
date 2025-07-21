import Joi from "joi";
import { CreateIncidentReportDto } from "@/modules/reports/dto/report.dto";
import { Gender } from "@/modules/users/enums/user.enum";
import { IncidentRelationship, CrimeType, SeverityLevel } from "@/modules/reports/enums/report.enum"
import { EvidenceType } from "@/modules/evidences/enums/evidence.enum"

export const CreateReportSchema = Joi.object<CreateIncidentReportDto>({
  reporterInfo: Joi.object({
    fullname: Joi.string().required().messages({
      "string.base": "Reporter full name must be a string",
      "string.empty": "Reporter full name must not be empty",
      "any.required": "Reporter full name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Reporter email must be a string",
      "string.empty": "Reporter email must not be empty",
      "string.email": "Reporter email must be valid",
      "any.required": "Reporter email is required",
    }),
    address: Joi.string().allow(null).messages({
      "string.base": "Reporter address must be a string",
    }),
    phoneNumber: Joi.string().required().messages({
      "string.base": "Reporter phone number must be a string",
      "string.empty": "Reporter phone number must not be empty",
      "any.required": "Reporter phone number is required",
    }),
    incidentRelation: Joi.string()
      .valid(...Object.values(IncidentRelationship))
      .required()
      .messages({
        "any.only": `Relevant party relation must be one of: ${Object.values(IncidentRelationship).join(", ")}`,
        "any.required": "Reporter incident relation is required",
      }),
  }),

  incidentInfo: Joi.object({
    crimeType: Joi.string()
      .valid(...Object.values(CrimeType))
      .required()
      .messages({
      "any.only": `Crime type must be one of: ${Object.values(CrimeType).join(", ")}`,
      "any.required": "Crime type is required",
    }),
    severity: Joi.string()
      .valid(...Object.values(SeverityLevel))
      .required()
      .messages({
      "any.only": `Severity must be one of: ${Object.values(SeverityLevel).join(", ")}`,
      "any.required": "Severity is required",
    }),
    dateOccur: Joi.string().required().messages({
      "string.base": "Date occur must be a string",
      "string.empty": "Date occur must not be empty",
      "any.required": "Date occur is required",
    }),
    detailAddress: Joi.string().allow(null).messages({
      "string.base": "Detail address must be a string",
    }),
    description: Joi.string().allow(null).messages({
      "string.base": "Description must be a string",
    }),
  }),

  relevantParties: Joi.array()
    .items(
      Joi.object({
        fullname: Joi.string().allow(null).messages({
          "string.base": "Relevant party fullname must be a string",
        }),
        incidentRelation: Joi.string()
          .valid(...Object.values(IncidentRelationship))
          .required()
          .messages({
            "any.only": `Relevant party relation must be one of: ${Object.values(IncidentRelationship).join(", ")}`,
            "any.required": "Relevant party incident relation is required",
          }),
        gender: Joi.string()
          .valid(...Object.values(Gender))
          .messages({
            "any.only": `Gender must be one of: ${Object.values(Gender).join(", ")}`,
          }),
        nationality: Joi.string().allow(null).messages({
          "string.base": "Nationality must be a string",
        }),
        statement: Joi.string().allow(null).messages({
          "string.base": "Statement must be a string",
        }),
      })
    )
    .optional()
    .messages({
      "array.base": "Relevant parties must be an array",
    }),

  evidences: Joi.array()
    .items(
      Joi.object({
        evidenceType: Joi.string()
          .valid(...Object.values(EvidenceType))
          .required()
          .messages({
            "any.only": `Evidence type must be one of: ${Object.values(EvidenceType).join(", ")}`,
            "any.required": "Evidence type is required",
        }),
        evidenceLocation: Joi.string().allow(null).messages({
          "string.base": "Evidence location must be a string",
        }),
        description: Joi.string().allow(null).messages({
          "string.base": "Evidence description must be a string",
        }),
      })
    )
    .optional()
    .messages({
      "array.base": "Evidences must be an array",
    }),
});