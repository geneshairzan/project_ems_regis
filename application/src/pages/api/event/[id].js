import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  // !r?.auth && res.status(401).json({ msg: "un autorized" });

  let model = "event";

  if (r.method === "POST") {
    res.status(200).json("under dev");
  } else {
    let data = await prisma.find(model, r.query?.id);

    const attachment = await extendPrisma.attachment.findMany({
      where: { ownerId: data.id, ownerType: "event" },
    });

    res.status(200).json(prisma.responseFilter({ ...data, attachment: attachment }));
  }
}

export default serverMiddleware(handler);
