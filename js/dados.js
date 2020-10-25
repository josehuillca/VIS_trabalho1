const d3 = window.d3;

export class Dados {
  constructor() {
    this.data = [];
  }

  async loadCSV(file) {
    this.data = await d3.csv(file, d => {
      return {
        cx: d.name,
        cy: 6,
        col: 4
      }
    });
    this.data = this.data.slice(0, 1000);
    console.log(this.data)
  }

  getData() {
    return this.data;
  }
  
}