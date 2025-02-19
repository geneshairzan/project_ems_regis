import prisma from "@/component/gh/helper/orm";
import enc from "@gh/helper/encryption";
import { getSimpleToken } from "@gh/helper/encryption";

import axios from "axios";
import { NextResponse } from "next/server";
import { sendEmail } from "@/component/email/mailer-node";
import EmailTemplate from "@/component/email/template/main";
import withCors from "@/component/middleware/server/withCors";

import { render } from "@react-email/render";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  if (r.body.token) {
    let user = await prisma.where("user", { email: r.body.email, token: r.body.token });
    if (user) {
      await prisma.findOrCreate("user", { email: r.body.email }, {}, { token: null });
      res.status(200).json(prisma.responseFilter({ ...user, token: await enc.getToken(user) }));
    }
    res.status(400).json("not ok");
  } else {
    let user = await prisma.where("user", { email: r.body.email });
    if (user && user?.type_id > 1) {
      // let user = await prisma.findOrCreate("user", { email: r.body.email }, {}, { token: "1234" });
      let user = await prisma.findOrCreate("user", { email: r.body.email }, {}, { token: getSimpleToken() });
      //TODO : send email here
      await sendEmail({
        to: user.email,
        subject: `MET EMS Authentication`,
        html: render(
          EmailTemplate({
            msg: "In order to verified your email address,\n please enter code below in Application.\n",
            code: user.token,
          })
        ),
      });

      return res.status(200).json("ok");
    }
    return res.status(401).json("un autorized");
  }
}

export default serverMiddleware(handler);
