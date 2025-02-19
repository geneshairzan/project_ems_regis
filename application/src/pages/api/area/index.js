import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  let model = "area";

  let { access, ...payload } = r?.body;

  if (r.method == "POST") {
    let area = await prisma.set(model, {
      ...payload,
    });

    if (access?.length) {
      await extendPrisma.AreaAccess.deleteMany({
        where: {
          area_id: area.id,
        },
      });

      await extendPrisma.AreaAccess.createMany({
        data: [
          ...access.map((d) => ({
            area_id: area.id,
            role_id: d.id,
          })),
        ],
        skipDuplicates: true,
      });
    }

    res.status(200).json(prisma.responseFilter(area));
  } else if (r.method == "DELETE") {
    let data = await prisma.update(model, r?.body);
    res.status(200).json(prisma.responseFilter(data));

    res.status(200).json(r.body);
  } else {
    let data = await prisma.get(model);
    res.status(200).json(prisma.responseFilter(data));
  }
};

export default serverMiddleware(handler);
