import { includes } from "lodash";

export const event = {
  idType: "string",

  col: [
    { name: "name", label: "Name", w: 200 },
    { name: "desc", label: "Description", w: "auto" },
    { name: "start", label: "start date", type: "date", w: 160 },
    { name: "end", label: "end date", type: "date", w: 160 },
    // { name: "area_link", label: "area", type: "link", w: 160 },
  ],
  datamap: (d) => {
    return {
      ...d,
      area_link: {
        label: "area list",
        to: `/area?event_id=${d.id}`,
      },
    };
  },
  list: {
    deleteable: true,
  },
};
