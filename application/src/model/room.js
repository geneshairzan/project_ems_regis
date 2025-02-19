export const room = {
  idType: "string",
  // col: [
  //   { name: "name", label: "Name", w: 220 },
  //   { name: "email", label: "Email", w: "auto" },
  // ],
  includes: {
    device: {
      include: {
        access: true,
      },
    },
    access: true,
    owner: true,
  },
  list: {
    deleteable: true,
  },
  datamap: (d) => {
    return {
      ...d,
      id: d?.id,
      name: d?.name,
      access: d?.access?.name,
      owner: d?.owner?.name,
    };
  },
};
