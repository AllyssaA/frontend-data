const margin = {top: 40, bottom: 10, left: 120, right: 20};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creates sources <svg> element
const svg = d3.select('body').append('svg')
.attr('width', width+margin.left+margin.right)
.attr('height', height+margin.top+margin.bottom);

// Group used to enforce margin
const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`
  )


// Global variable for all data
const data = [66.38, 21.51, 23.37, 34.17, 36.21];
const bar_height = 50;



d3.json('http://hp-api.herokuapp.com/api/characters').then((json) => {
  data = json

  update(data)
})


// DATA JOIN
const rect = g.selectAll('rect').data(data).join(
  //enter new elements
  (enter) => enter.append('rect').attr('x', 0),
  // update existing elements
  (update) => update,
  // elements that aren't associated with data
  (exit) => exit.remove()
)


rect
  .attr('height', bar_height)
  .attr('width', (d) => d * 7)
  .attr('y', (d, i) => i * (bar_height + 5))

// fetch(`http://hp-api.herokuapp.com/api/characters`).then( 
//   x => {
//     return x.json()
//   }
// )
//   .then(
//     c => {
//     console.log(c)
  
//   }
// )







