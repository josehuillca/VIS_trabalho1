/*export class Line {
  constructor(data, config) {
        this.config = config;
        this.data = data;

        this.xScale = null;
        this.yScale = null;
        this.colScale = null;

        this.line = null;
        this.update = false;
  }

  setData(data){
    this.data = data;
  }

  initializeAxis(svg) {
    // Initialize the X axis
    this.xScale = d3.scaleLinear()
          .domain(d3.extent(this.data, d => d.cx_line))
          .range([this.config.left, this.config.width - this.config.right])
          .nice();
    this.xAxis = svg.append("g")
    .attr("transform", `translate(0,${this.config.height - this.config.bottom})`)

    // Initialize the Y axis
    this.yScale = d3.scaleLinear()
          .domain([0, d3.max(this.data, d => d.cy)])
          .range([this.config.height - this.config.bottom, this.config.top])
          .nice();
    this.yAxis = svg.append("g")
          .attr("transform", `translate(${this.config.left},0)`);
  }

  updateChart(svg){
    let innerWidth = this.config.width - this.config.left - this.config.right;
    let innerHeight = this.config.height - this.config.top - this.config.bottom;

    // Update the X axis
    this.xScale.domain(d3.extent(this.data, d => d.cx_line))
    this.xAxis.call(d3.axisBottom(this.xScale)
                      .tickSize(-innerHeight)
                      .tickPadding(15));

    // Update the Y axis
    this.yScale.domain([0, d3.max(this.data, d => d.cy)]);
    this.yAxis.transition().duration(1000).call(d3.axisLeft(this.yScale)
                                                    .tickSize(-innerWidth)
                                                    .tickPadding(10));
    console.log(d3.max(this.data, d => d.cy))
    console.log(d3.extent(this.data, d => d.cx_line))
    if (this.update) {
      let lineGenerator = d3.line()
      .x(d => this.xScale(d.cx_line))
      .y(d => this.yScale(d.cy));

      // Give these new data to update line
      svg.data(this.data)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(d => this.xScale(d.cx_line))
            .y(d => this.yScale(d.cy))
          )
    }
    else {
      this.update = true;
      let lineGenerator = d3.line()
      .x(d => this.xScale(d.cx_line))
      .y(d => this.yScale(d.cy));
      svg.selectAll('path')
        .data(this.data)
        .attr('d', lineGenerator(this.data))
        .style("stroke-width", 4)
        .style("fill", "none")

    }
    
  }
}*/

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#main")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

async function loadCSV(file) {
  let data_ = await d3.csv(file, d => {
    return {
      year: d.year,
      sex: d.sex,
      name: d.name,
      n: +d.n
    }
  });
  //data_ = data_.slice(0, 100);
  return data_;
}
//Read the data
async function render() {
 data = await loadCSV("../assets/datasets/us-population-state-age.csv");
  // List of groups (here I have one group per column)
  let allGroup = new Set(d3.map(data, d => d.name));
  console.log(allGroup)
  

  // add the options to the button
  d3.select("#column_chart")
  .selectAll('myOptions')
   .data(allGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  // Add X axis --> it is a date format
  x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(7));

  // Add Y axis
  y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.n; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Initialize line with first group of the list
  line = svg
  .append('g')
  .append("path")
    .datum(data.filter(function(d){return d.name==allGroup[0]}))
    .attr("d", d3.line()
      .x(function(d) { return x(d.year) })
      .y(function(d) { return y(+d.n) })
    )
    .attr('class', 'line-path')
}

// A function that update the chart
function update(selectedGroup) {

  // Create new data with the selection?
  var dataFilter = data.filter(function(d){return d.name==selectedGroup})

  // Give these new data to update line
  line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(+d.n) })
      )
}

let data = null;
let line = null;
let x = null;
let y = null;
let myColor = null;
render();

// When the button is changed, run the updateChart function
d3.select("#column_chart").on("change", function(d) {
  // recover the option that has been chosen
  var selectedOption = d3.select(this).property("value")
  // run the updateChart function with this selected option
  update(selectedOption)
})