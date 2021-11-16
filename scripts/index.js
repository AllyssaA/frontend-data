import { findOcc } from "./modules/ultilities.js";

const API = "http://hp-api.herokuapp.com/api/characters";

// Create <svg> element
const svg = d3.select("body").append("div").attr("id", "piechart");

async function getGenders(API) {
  try {
    const data = await d3.json(API);
    console.table(data);
    console.log(findOcc(data, "gender"));
    return findOcc(data, "gender");
  } catch (error) {
    console.log(error);
  }
}

const margin = 10;
const radius = 100;
const width = 460 - margin.l - margin.r;
const height = 400 - margin.t - margin.b;

let key = "gender";
//console.log(findOcc(arr, key));
console.log(getGenders);

