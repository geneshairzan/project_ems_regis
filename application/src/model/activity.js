export const activity = {
  idType: "string",
  // select:{}
  includes: {
    area: {
      select: {
        name: true,
        access: true,
        event: {
          select: {
            name: true,
          },
        },
      },
    },
    user: {
      select: {
        img: true,
        name: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    },
  },
  // col: [
  //   { name: "name", label: "Name", w: 200 },
  //   { name: "desc", label: "Description", w: "auto" },
  //   { name: "start", label: "start date", type: "date", w: 160 },
  //   { name: "end", label: "end date", type: "date", w: 160 },
  // ],
};
