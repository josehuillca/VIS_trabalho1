export class Line {
  constructor(data, config) {
        this.config = config;
        this.data = data;

        this.xScale = null;
        this.yScale = null;
        this.colScale = null;
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
  setConfigAndScales(config) {
    this.config = config;
    return this.createScales()
  }

  updateChart(svg){
    let lineGenerator = d3.line()
      .x(d => this.xScale(d.cx))
      .y(d => this.yScale(d.cy));

    svg.selectAll('path')
      .transition() // Call Transition Method
      .duration(2000) // Set Duration timing (ms)
      .attr('d', lineGenerator(this.data));  
  }

  render(svg) {
    let lineGenerator = d3.line()
      .x(d => this.xScale(d.cx))
      .y(d => this.yScale(d.cy));

    svg.append("g")
      .append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator(this.data));      
  }
}