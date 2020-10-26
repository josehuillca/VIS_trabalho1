export class Bar {
      constructor(data, config) {
            this.config = config;
            this.data = data;

            this.xScale = null;
            this.yScale = null;
            this.colScale = null;
      }

      setConfigAndScales(config) {
            this.config = config;
            return this.createScales()
      }

      createScales(update=false) {
            if (update){
                  this.xScale.domain(d3.range(this.data.length));
                  this.yScale.domain([0, d3.max(this.data, d => d.cy)]);
                  return [this.xScale, this.yScale, null];
            }
            else {
                  this.xScale = d3.scaleBand()
                        .domain(d3.range(this.data.length))
                        .range([this.config.left, this.config.width - this.config.right])
                        .padding(0.1);
            
                  this.yScale = d3.scaleLinear()
                        .domain([0, d3.max(this.data, d => d.cy)]).nice()
                        .range([this.config.height - this.config.bottom, this.config.top]) 
                  
                  return [this.xScale, this.yScale, null];  
            }
            
      }

      setData(data){
            this.data = data;
      }

      updateChart(svg){
            //Update all rects
            svg.selectAll("rect")
              .data(this.data)
              .transition() // <---- Here is the transition
              .duration(2000) // 2 seconds
              .attr("x", (d, i) => this.xScale(i))
              .attr("y", d => this.yScale(d.cy))
              .attr("height", d => this.yScale(0) - this.yScale(d.cy))
              .attr("width", this.xScale.bandwidth())
              .attr('class', 'rectangle');
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