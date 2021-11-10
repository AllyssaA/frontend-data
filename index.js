console.log('hello world')

function getData() {
  d3.json('https://www.fruityvice.com/api/fruit/all')
    .then(x => {
      console.log(x)
    })
}

getData()

// d3.select('.circle').text('Hello mamallyssa')
const svg = d3.select('svg') 
svg.style("border", "2px dotted red")


svg.append('circle')
    .attr("cx", 19)
    .attr("cy", 25)
    .attr("r", 20)
    .style("fill", "red")

svg.append('rect')
  .attr("width", 20)
  .attr("height", 20)
  .attr("x", 19)
  .attr("y", 25)
  .style("fill", "yellow")
  .style("stroke", "black")
  .style("stroke-width", 2)
