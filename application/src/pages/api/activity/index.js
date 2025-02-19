import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";
import event from "../event";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  let data = await prisma.get("activity", {
    area: {
      event_id: r.query?.event_id,
    },
  });
  res.status(200).json(data);
};

export default serverMiddleware(handler);
