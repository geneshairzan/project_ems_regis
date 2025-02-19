import prisma from "@/component/gh/helper/orm";
import { getSimpleToken } from "@gh/helper/encryption";

import axios from "axios";

import { render } from "@react-email/render";
import EmailTemplate from "@/component/email/template/main";
import { sendEmail } from "@/component/email/mailer-node";
import { Resend } from "resend";

export default async function handler(r, res) {
  if (r.method == "POST") {
    const resend = new Resend("re_4SKu8bbG_GLtm7kCR36jeZ5DVY8pjf7wm");

    let user = await prisma.where("user", { email: r.body.email });

    if (user) {
      return res.status(400).json({ message: "err" });
    }

    let passcode = getSimpleToken();

    await prisma.findOrCreate(
      "user",
      { email: r.body.email },
      { email: r.body.email, name: r.body.name, token: passcode },
      {}
    );

    await sendEmail({
      to: r.body.email,
      subject: `Welcome to ${process.env.APP_NAME}`,
      html: render(
        EmailTemplate({
          msg: "In order to verified your email address,\n please enter code below in Application.\n",
          code: passcode,
        })
      ),
    });

    return res.status(200).json({ message: "User successfully registered", next: "passcode" });
  }
}
