export const registrant = {
  idType: "string",
  includes: {},
  col: [
    { name: "name", label: "Name", w: 200 },
    { name: "status", label: "Status", w: "auto" },
  ],
  datamap: (d) => {
    return {
      ...d,
      status: d.status == 0 ? "Waiting" : "Approved",
    };
  },
  list: {
    deleteable: true,
  },
};
