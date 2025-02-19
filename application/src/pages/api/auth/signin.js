import prisma from "@/component/gh/helper/orm";
import enc from "@gh/helper/encryption";

import axios from "axios";
import { NextResponse } from "next/server";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  let user = await prisma.where("user", { email: r.body.email });

  if (user && (await enc.check(r.body.password, user?.password))) {
    return res.status(200).json(prisma.responseFilter({ ...user, token: await enc.getToken(user), is_super: 1 }));
  }
  return res.status(401).json("un autorized");
}
export default serverMiddleware(handler);

// export default withCors(handler);

// administrators@mineski.id
