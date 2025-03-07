import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  // !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "POST") {
    await extendPrisma.Registrant.updateMany({
      where: {
        event_id: r.body.event_id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
  res.status(200).json("ok");
};

export default serverMiddleware(handler);
