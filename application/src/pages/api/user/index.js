import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import enc, { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  let model = "user";

  if (r.method == "POST") {
    let data;
    let { password, ...payload } = r?.body;
    data = await prisma.set(model, {
      ...payload,
      ...(password
        ? {
            password: await enc.hashing(password),
          }
        : []),
    });

    return res.status(200).json(prisma.responseFilter(data));
  } else if (r.method == "DELETE") {
    let data = await prisma.update(model, r?.body);
    return res.status(200).json(prisma.responseFilter(data));
  } else {
    let data = await prisma.get(model);
    return res.status(200).json(
      prisma.responseFilter([
        ...data
          .sort((a, b) => (new Date(a.created_at) < new Date(b.created_at) ? 1 : -1))
          .map((d) => ({
            ...d,
            has_pwd: d?.password ? true : false,
          })),
      ])
    );
  }
};

export default serverMiddleware(handler);
