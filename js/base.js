
export class Base {
    constructor(config) {
      this.config = config;
  
      this.svg = null;
      this.margins = null;
  
      this.xScale = null;
      this.yScale = null;
  
      this.mydata = []
      this.title = 'Cars: Horsepower vs. Weight';
  
      this.createSvg();
      this.createMargins();
    }
  
    createSvg() {
      this.svg = d3.select(this.config.div)
        .append("svg")
        .attr('width', this.config.width - this.config.left - this.config.right)
        .attr('height', this.config.height - this.config.top - this.config.bottom)
        .attr('viewBox', [0, 0, this.config.width, this.config.height]);
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
    setData(data) {
      this.mydata = data;
    }
    setConfig(config) {
      this.config = config;
      this.svg.attr('width', this.config.width - this.config.left - this.config.right)
              .attr('height', this.config.height - this.config.top - this.config.bottom)
              .attr('viewBox', [0, 0, this.config.width, this.config.height]);
    }
  
    createMargins() {
      this.margins = this.svg
        .append('g');
    }
  
    createAxis(xScale, yScale, update=false) {
      let innerWidth = this.config.width - this.config.left - this.config.right;
      let innerHeight = this.config.height - this.config.top - this.config.bottom;
      
      let xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);
  
      let yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);
      
      if (update)  {
        this.margins
        .attr("transform", `translate(0,${this.config.height - this.config.bottom})`)
          .transition().duration(1000)
          .call(d3.axisBottom(xScale));

        this.margins
        .attr("transform", `translate(${this.config.left},0)`)
          .transition().duration(1000)
          .call(d3.axisLeft(yScale));
      }
      else{
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

    createAxisLabel(xAxisLabel, yAxisLabel, title) {
      this.margins
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', this.config.left / 2)
        .attr('x', -(this.config.height - this.config.top - this.config.bottom) / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

      this.margins
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', (this.config.height + 30))
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