import { extendPrisma, prisma, getschemaname } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  let data = await prisma[getschemaname(r.query?.model)].findMany({
    where: {
      deleted_at: {
        not: null,
      },
    },
  });
  res.status(200).json(data);
}

export default serverMiddleware(handler);
