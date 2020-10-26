import { Dados } from './dados.js'
import { Base } from './base.js'
import { Bar } from './bar_chart.js'
import { Scatterplot } from './scatterplot_chart.js'
import { Line } from './line_chart.js'

async function getDatasetModule(selectObject) {
  let value = selectObject.value;
  if (value=="0"){
    document.getElementById("span-dataset-choose").textContent = "Choose a dataset ..."; 
  }
  else {
    document.getElementById("span-dataset-choose").textContent = "Wait loading...";
    if (dados.is_load()) {  
      // Load new data
      await dados.loadCSV(value);
      chart.setData(dados.getData());
      let svg = base.getSvg();
      chart.updateChart(svg);
    }
    else {
      main(value);
      console.log('main...')
    }
    document.getElementById("span-dataset-choose").textContent = value + " loaded.";  
  }
}

function setColorTypeChart(selectObject) {
  if (dados.is_load()) {
    $("div.barchart").css('border-color', '#e5e7e9');
    $("div.scatterchart").css('border-color', '#e5e7e9');
    $("div.linechart").css('border-color', '#e5e7e9');
    selectObject.style.borderColor='#f39c12';
    return true;
  }
  else {
    $( "div.warning" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    return false;
  }
}

function setConfigurationInput(config, xLabel, yLabel) {
  $('#widthID').val(config.width);
  $('#heightID').val(config.height);
  $('#bottomID').val(config.bottom);
  $('#topID').val(config.top);
  $('#leftID').val(config.left);
  $('#rightID').val(config.right);

  $('#xlabelID').val(xLabel);
  $('#ylabelID').val(yLabel);
}

function selectTypeChart(typeChart) {
  currrentChart = typeChart;

  if (base.removeSvg()) {
    base.createSvg();
    base.createMargins();
  }
  if (typeChart==='bar'){
    chart = new Bar(dados.getData(), base.getConfig());
  }
  if (typeChart==='scatter'){
    chart = new Scatterplot(dados.getData(), base.getConfig());
  }
  if (typeChart==='line'){
    chart = new Line(dados.getData(), base.getConfig());
  }

  base.createAxisLabel($('#xlabelID').val(), $('#ylabelID').val(), 'Title');
  let svg = base.getSvg();
  chart.initializeAxis(svg)
  chart.updateChart(svg);
}

// -------------- OnClickEvents -----------------
window.getDataset = function getDataset(selectObject) {
  getDatasetModule(selectObject);
}
window.barChartDiv = function barChartDiv(selectObject) {
  if (setColorTypeChart(selectObject)) {
    $('#typechartID').text('Gráfico de barras.');
    selectTypeChart('bar');
  }
}
window.scatterChartDiv = function scatterChartDiv(selectObject) {
  if (setColorTypeChart(selectObject)) {
    $('#typechartID').text('Gráfico de dispersão.');
    selectTypeChart('scatter');

  }
}
window.lineChartDiv = function lineChartDiv(selectObject) {
  if (setColorTypeChart(selectObject)) {
    $('#typechartID').text('Gráfico de linea.');
    selectTypeChart('line');
  }
}

window.configButtomDiv = function configButtomDiv(selectObject) {
  console.log('Configurar..')
  if (dados.is_load()) {
    let confsvg = {
      div: '#main', 
      width: parseInt($('#widthID').val()), 
      height: parseInt($('#heightID').val()), 
      top: parseInt($('#topID').val()), 
      left: parseInt($('#leftID').val()), 
      bottom: parseInt($('#bottomID').val()), 
      right: parseInt($('#rightID').val())
    };
    base.setConfig(confsvg);
    selectTypeChart(currrentChart);
  }
}

// ----------------------- Main --------------------------
// Load by default bar-chart
async function main(selectObject) {
  let confsvg = {
    div: '#main', 
    width: 600, 
    height: 400, 
    top: 30, 
    left: 150, 
    bottom: 30, 
    right: 30
  };
  // Fill configuration Inputs
  setConfigurationInput(confsvg, 'xAxisLabel', 'yAxisLabel')
  // Load data
  await dados.loadCSV(selectObject);
  
  base = new Base(confsvg, dados.getData());

  // Bar-chart load by default
  $('#typechartID').text('Gráfico de barras.');
  $("div.barchart").css('border-color', '#f39c12');
  selectTypeChart('line')
}

// ------ Global Variables ----
let dados = new Dados();
let base = null;
let chart = null;
let currrentChart = 'null';