
export class Base {
    constructor(config) {
      this.config = config;
  
      this.svg = null;
      this.margins = null;
  
      this.xScale = null;
      this.yScale = null;
  
      this.title = 'Cars: Horsepower vs. Weight';
  
      this.createSvg();
      this.createMargins();
    }
  
    createSvg() {
      this.svg = d3.select(this.config.div)
        .append("svg")
        .attr('x', 10)
        .attr('y', 10)
        .attr('width', this.config.width + this.config.left + this.config.right)
        .attr('height', this.config.height + this.config.top + this.config.bottom);
    }
    
    removeSvg() {
      if (this.svg !== null) {
        this.svg.remove();
        return true;
      }
      return false;
    }
    getConfig() {
      return this.config;
    }
    getSvg(){
      return this.svg;
    }
    setConfig(config) {
      this.config = config;
      this.svg.attr('x', 10)
      .attr('y', 10)
      .attr('width', this.config.width + this.config.left + this.config.right)
      .attr('height', this.config.height + this.config.top + this.config.bottom);
    }
  
    createMargins() {
      this.margins = this.svg
        .append('g')
        .attr("transform", `translate(${this.config.left},${this.config.top})`)
    }

    createAxisLabel(xAxisLabel, yAxisLabel, title) {
      this.margins
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', -(this.config.height - this.config.top - this.config.bottom) / 2)
        .attr('y', -(this.config.left) / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
      
      this.margins
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', (this.config.height + 10))
        .attr('x', (this.config.width - this.config.left - this.config.right) / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
        
      this.margins
        .append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', (this.config.width - this.config.left - this.config.right) / 2)
        .text(title);
    }

}