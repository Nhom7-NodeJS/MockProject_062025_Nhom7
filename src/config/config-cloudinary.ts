import { v2 as Cloudinary } from "cloudinary";

import { loadedEnv } from "./load-env";

Cloudinary.config({
  cloud_name: loadedEnv.cloudinary.name,
  api_key: loadedEnv.cloudinary.key,
  api_secret: loadedEnv.cloudinary.secret,
});

export default Cloudinary;