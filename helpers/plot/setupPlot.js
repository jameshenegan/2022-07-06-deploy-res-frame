// Setup Data for visualization

const MISSING_VALUE_IN_DATA = -100;
const MISSING_VALUE_ON_PLOT = 1000000000;

const { stressorMetadata, measureMetadata, originalPlotData } = appData;
const stressors = stressorMetadata.map((datum) => datum.var_name);
const measures = measureMetadata.map((datum) => datum.var_name);
// const radioButtons = ["rr", "or", "rpr", "hr"];

const radioButtons = [...new Set(originalPlotData.map((d) => d.type))];
console.log({ radioButtons });

/* 
'good-function-rpr',
'good-function-rpr-cba'
'downstream-outcome-hazard-ratios',
'downstream-outcome-odds-ratios',
'downstream-outcome-rprs'
*/
// Setup Visualization

const height = 500;
const width = 1.618 * height;
const margins = { top: 20, left: 30, bottom: 60, right: 30 };
/*
const svg = d3.select("div#container").append("svg");
svg.attr("height", height);
svg.attr("width", width);
*/

const svg = d3
  .select("div#container")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .classed("svg-content", true);

// Get Color Scale for the Stressors
const colors = stressorMetadata.map((d) => d.color);
const color = d3.scaleOrdinal().domain(stressors).range(colors);

// Setup the  tooltip
const div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

div.style("top", height / 2 + "px");
div.style("left", width / 2 + "px");

// Setup groups
const lineGroup = svg.append("g");
const pointGroup = svg.append("g");
const horizontalLineGroup = svg.append("g");
const missingDataGroup = svg.append("g");
const textGroup = svg.append("g");
const noEffectLineGroup = svg.append("g");
const titleGroup = svg.append("g");

// Setup the x Axis

const xAxisGroup = svg
  .append("g")
  .attr("class", "axis")
  .attr("transform", `translate(0,${height - margins.bottom})`);

// Setup the scales
const xScale = d3.scaleLog().range([margins.left, width - margins.right]);
const yScale = d3.scaleLinear().range([height - margins.bottom, margins.top]);
