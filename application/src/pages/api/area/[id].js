import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  let model = "area";
  if (r.method === "POST") {
    res.status(200).json("under dev");
  } else {
    let data = await prisma.find(model, r.query?.id);
    res.status(200).json(prisma.responseFilter(data));
  }
}

export default serverMiddleware(handler);
