export class Scatterplot {
  constructor(data, config) {
    this.config = config;
    this.data = data;

    this.xScale = null;
    this.yScale = null;
    this.colScale = null;

    this.circleRadius = 10;
  }

  createScales() {
    let xValue = d => d.cx;
    let yValue = d => d.cy
    
    this.xScale = d3.scaleLinear()
      .domain(d3.extent(this.data, xValue))
      .range([this.config.left, this.config.width - this.config.right])
      .nice();
    
    this.yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, yValue))
      .range([this.config.height - this.config.bottom, this.config.top])
      .nice(); 
    
    return [this.xScale, this.yScale, null];
  }

  setData(data){
    this.data = data;
  }

  updateChart(svg){
    //Update all rects
    svg.selectAll("circle")
      .transition()
      .delay(function(d,i){return(i*3)})
      .duration(2000)
        .attr('cy', d => this.yScale(d.cy))
        .attr('cx', d => this.xScale(d.cx))
  }

  render(svg) {
    svg.append("g")
    .selectAll("circle")
    .data(this.data)
    .join('circle')
          .attr('cy', d => this.yScale(d.cy))
          .attr('cx', d => this.xScale(d.cx))
          .attr('r', this.circleRadius)
          .attr('class', 'circle');      
  }
}