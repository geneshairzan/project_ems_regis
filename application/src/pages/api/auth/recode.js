import prisma from "@/component/gh/helper/orm";
import { getSimpleToken } from "@gh/helper/encryption";

import axios from "axios";

import { render } from "@react-email/render";
import WelcomeTemplate from "@/component/email/template/main";
import { sendEmail } from "@/component/email/mailer-node";

export default async function handler(r, res) {
  if (r.method == "POST") {
    let user = await prisma.where("user", { email: r.body.email });

    if (user) {
      await prisma.findOrCreate("user", { email: r.body.email }, { token: getSimpleToken() }, {});
      return res.status(200).json({ message: "recode" });
    }

    return res.status(400).json({ message: "err" });
  }
}
