// Add Event Listeners
const addEventListeners = (
  stressorCheckboxes,
  measureCheckboxes,
  radioButtons
) => {
  for (const cb of stressorCheckboxes) {
    document.getElementById(cb).addEventListener("click", () => {
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
    });
  }

  for (const cb of measureCheckboxes) {
    document.getElementById(cb).addEventListener("click", () => {
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
    });
  }

  for (const rb of radioButtons) {
    document.getElementById(rb).addEventListener("click", (event) => {
      selectedEstimate = getSelectedEstimate(event, radioButtons);

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
    });
  }
};
