import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";
import { parse, upload, filedelete } from "@/component/gh/helper/multipart";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  let raw = await parse(r);

  if (r.method == "POST") {
    let data = await prisma.set("registrant", {
      ...(raw.id ? { id: raw.id } : {}),
      // id: "cm77hmvs3000b5qrhmh7hw1yl",
      event_id: raw.event_id,
      name: raw.name,
      dob: new Date(raw.dob),
      kabupaten_id: raw.kabupaten_id,
      nickname: raw.name_nick,
      ingame_id: raw.game_id,
      no_hp: raw.hp,
      rank: raw.rank,
      tournament_date: parseInt(raw.tournament_date),
    });

    await upload(raw?.photo_path, `${data?.id}_photo`, "registrant");
    await upload(raw?.photo_id_path, `${data?.id}_id`, "registrant");
    await upload(raw?.photo_ss_path, `${data?.id}_ss`, "registrant");

    res.status(200).json(prisma.responseFilter(data));
  } else {
    let data = await prisma.get("registrant", {
      ...(r.query.eid ? { event_id: r.query.eid } : {}),
    });

    res.status(200).json(prisma.responseFilter(data));
  }
};

export default serverMiddleware(handler);
