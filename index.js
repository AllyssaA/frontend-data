const margin = {top: 40, bottom: 10, left: 120, right: 20};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creates sources <svg> element
const svg = d3.select('body').append('svg')
.attr('width', width+margin.left+margin.right)
.attr('height', height+margin.top+margin.bottom);

// Group used to enforce margin
const g = svg.append('g')
.attr('transform', `translate(${margin.left},${margin.top})`);


const bar_height = 50;


d3.json('http://hp-api.herokuapp.com/api/characters').then((json) => {
  data = json

  update(data)
})

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







