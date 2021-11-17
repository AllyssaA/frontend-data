import {findOcc} from './modules/util.js';

console.log(`%cHello Allyssa`, `color: red; background-color: yellow;`)
// https://www.d3-graph-gallery.com/graph/pie_annotation.html

const URL = 'https://hp-api.herokuapp.com/api/characters'

// ------------------- data magie -------------------
/**
 * @description dataset functie haalt data op met de methode d3.json
 * @param {string} url api endpoint 
 * @returns {Object} returned json object
 */
const dataset = async (url) => {
    try {
        const data = d3.json(url)
        return await data
    } catch (error) {
        console.error(error)
    }
}

/**
 * @description specifieke data uit de api ophalen
 * @param {object} data opschoning data object
 * @returns returned een array van hp characters
 */
const opschoning = async (data) => {
    const vies = await data
    try {
        return vies.map(
           d => {
            const character = {
                name: d.name,
                gender: d.gender,
                house: d.house,
                isStaff: d.hogwartsStaff,
                isStudent: d.hogwartsStudent
            }
            return character  
           } 
        )
    } catch (error) {
        console.error(error)
    }
}

// const test = await opschoning(dataset(URL))
// console.log(test)

async function getOccurencesOf(data, key) {
    try {
        console.log(findOcc(data, key))
        return findOcc(data, key)
    } catch (error) {
        console.error(error)
    }
}

getOccurencesOf(await opschoning(dataset(URL)), 'gender')

// ------------------- d3 magie -------------------
const svg = d3.select('body').append('div').attr('id', 'datavisualisatie').append('svg')
    .style('border', 'solid 1px black')

/**
 * @Object
 * @property width {Number} Width in a numerical value
 * @property height {Number} Height in a numerical value
 * @property margin {Number} Margin in a numerical value
 */
const dim = {
    width: 450,
    height: 450,
    margin: 40
}

const radius = Math.min(dim.width, dim.height) / 2 - dim.margin

svg.attr('width', dim.width).attr('height', dim.height)
    .append('g')
        .attr('transform', `translate(${dim.width /2}, ${dim.height /2})`)

