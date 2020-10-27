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
          .append("circle") // Adicione um novo rect para cada novo elemento
          .merge(u) // obter os elementos já existentes também
          .transition() // e aplicar mudanças a todos eles
          .duration(1000)
            .attr('cy', d => this.yScale(d.cy))
            .attr('cx', d => this.xScale(d.cx))
            .attr('r', this.circleRadius)
            .attr('class', 'circle')
            .style("fill", "#69b3a2");

    // Se houver menos grupo no novo conjunto de dados, excluo aqueles que não estão mais em uso
    u.exit().remove()
  }

}