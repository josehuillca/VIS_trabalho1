
export class Base {
    constructor(config) {
      this.config = config;
  
      this.svg = null;
      this.margins = null;
  
      this.xScale = null;
      this.yScale = null;
  
      this.mydata = []
  
      this.createSvg();
      this.createMargins();
    }
  
    createSvg() {
      this.svg = d3.select(this.config.div)
        .append("svg")
        .attr('width', this.config.width - this.config.left - this.config.right)
        .attr('height', this.config.height - this.config.top - this.config.bottom)
        .attr('viewBox', [0, 0, this.config.width, this.config.height]);;
    }

    getSvg(){
      return this.svg;
    }
    setData(data) {
      this.mydata = data;
    }
    setScale(xScale, yScale, colScale){
      this.xScale = xScale;
      this.yScale = yScale;
      this.config = colScale;
    }
  
    createMargins() {
      this.margins = this.svg
        .append('g')
        .attr("transform", `translate(${this.config.left},${this.config.top})`)
    }
  
    createAxis(xScale, yScale) {
      let innerWidth = this.config.width - this.config.left - this.config.right;
      let innerHeight = this.config.height - this.config.top - this.config.bottom;
      
      let xAxis = d3.axisBottom(xScale)
        .ticks(15);
  
      let yAxis = d3.axisLeft(yScale)
        .ticks(15);
  
      this.margins
        .append("g")
        .attr("transform", `translate(0,${this.config.height - this.config.bottom})`)
        .call(xAxis);
  
      this.margins
        .append("g")
        .attr("transform", `translate(${this.config.left},0)`)
        .call(yAxis);
    }

}