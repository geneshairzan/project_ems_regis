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
    var bloob = fs.readFileSync(filePath);
    return res.status(200).send(bloob);
  } catch (error) {
    let filePath = await path.resolve(`storage/upload/${q.storage}/${q.target}`);
    var bloob = fs.readFileSync(filePath);
    return res.status(400).json("not found");
  }
};

// export default handler;
export default serverMiddleware(handler);
