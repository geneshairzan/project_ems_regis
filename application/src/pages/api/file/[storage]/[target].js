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
  let filePath = await path.resolve(`storage/upload/${q.storage}/${q.target}`);
  //   let file = fs.readFile(filePath);
  //   if (!file) {
  //     res.status(500).end("Error reading file");
  //     return;
  //   }

  //   // Set appropriate headers for the response
  //   res.setHeader("Content-Type", "application/octet-stream"); // Set the MIME type for the blob
  //   res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"'); // Set filename for download

  //   // Send the file data as a blob in the response
  //   res.status(200).send("data");

  var bloob = fs.readFileSync(filePath);
  return res.status(200).send(bloob);

  // if (filePath)
  //   fs.readFile(filePath, (err, data) => {
  //     if (err) {
  //       return res.status(500).end("Error reading file");
  //     }

  //     return res.status(200).send(data);
  //   });
};

// export default handler;
export default serverMiddleware(handler);
