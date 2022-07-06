// Hide controls for xDomain Limits
document.getElementById("x-domain-limits").style.display = "none";

// Initlaize Modal
var elems = document.querySelectorAll(".modal");
M.Modal.init(elems);

// Setup HTML

// Note: stressorMetadata, originalPlotData, and measureMetadata
// were destructured from appData in setupPlot.js

// Apply Labels to Stressor Groups
for (const groupNumber of [1, 2, 3]) {
  const stressorLabel = stressorMetadata.find((d) => d.group === groupNumber)
    .groupLabel;
  document.getElementById(
    `stressor-group-${groupNumber}-label`
  ).innerHTML = stressorLabel;
}

// Apply Labels to Measure Group
for (const groupNumber of [1, 2]) {
  const measureLabel = measureMetadata.find((d) => d.group === groupNumber)
    .groupLabel;
  document.getElementById(
    `measure-group-${groupNumber}-label`
  ).innerHTML = measureLabel;
}

setupHtmlForStressors(stressorMetadata);
setupHtmlForMeasures(measureMetadata);

// Setup State
let selectedStressorCheckboxes = getSelectedStressors(stressors);
let selectedMeasureCheckboxes = getSelectedMeasures(measures);
let plotData,
  yValuesOfDividerLines,
  yValuesOfMeasureText,
  extentX,
  extentY,
  selectedEstimate,
  control,
  lowerX,
  upperX;

selectedEstimate = "gf-rpr";

// control is either "manual" or "automatic"
control = "automatic";

lowerX = 0.01;
upperX = 2;

// Get plot data and draw plot first time through

updateData(
  selectedStressorCheckboxes,
  selectedMeasureCheckboxes,
  selectedEstimate,
  originalPlotData
);

drawPlot(
  plotData,
  yValuesOfDividerLines,
  yValuesOfMeasureText,
  extentX,
  extentY,
  xScale,
  yScale,
  lineGroup,
  pointGroup,
  horizontalLineGroup,
  textGroup,
  noEffectLineGroup,
  xAxisGroup,
  titleGroup,
  missingDataGroup
);

// Control

document.getElementById("automatic-control").addEventListener("change", () => {
  control = "automatic";
  document.getElementById("x-domain-limits").style.display = "none";

  drawPlot(
    plotData,
    yValuesOfDividerLines,
    yValuesOfMeasureText,
    extentX,
    extentY,
    xScale,
    yScale,
    lineGroup,
    pointGroup,
    horizontalLineGroup,
    textGroup,
    noEffectLineGroup,
    xAxisGroup,
    titleGroup,
    missingDataGroup
  );
});
document.getElementById("manual-control").addEventListener("change", () => {
  control = "manual";
  document.getElementById("x-domain-limits").style.display = "block";

  drawPlot(
    plotData,
    yValuesOfDividerLines,
    yValuesOfMeasureText,
    extentX,
    extentY,
    xScale,
    yScale,
    lineGroup,
    pointGroup,
    horizontalLineGroup,
    textGroup,
    noEffectLineGroup,
    xAxisGroup,
    titleGroup,
    missingDataGroup
  );
});

document.getElementById("lowerX").addEventListener("change", (e) => {
  lowerX = parseFloat(e.target.value);
  drawPlot(
    plotData,
    yValuesOfDividerLines,
    yValuesOfMeasureText,
    extentX,
    extentY,
    xScale,
    yScale,
    lineGroup,
    pointGroup,
    horizontalLineGroup,
    textGroup,
    noEffectLineGroup,
    xAxisGroup,
    titleGroup,
    missingDataGroup
  );
});

document.getElementById("upperX").addEventListener("change", (e) => {
  upperX = parseFloat(e.target.value);
  drawPlot(
    plotData,
    yValuesOfDividerLines,
    yValuesOfMeasureText,
    extentX,
    extentY,
    xScale,
    yScale,
    lineGroup,
    pointGroup,
    horizontalLineGroup,
    textGroup,
    noEffectLineGroup,
    xAxisGroup,
    titleGroup,
    missingDataGroup
  );
});
