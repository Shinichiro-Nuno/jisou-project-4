import "@testing-library/jest-dom";

require("dotenv").config();

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

global.TextEncoder = require("util").TextEncoder;
