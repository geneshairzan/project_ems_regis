import prisma from "@/component/gh/helper/orm";
import { parse, upload } from "@/component/gh/helper/multipart";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";
import FormData from "form-data";
// import { Formidable } from "formidable";
import formidable from "formidable";

const fs = require("fs");
const path = require("path");
var _ = require("lodash");

const handler = async (r, res) => {
  const q = r.query;

  if (!q.target) return res.status(400).send("bad request");

  try {
    let filePath = await path.resolve(`storage/upload/${q.storage}/${q.target}`);

    const fileStream = fs.createReadStream(filePath);
    const ext = path.extname(q.target).toLowerCase();

    // Define MIME types for rendering
    const mimeTypes = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".pdf": "application/pdf",
    };

    if (q.render && mimeTypes[ext]) {
      res.setHeader("Content-Type", mimeTypes[ext]);
      return fileStream.pipe(res);
    } else {
      res.setHeader("Content-Disposition", `attachment; filename="${q.target}"`);
      return fileStream.pipe(res);
    }
  } catch (error) {
    // let filePath = await path.resolve(`storage/upload/${q.storage}/${q.target}`);
    // var bloob = fs.readFileSync(filePath);
    return res.status(400).json("not found");
  }
};

// export default handler;
export default serverMiddleware(handler);
