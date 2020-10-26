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
      let scales = chart.createScales(true);
      //base.createAxis(scales[0], scales[1], true);
      chart.updateChart(svg);

      console.log('updateBar')
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

  let scales = chart.createScales();
  base.createAxis(scales[0], scales[1]);
  base.createAxisLabel($('#xlabelID').val(), $('#ylabelID').val(), 'Title');
  let svg = base.getSvg();
  chart.render(svg);
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
    let xlabel = $('#xlabelID').val();
    let ylabel = $('#ylabelID').val();
    
    base.removeSvg();
    base.setConfig(confsvg);
    base.createSvg();
    base.createMargins();

    let scales = chart.setConfigAndScales(confsvg);
    base.createAxis(scales[0], scales[1]);
    base.createAxisLabel(xlabel, ylabel, 'Title');

    let svg = base.getSvg();
    chart.render(svg);
  }
}

// ----------------------- Main --------------------------
// Load by default bar-chart
async function main(selectObject) {
  let confsvg = {
    div: '#main', 
    width: 800, 
    height: 600, 
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
  selectTypeChart('bar')
}

// ------ Global Variables ----
let dados = new Dados();
let base = null;
let chart = null;