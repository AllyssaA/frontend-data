console.log('hello world')

const margin = {top: 40, bottom: 10, left: 120, right: 20}
const width = 800 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom

// Create svg element
const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)


  const g = svg.append('g')
    .attr('transform', 'translate(${margin.left}, ${margin.top})')

  // global var for data
  const dataSet = [66.38, 21.51, 23.37, 34.17, 36.21]

  const barHeight = 50

// data join
const rect = g.selectAll('rect').data(dataSet).join(
  //new element
  (enter) => enter.append('rect').attr('x', 0),
  // update existing elements
  (update) => update,
  // elements that ren't associated with data
  (exit) => exit.remove()
)

// Enter and update old and new elements
rect
  .attr('height', barHeight)
  .attr('width', (d) => d * 7)
  .attr('y', (d, i) => i * (barHeight + 5))

  rect.select('title').text((d) => `value: ${d}`)
