import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import { parse, upload, filedelete } from "@/component/gh/helper/multipart";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";
import FormData from "form-data";
// import { Formidable } from "formidable";
import formidable from "formidable";

const fs = require("fs");
const path = require("path");
var _ = require("lodash");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (r, res) => {
  // !r?.auth && res.status(401).json({ msg: "un autorized" });
  // let model = "room";

  try {
    if (r.method == "POST") {
      let raw = await parse(r);

      if (raw.deleted_at) {
        let toDelete = await extendPrisma.Attachment.update({
          where: {
            id: parseInt(raw.id),
            ownerId: raw.ownerId,
            ownerType: raw.ownerType,
          },
          data: {
            deleted_at: new Date(),
          },
        });
        await filedelete(`storage/upload/${raw.ownerType}/${toDelete.path}`);
      }

      if (raw?.file) {
        let path = await upload(raw?.file, `${raw?.file.newFilename}_${raw?.file.originalFilename}`, raw.ownerType);
        await extendPrisma.Attachment.create({
          data: {
            name: raw?.file.originalFilename,
            path: path,
            ownerId: raw.ownerId,
            ownerType: raw.ownerType,
          },
        });
      }
      return res.status(200).json("uploaded");
    }
  } catch (error) {
    res.status(400).json("bad request");
  }
};

// export default handler;
export default serverMiddleware(handler);
