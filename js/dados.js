const d3 = window.d3;

export class Dados {
  constructor() {
    this.data = [];

    this.load_data = false;
    this.slice = 30;
  }

  is_load() {
    return this.load_data;
  }

  async loadCSV(file) {
    this.data = await d3.csv(file, d => {
      return {
        cx: +d.horsepower,
        cy: +d.weight,
        cx_line: +d.year,
        col: 4
      }
    });
    this.data = this.data.slice(0, this.slice);
    this.load_data = true;
  }


  getData() {
    return this.data;
  }
  
}