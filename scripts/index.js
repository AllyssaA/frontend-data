import { findOcc } from "./modules/util.js";

const VISUALISATION = d3.select("body").append("div").attr("id", "graph");
const tooltip = d3.select("body").append("div").attr("class", "toolTip");
console.log(`%cHello Allyssa`, `color: red; background-color: yellow;`);
// https://www.d3-graph-gallery.com/graph/pie_annotation.html

const URL = "https://hp-api.herokuapp.com/api/characters";

// Retrieve data
async function getData(url) {
  try {
    const res = await d3.json(url);
    console.log("getData:", await res);
    return res;
  } catch (error) {
    console.error(`getData: Error at retrieving data: ${error}`);
  }
}

function fixSpellingMistake(house) {
  switch (house) {
    case "Huffleluff":
      return "Hufflepuff";
    case "Slythetin":
      return "Slytherin";
    case "":
      return "Not sorted";
    default:
      return house;
  }
}

const sanitize = async (dataset) => {
  const dirtyData = await dataset;
  // console.log('sanitize, dirtydata:',dirtyData)
  try {
    return dirtyData.map((d) => {
      const characters = {
        name: d.name,
        gender: d.gender,
        house: fixSpellingMistake(d.house),
        isStaff: d.hogwartsStaff,
        isStudent: d.hogwartsStudent,
      };
      return characters;
    });
  } catch (error) {
    console.warn("Something went wrong with sanitizing", error);
  }
};

async function getOccurencesOf(data, key) {
  try {
    // console.log(findOcc(data, key));
    return findOcc(data, key);
  } catch (error) {
    console.error(error);
  }
}

const houses = await getOccurencesOf(await sanitize(getData(URL)), "house");
console.log(houses);
// Just needed when to use a circle diagram
// const allHouses = {};
// houses.forEach((element) => {
//   // allHouses[element.house] = element.amount;
// });
// console.log(allHouses)

// ------------------------ D3 ------------------------
// Defined Size constraints
const MARGIN = { t: 20, l: 40, r: 40, b: 20 };
const HEIGHT = 600 - (MARGIN.t - MARGIN.b);
const WIDTH = 800 - (MARGIN.l - MARGIN.r);

const SVG = d3
  .select("#graph")
  .append("svg")
  .attr("height", HEIGHT + MARGIN.t + MARGIN.b)
  .attr("width", WIDTH + MARGIN.l + MARGIN.r)
  .style("border", "1px solid #FFCC00")
  .append("g")
  .attr("transform", `translate(${MARGIN.l}, ${MARGIN.t})`);

const x = d3.scaleBand().range([0, WIDTH]).padding(0.4);

const y = d3.scaleLinear().range([HEIGHT, 0]);

const xas = d3.axisBottom(x);
const xScale = SVG.append("g")
  .attr("class", "x-scale")
  .attr("transform", `translate(0, ${HEIGHT})`);

const yas = d3.axisLeft(y);
const yScale = SVG.append("g").attr("class", "y-scale");

function render(dataset) {
  x.domain(dataset.map((d) => d.house));
  y.domain([0, d3.max(dataset, (d) => d.amount)]);
  // y.domain(d3.extent(dataset)) //of ([0, d3.max(data, d => d.amount)])

  // Call the x axis
  xScale.transition().call(xas).selectAll("text");

  // Call the y axis
  yScale.call(yas);

  // Create bars, add data, join
  // populeert de grafiek met de dataset dmv rechthoeke nte creeren met de data
  const bars = SVG.selectAll("rect")
    .data(dataset)
    .join(
      // voegt rectangle toe aan de grafiek
      (enter) => enter.append("rect"),
      // wanner het wordt geupdate wordt een styling toegevoegd aan elementen
      (update) => update.style("fill", "#FFCC00"),
      // voert de volgende acties uit wanneer een element wordt verwijderd
      (exit) => exit.transition().remove()
    )
    .on("mouseover", (d) => {
      
      tooltip
        .style("left", event.pageX - 50 + "px")
        .style("top", event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(d.house + "<br>" + d.amount);
    })
    .on("mouseout", (d) => {
      tooltip.style("display", "none");
    })
    .on("mousemove", (d) => {
      tooltip.style("display", "none");
    })

  //Do some bar attributing
  bars
    .transition()
    .attr("x", (d) => {
      return x(d.house);
    })
    .attr("width", x.bandwidth())
    .attr("y", (d) => {
      return y(d.amount);
    })
    .attr("height", (d) => {
      return HEIGHT - y(d.amount);
    })
    .style("fill", "#FFCC00")
    // some tooltips
}

render(houses);
