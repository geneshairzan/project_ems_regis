import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  // !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "POST") {
    let data;
    data = await prisma.set("event", {
      ...r?.body,
      start: new Date(r?.body.start),
      end: new Date(r?.body.end),
    });

    res.status(200).json(prisma.responseFilter(data));
  } else {
    let data = await prisma.get("event");
    res.status(200).json(prisma.responseFilter(data));
  }
};

export default serverMiddleware(handler);
