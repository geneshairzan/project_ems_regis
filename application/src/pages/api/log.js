import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "POST") {
    if (r.body?.action == "markread") {
      let data = await prisma.updateWhere("log", { family_id: r?.auth.family_id }, { is_read: true });
      res.status(200).json(prisma.responseFilter(data));
    } else {
      let data = await prisma.set("log", {
        family_id: r?.auth.family_id,
        user: r?.auth?.id || "smarti",
        ...r.body,
      });
      res.status(200).json(prisma.responseFilter(data));
    }
  } else {
    let data = await prisma.get("log", { family_id: r?.auth.family_id });
    res
      .status(200)
      .json(
        prisma
          .responseFilter(data, ["deleted_at", "updated_at"])
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
  }
};

export default serverMiddleware(handler);
