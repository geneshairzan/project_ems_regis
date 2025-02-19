export const user = {
  idType: "string",
  includes: {
    type: {
      select: {
        name: true,
      },
    },
    role: {
      select: {
        name: true,
        color: true,
      },
    },
  },
  col: [
    { name: "name", label: "Name", w: 200 },
    { name: "role", label: "role", w: 120 },
    { name: "type", label: "type", w: 120 },
    { name: "company", label: "company", w: 220 },
    { name: "email", label: "email", w: "auto" },
  ],
  datamap: (d) => {
    return {
      ...d,
      role: d.role?.name,
      type: d.type?.name,
    };
  },
};
