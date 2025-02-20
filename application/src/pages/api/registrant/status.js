import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";
import { parse, upload, filedelete } from "@/component/gh/helper/multipart";

const handler = async (r, res) => {
  if (r.method == "POST") {
    let data = await prisma.update("registrant", {
      id: r.body.id,
      status: r.body.status,
    });

    res.status(200).json(prisma.responseFilter(data));
  } else {
    res.status(200).json("");
  }
};

export default serverMiddleware(handler);
