const margin = {top: 40, bottom: 10, left: 120, right: 20};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creates sources <svg> element
const svg = d3.select('body').append('svg')
.attr('width', width+margin.left+margin.right)
.attr('height', height+margin.top+margin.bottom);

// Group used to enforce margin
const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)


// Global variable for all data
let data

const bar_height = 50;



d3.json('http://hp-api.herokuapp.com/api/characters').then((json) => {
  data = json

  update(data)
})

function update(newData) {
  // DATA JOIN
  const rect = g.selectAll('rect').data(newData).join(
    //enter new elements
    (enter) => {
      const rect_enter = enter.append('rect').attr('x', 0)
      rect.enter.append('title')
      return rect_enter
    },
    // update existing elements
    (update) => update,

    // elements that aren't associated with data
    (exit) => exit.remove()
)

// Enter + update old and new elements
rect
  .attr('height', bar_height)
  .attr('width', (d) => d.house * 4)
  .attr('y', (d, i) => i * (bar_height + 5))

rect.select('title').text((d) => d.name)

}

console.log(data.name)

fetch('http://hp-api.herokuapp.com/api/characters')
  .then(response => response.json())
  .then(function(data) {
    for(var i = 0; i < data.house; i++) {
      console.log(data.house[i]);
    }
  })
