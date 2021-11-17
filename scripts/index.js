import { findOcc } from "./modules/util.js";

console.log(`%cHello Allyssa`, `color: red; background-color: yellow;`);
// https://www.d3-graph-gallery.com/graph/pie_annotation.html

const URL = "https://hp-api.herokuapp.com/api/characters";

// ------------------- data magie -------------------
/**
 * @description dataset functie haalt data op met de methode d3.json
 * @param {string} url api endpoint
 * @returns {Object} returned json object
 */
const dataset = async (url) => {
  try {
    const data = d3.json(url);
    return await data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description specifieke data uit de api ophalen
 * @param {object} data opschoning data object
 * @returns returned een array van hp characters
 */
const opschoning = async (data) => {
  const vies = await data;
  try {
    return vies.map((d) => {
      const character = {
        name: d.name,
        gender: d.gender,
        house: fixSpellingMistake(d.house),
        isStaff: d.hogwartsStaff,
        isStudent: d.hogwartsStudent,
      };
      return character;
    });
  } catch (error) {
    console.error(error);
  }
};

// const test = await opschoning(dataset(URL))
// console.log(test)

async function getOccurencesOf(data, key) {
  try {
    // console.log(findOcc(data, key));
    return findOcc(data, key);
  } catch (error) {
    console.error(error);
  }
}

function fixSpellingMistake(house) {
  switch (house) {
    case "Huffleluff":
      return "Hufflepuff";
    case "Slythetin":
      return "Slytherin";
    default:
      return house;
  }
}

console.log(fixSpellingMistake("Huffleluff"));

const bibi = await getOccurencesOf(await opschoning(dataset(URL)), "gender");
const house = await getOccurencesOf(await opschoning(dataset(URL)), "house");
console.log(house);
// console.log(await bibi)

// ------------------- d3 magie ------------------- OWN
const svg = d3
  .select("body")
  .append("div")
  .attr("id", "datavisualisatie")
  .append("svg")
  .style("border", "solid 1px black");

/**
 * @Object
 * @property width {Number} Width in a numerical value
 * @property height {Number} Height in a numerical value
 * @property margin {Number} Margin in a numerical value
 */
const dim = {
  width: 450,
  height: 450,
  margin: 40,
};

const radius = Math.min(dim.width, dim.height) / 2 - dim.margin;

svg
  .attr("width", dim.width)
  .attr("height", dim.height)
  .append("g")
  .attr("transform", `translate(${dim.width / 2}, ${dim.height / 2})`);

const color = d3.scaleOrdinal().range(d3.schemeSet2);

const pie = d3.pie().value((d) => {
  return d[1];
});

// const dummy = { a: 9, b: 20, c: 30 };
const pipi = {
  male: bibi[0].amount,
  female: bibi[1].amount,
};

// const data_dum = pie(Object.entries(dummy));
const data_ready = pie(Object.entries(pipi));

const arcGenerator = d3
  .arc()
  .innerRadius(0) //why 0? innerlijk
  .outerRadius(radius); //uiterlijk?

svg
  .select("g")
  .selectAll("mySlices")
  .data(data_ready)
  .join("path")
  .attr("d", arcGenerator)
  .attr("fill", (d) => {
    return color(d.data[0]);
  }) //why the first element
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);

svg
  .select("g")
  .selectAll("mySlices")
  .data(data_ready)
  .join("text")
  .text(function (d) {
    return "gender " + d.data[0];
  })
  .attr("transform", function (d) {
    return `translate(${arcGenerator.centroid(d)})`;
  })
  .style("text-anchor", "middle")
  .style("font-size", 17);
