import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  let model = "user";

  if (r.method === "POST") {
    res.status(200).json("under dev");
  } else {
    let data = await prisma.find(model, r.query?.id);
    res.status(200).json(prisma.responseFilter({ ...data, has_pwd: data?.password ? true : false }));
  }
}

export default serverMiddleware(handler);
