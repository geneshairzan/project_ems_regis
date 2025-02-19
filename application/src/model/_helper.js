import data from "./index";

const defaultList = [
  { name: "name", label: "Name", w: 220 },
  { name: "desc", label: "Description", w: "auto" },
];

const defaultMap = (d) => {
  return {
    ...d,
  };
};

function getCol(model) {
  return data.find((d) => d.name == model)?.col || defaultList;
}

function getMap(model) {
  return data.find((d) => d.name == model)?.map || defaultMap;
}

export { getCol, getMap };
