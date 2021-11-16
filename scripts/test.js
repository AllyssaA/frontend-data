const state = {
  data: [],
  characterList: "",
};

// function createHistogram(svgSelector) {
//   const margin = {
//     top: 40,
//     bottom: 10,
//     left: 120,
//     right: 20
//   }
//   const width = 600 - margin.left - margin.right
//   const height = 400 - margin.top - margin.bottom

//   // Create svg element
//   const svg = d3.select(svgSelector)
//     .attr('width', width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)

//     // Group used to enforce margin
//   const g = svg.append('g')
//     .attr('transform', `translate(${margin.left}, ${margin.top})`)

//   // Scales setup
//   const xscale = d3.scaleLinear().range([0, width])
//   const yscale = d3.scaleLinear().range([0, height])

//   // Axis setup
//   const xaxis = d3.axisTop().scale(xscale)
//   const g_xaxis = g.append('g').attr('class')
// }

function createPieChart(svgSelector) {
  const margin = 10;
  const radius = 100;

  // Create svg element
  const svg = d3
    .select(svgSelector)
    .attr("width", radius * 2 + margin * 2)
    .attr("height", radius * 2 + margin * 2);

  // Group used to enforce margin
  const g = svg
    .append("g")
    .attr("transform", `translate(${radius + margin},${radius + margin})`);

  const pie = d3
    .pie()
    .value((d) => d.values.length)
    .sortValues(null)
    .sort(null);
  const arc = d3.arc().outerRadius(radius).innerRadius(0);
  const cscale = d3.scaleOrdinal(d3.schemeSet3);

  function update(new_data) {
    //{key: string, values: IPerson[]}[]
    const pied = pie(new_data);
    // Render the chart with new data

    cscale.domain(new_data.map((d) => d.key));

    // DATA JOIN
    const path = g
      .selectAll("path")
      .data(pied, (d) => d.data.key)
      .join(
        // ENTER
        // new elements
        (enter) => {
          const path_enter = enter.append("path");
          // TODO register click handler to change selected sex in state and call updateApp()
          path_enter.append("title");
          return path_enter;
        }
      );

    // ENTER + UPDATE
    // both old and new elements
    path
      .attr("d", arc) // TODO set the CSS class `selected` if the current data item is the selected sex in the state
      .style("fill", (d) => cscale(d.data.key));

    path.select("title").text((d) => `${d.data.key}: ${d.data.values.length}`);
  }

  return update;
}

const genderPieChart = createPieChart("#gender");

function filterData() {
  return state.data.filter((d) => {
    if (state.characterList && d.gender !== state.characterList) {
      return false;
    }
    return true;
  });
}

function wrangleData(gender) {
  const genderPieData = ["female", "male"].map((key) => ({
    key,
    values: gender.filter((d) => d.gender === key),
  }));

  return { genderPieData };
}

function updateApp() {
  const gender = filterData();
  const { genderPieData } = wrangleData(gender);
  genderPieChart(genderPieData);
}

d3.json("http://hp-api.herokuapp.com/api/characters").then((parsed) => {
  updateApp();
});
