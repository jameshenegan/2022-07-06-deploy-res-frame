// Add Event Listeners for future changes
addEventListeners(stressors, measures, radioButtons, originalPlotData);

const addOrRemoveAllMeasuresOrStressors = (
  measureOrStressor,
  groupNum,
  add
) => {
  // measureOrStressor is a string: "measure" or "stressor"
  // groupNum is an int (1,2,3)
  // add is a boolean: true (for add) false (for remove)

  if (measureOrStressor === "measure") {
    const filteredMetadata = measureMetadata.filter(
      (d) => d.group === groupNum
    );

    for (const element of filteredMetadata) {
      document.getElementById(element.var_name).checked = add;
    }

    selectedMeasureCheckboxes = getSelectedMeasures(measures);

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
  }

  if (measureOrStressor === "stressor") {
    const filteredMetadata = stressorMetadata.filter(
      (d) => d.group === groupNum
    );

    for (const element of filteredMetadata) {
      document.getElementById(element.var_name).checked = add;
    }

    selectedStressorCheckboxes = getSelectedStressors(stressors);

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
  }
};

for (const groupNumber of [1, 2]) {
  document
    .getElementById(`measure-add-all-group-${groupNumber}`)
    .addEventListener("click", () => {
      addOrRemoveAllMeasuresOrStressors("measure", groupNumber, true);
    });

  document
    .getElementById(`measure-remove-all-group-${groupNumber}`)
    .addEventListener("click", () => {
      addOrRemoveAllMeasuresOrStressors("measure", groupNumber, false);
    });
}

for (const groupNumber of [1, 2, 3]) {
  document
    .getElementById(`stressor-add-all-group-${groupNumber}`)
    .addEventListener("click", () => {
      addOrRemoveAllMeasuresOrStressors("stressor", groupNumber, true);
    });

  document
    .getElementById(`stressor-remove-all-group-${groupNumber}`)
    .addEventListener("click", () => {
      addOrRemoveAllMeasuresOrStressors("stressor", groupNumber, false);
    });
}
