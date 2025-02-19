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

const transformData = (data) => {
  return data.map((item) => ({
    ...item,
    nama: item.nama
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }));
};

const handler = async (r, res) => {
  let { _token } = r.query;
  if (_token != "223344!!") return res.status(400).send("not autorize");

  const provinsi = JSON.parse(fs.readFileSync(`storage/data/provinsi.json`, "utf8"));
  const kabupaten = JSON.parse(fs.readFileSync(`storage/data/kabupaten.json`, "utf8"));

  return res.status(200).send({
    provinsi: provinsi,
    kabupaten: kabupaten,
  });
};

export default handler;
// export default serverMiddleware(handler);
