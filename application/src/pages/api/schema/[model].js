import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  // res.status(200).json(r.query?.model || {});
  let data = await prisma.getschema(r.query?.model);
  res.status(200).json(prisma.schemaFilter(data) || {});
}

export default serverMiddleware(handler);
