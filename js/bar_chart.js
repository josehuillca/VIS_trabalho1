export class Bar {
      constructor(data, config) {
            this.config = config;
            this.data = data;

            this.xScale = null;
            this.yScale = null;
            this.xAxis = null;
            this.yAxis = null
      }

      setData(data){
            this.data = data;
      }

      initializeAxis(svg) {
            // Initialize the X axis
            this.xScale = d3.scaleBand()
                  .domain(d3.range(this.data.length))
                  .range([this.config.left, this.config.width - this.config.right])
                  .padding(0.1);
            this.xAxis = svg.append("g")
            .attr("transform", `translate(0,${this.config.height - this.config.bottom})`)

            // Initialize the Y axis
            this.yScale = d3.scaleLinear()
                  .domain([0, d3.max(this.data, d => d.cy)]).nice()
                  .range([this.config.height - this.config.bottom, this.config.top]);
            this.yAxis = svg.append("g")
                  .attr("transform", `translate(${this.config.left},0)`);
      }

      updateChart(svg){
            let innerWidth = this.config.width - this.config.left - this.config.right;
            let innerHeight = this.config.height - this.config.top - this.config.bottom;

            // Update the X axis
            this.xScale.domain(d3.range(this.data.length))
            this.xAxis.call(d3.axisBottom(this.xScale)
                              .tickSize(-innerHeight)
                              .tickPadding(15))
                              .selectAll("text")  
                              .style("text-anchor", "end")
                              .attr("dx", "-.8em")
                              .attr("dy", ".15em")
                              .attr("transform", "rotate(-90)");;

            // Update the Y axis
            this.yScale.domain([0, d3.max(this.data, d => d.cy)]);
            this.yAxis.transition().duration(1000).call(d3.axisLeft(this.yScale)
                                                            .tickSize(-innerWidth)
                                                            .tickPadding(10));

            // Create the u variable
            let u = svg.selectAll("rect")
            .data(this.data)

            u.enter()
                  .append("rect") // Add a new rect for each new elements
                  .merge(u) // get the already existing elements as well
                  .transition() // and apply changes to all of them
                  .duration(1000)
                  .attr("x", (d, i) => this.xScale(i))
                  .attr("y", d => this.yScale(d.cy))
                  .attr("width", this.xScale.bandwidth())
                  .attr("height", d => this.yScale(0) - this.yScale(d.cy))
                  .attr("fill", "#69b3a2")

            // If less group in the new dataset, I delete the ones not in use anymore
            u.exit().remove()
      }
}