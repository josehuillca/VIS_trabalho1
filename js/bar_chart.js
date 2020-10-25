export class Bar {
      constructor(data, config) {
            this.config = config;
            this.data = data;

            this.xScale = null;
            this.yScale = null;
            this.colScale = null;
      }

      createScales() {
            this.xScale = d3.scaleBand()
                  .domain(d3.range(this.data.length))
                  .range([this.config.left, this.config.width - this.config.right])
                  .padding(0.1);
            
            this.yScale = d3.scaleLinear()
                  .domain([0, d3.max(this.data, d => d.cy)]).nice()
                  .range([this.config.height - this.config.bottom, this.config.top]) 
            
            return [this.xScale, this.yScale, null];
      }

      render(svg) {
            svg.append("g")
                  .attr("fill", 'royalblue')
            .selectAll("rect")
            .data(this.data)
            .join("rect")
                  .attr("x", (d, i) => this.xScale(i))
                  .attr("y", d => this.yScale(d.cy))
                  .attr("height", d => this.yScale(0) - this.yScale(d.cy))
                  .attr("width", this.xScale.bandwidth())
                  .attr('class', 'rectangle');      
      }
}