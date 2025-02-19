import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  let model = "area";

  if (r.method == "POST") {
    let user = await prisma.find("user", r?.body?.user_id);
    let area = await prisma.find("area", r?.body?.area_id);
    // let is_auth = area.access.includes(user.role_id);

    if (user) {
      let is_auth = area.access.find((d) => d.role_id == user?.role_id);

      await prisma.set("activity", {
        user_id: user?.id,
        area_id: area?.id,
        status: is_auth ? 1 : 0,
      });
      res.status(200).json({
        user: prisma.responseFilter(user),
        area: prisma.responseFilter(area),
        status: is_auth ? "ok" : "not ok",
      });
    } else
      res.status(200).json({
        user: null,
        area: null,
        status: "not ok",
      });
  }
  res.status(400).json("un authorized");
};

export default serverMiddleware(handler);
