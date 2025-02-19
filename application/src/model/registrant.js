export const registrant = {
  idType: "string",
  includes: {},
  col: [
    { name: "name", label: "Name", w: 200 },
    { name: "desc", label: "Description", w: "auto" },
    { name: "eventName", label: "Event", w: 200 },
    { name: "access_length", label: "Assigned Role", w: 300 },
  ],
  datamap: (d) => {
    console.log(d);
    return {
      ...d,
      eventName: d.event?.name,
    };
  },
  list: {
    deleteable: true,
  },
};
