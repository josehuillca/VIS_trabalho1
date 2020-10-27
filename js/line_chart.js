export class Line {
  constructor(data, config) {
        this.config = config;
        this.data = data;

        this.xScale = null;
        this.yScale = null;

        this.line = null;
        this.allGroup = null;

        this.addOptionsButton();
  }

  setData(data){
    this.data = data;
  }

  initializeAxis(svg) {
    let innerWidth = this.config.width - this.config.left - this.config.right;
    let innerHeight = this.config.height - this.config.top - this.config.bottom;

    // Add X axis --> vamos manter o eixo X constantemente
    this.xScale = d3.scaleLinear()
      .domain([1970, 1985])
      .range([this.config.left, this.config.width - this.config.right]);
    svg.append("g")
      .attr("transform", `translate(0,${this.config.height - this.config.bottom})`)
      .call(d3.axisBottom(this.xScale).ticks(7)
            .tickSize(-innerHeight)
            .tickPadding(15));

    // Add Y axis
    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.cy)])
      .range([this.config.height - this.config.bottom, this.config.top]);
    svg.append("g")
      .attr("transform", `translate(${this.config.left},0)`)
      .call(d3.axisLeft(this.yScale)
            .tickSize(-innerWidth)
            .tickPadding(10));

    // Initialize line with first group of the list
    let selected_option = $("#column_chart :selected").text();
    this.line = svg
    .append('g')
    .append("path")
      .datum(this.data.filter(function(d){return d.name==selected_option})) // ???
      .attr("d", d3.line()
        .x(d => this.xScale(d.cx_line))
        .y(d => this.yScale(d.cy))
      )
      .attr('class', 'line-path')

  }

  updateChart(selectedGroup){
    // Create new data with the selection
    let dataFilter = this.data.filter(function(d){return d.name==selectedGroup})

    // Give these new data to update line
    this.line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(d => this.xScale(d.cx_line))
          .y(d => this.yScale(d.cy))
        )
    
  }

  addOptionsButton(){
    let count = $('#column_chart option').length;
    
    if (count<=0) {
      this.allGroup = new Set(d3.map(this.data, d => d.name));
      // add the options to the button
      d3.select("#column_chart")
        .selectAll('myOptions')
        .data(this.allGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
    }
    
  }
}