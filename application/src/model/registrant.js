export const registrant = {
  idType: "string",
  includes: {},
  col: [
    { name: "name", label: "Name", w: 200 },
    { name: "email", label: "Email", w: 200 },
    // { name: "images", label: "Images", w: 200, type: "images" },
    { name: "ingame_id", label: "In Game ID", w: 200 },
    { name: "nickname", label: "nickname", w: 200 },
    { name: "rank", label: "rank", w: 200 },
    { name: "no_hp", label: "Phone", w: 200 },
    { name: "status", label: "Status", w: "auto" },
  ],
  datamap: (d) => {
    return {
      ...d,
      status: d.status == 0 ? "Waiting" : "Approved",
      images: `${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/registrant/${d.id}_ss.png`,
    };
  },
  list: {
    deleteable: true,
  },
};
