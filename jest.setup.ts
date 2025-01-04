import "@testing-library/jest-dom";

require("dotenv").config();

global.structuredClone = (val) => {
  if (val === undefined) return undefined;
  return JSON.parse(JSON.stringify(val));
};

global.TextEncoder = require("util").TextEncoder;
