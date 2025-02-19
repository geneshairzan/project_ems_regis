import prisma from "@/component/gh/helper/orm";
import enc from "@gh/helper/encryption";

import { getSimpleToken } from "@gh/helper/encryption";

import axios from "axios";

import { render } from "@react-email/render";
import WelcomeTemplate from "@/component/email/template/main";
import { sendEmail } from "@/component/email/mailer-node";

export default async function handler(r, res) {
  if (r.method == "POST") {
    let user = await prisma.where("user", { email: r.body.email, token: r.body.passcode });

    if (user) {
      if (r.body.password) {
        await prisma.findOrCreate("user", { email: r.body.email }, {}, { token: null, password: r.body.password });
      }
      return res.status(200).json(prisma.responseFilter({ ...user, token: await enc.getToken(user) }));
    }
    return res.status(400).json({ message: "err" });
  }
}
