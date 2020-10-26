export class Scatterplot {
  constructor(data, config) {
    this.config = config;
    this.data = data;

    this.xScale = null;
    this.yScale = null;
    this.colScale = null;

    this.circleRadius = 6;
  }
  
  setData(data){
    this.data = data;
  }

  initializeAxis(svg) {
    // Initialize the X axis
    this.xScale = d3.scaleLinear()
        .domain(d3.extent(this.data, d => d.cx))
        .range([this.config.left, this.config.width - this.config.right])
        .nice();
    this.xAxis = svg.append("g")
    .attr("transform", `translate(0,${this.config.height - this.config.bottom})`)

    // Initialize the Y axis
    this.yScale = d3.scaleLinear()
        .domain(d3.extent(this.data,  d => d.cy))
        .range([this.config.height - this.config.bottom, this.config.top])
        .nice(); 
    this.yAxis = svg.append("g")
          .attr("transform", `translate(${this.config.left},0)`);
  }

  updateChart(svg){
    let innerWidth = this.config.width - this.config.left - this.config.right;
    let innerHeight = this.config.height - this.config.top - this.config.bottom;

    // Update the X axis
    this.xScale.domain(d3.extent(this.data, d => d.cx))
    this.xAxis.call(d3.axisBottom(this.xScale)
                      .tickSize(-innerHeight)
                      .tickPadding(15));

    // Update the Y axis
    this.yScale.domain(d3.extent(this.data, d => d.cy));
    this.yAxis.transition().duration(1000).call(d3.axisLeft(this.yScale)
                                                    .tickSize(-innerWidth)
                                                    .tickPadding(10));

    // Create the u variable
    let u = svg.selectAll("circle")
    .data(this.data)

    u.enter()
          .append("circle") // Add a new rect for each new elements
          .merge(u) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
            .attr('cy', d => this.yScale(d.cy))
            .attr('cx', d => this.xScale(d.cx))
            .attr('r', this.circleRadius)
            .attr('class', 'circle')
            .style("fill", "#69b3a2");

    // If less group in the new dataset, I delete the ones not in use anymore
    u.exit().remove()

    
  }

}
/*
// create 2 data_set
var data1 = [
  {group: "A", value: 4},
  {group: "B", value: 16},
  {group: "C", value: 8}
];

var data2 = [
  {group: "A", value: 7},
  {group: "B", value: 1},
  {group: "C", value: 20},
  {group: "D", value: 10}
];

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
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

// Initialize the X axis
var x = d3.scaleBand()
 .range([ 0, width ])
 .padding(0.2);
var xAxis = svg.append("g")
 .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
 .range([ height, 0]);
var yAxis = svg.append("g")
 .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(data) {

 // Update the X axis
 x.domain(data.map(function(d) { return d.group; }))
 xAxis.call(d3.axisBottom(x))

 // Update the Y axis
 y.domain([0, d3.max(data, function(d) { return d.value }) ]);
 yAxis.transition().duration(1000).call(d3.axisLeft(y));

 // Create the u variable
 var u = svg.selectAll("rect")
   .data(data)

 u
   .enter()
   .append("rect") // Add a new rect for each new elements
   .merge(u) // get the already existing elements as well
   .transition() // and apply changes to all of them
   .duration(1000)
     .attr("x", function(d) { return x(d.group); })
     .attr("y", function(d) { return y(d.value); })
     .attr("width", x.bandwidth())
     .attr("height", function(d) { return height - y(d.value); })
     .attr("fill", "#69b3a2")

 // If less group in the new dataset, I delete the ones not in use anymore
 u
   .exit()
   .remove()
}

// Initialize the plot with the first dataset
update(data2)*/