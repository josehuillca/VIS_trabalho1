const d3 = window.d3;

export class Bar {
  constructor(w, h, data) {
    this.x = [Infinity, -Infinity],
    this.y = [Infinity, -Infinity],
    this.w = w;
    this.h = h;
    this.data = data;

    this.setAxis();
  }

  setAxis() {
    this.x= d3.scaleBand()
        .range([ 0, this.w ])
        .domain(this.data.map(function(d) { return d.cx; }))
        .padding(0.2);
    this.y = d3.scaleLinear()
        .domain([0, 13000])
        .range([ this.h, 0]);
  }

  /*async setData(data) {
    this.bins = data;
    this.y = d3.extent(this.bins);
  }*/

  render(svg) {
    svg.selectAll('mybar')
        .data(this.data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.cx); })
            .attr("y", function(d) { return y(d.cy); })
            .attr("width", this.x.bandwidth())
            .attr("height", function(d) { return this.h - y(d.cy); })
            .attr("fill", "#69b3a2")
    }
}