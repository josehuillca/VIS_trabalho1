import { Dados } from './dados.js'
import { Base } from './base.js'
import { Bar } from './bar_chart.js'

function getDatasetModule(selectObject) {
  let value = selectObject.value;
  if (value=="0"){
    document.getElementById("span-dataset-choose").textContent = "Choose a dataset ..."; 
  }
  else {
    document.getElementById("span-dataset-choose").textContent = "Wait loading...";  
    main(value)
    document.getElementById("span-dataset-choose").textContent = value + " loaded.";  
  }
}

// --------------
window.getDataset = function getDataset(selectObject) {
  getDatasetModule(selectObject)
}

// ----------- Main --------
// Load by default bar-chart
async function main(selectObject) {
  let confsvg = {
    div: '#main', 
    width: 500, 
    height: 600, 
    top: 30, 
    left: 50, 
    bottom: 30, 
    right: 30
  };
  await dados.loadCSV(selectObject);
  
  let base = new Base(confsvg, dados.getData());

  let bar = new Bar(dados.getData(), confsvg);

  let scales = bar.createScales();
  base.createAxis(scales[0], scales[1]);
  let svg = base.getSvg();
  bar.render(svg);
}

// ------ Global Variables ----
let dados = new Dados();