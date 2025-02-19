import prisma from "@/component/gh/helper/orm";
import enc from "@gh/helper/encryption";

import axios from "axios";

export default async function handler(r, res) {
  if (r.method === "POST") {
    const oauth = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${r?.body.access_token}` },
    });

    if (oauth?.data || true) {
      let user = await prisma.findOrCreate("user", { email: oauth?.data.email }, { name: oauth?.data.name });
      return res.status(200).json(prisma.responseFilter({ ...user, token: await enc.getToken(user) }));
    } else {
      return res.status(401);
    }

    // return userInfo?.data ? res.status(200).json(userInfo?.data) : res.status(400).json("err");
  }
}
