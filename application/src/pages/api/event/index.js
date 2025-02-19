import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "POST") {
    let data;
    data = await prisma.set("event", {
      ...r?.body,
      start: new Date(r?.body.start),
      end: new Date(r?.body.end),
      max_pax: parseInt(r.body.max_pax),
      ...(r.body.standing_json?.length > 0 && { standing_json: JSON.parse(r.body.standing_json) }),
      ...(r.body.group_json?.length > 0 && { group_json: JSON.parse(r.body.group_json) }),
    });

    res.status(200).json(prisma.responseFilter(data));
  } else if (r.method == "DELETE") {
    let data = await prisma.update("event", r?.body);
    res.status(200).json(prisma.responseFilter(data));

    res.status(200).json(r.body);
  } else {
    let data = await prisma.get("event");

    const dataWithAttachment = await Promise.all(
      data.map(async (d) => {
        const attachment = await extendPrisma.attachment.findMany({
          where: { ownerId: d.id, ownerType: "event" },
        });

        return {
          ...d,
          attachment: attachment,
        };
      })
    );

    res.status(200).json(prisma.responseFilter(dataWithAttachment));
  }
};

export default serverMiddleware(handler);
