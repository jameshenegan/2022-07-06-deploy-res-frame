const updateData = (
  selectedStressorCheckboxes,
  selectedMeasureCheckboxes,
  selectedEstimate,
  originalPlotData
) => {
  plotData = getPlotData(
    selectedStressorCheckboxes,
    selectedMeasureCheckboxes,
    selectedEstimate,
    originalPlotData
  );

  yValuesOfDividerLines = getYValuesOfDividerLines(
    selectedStressorCheckboxes,
    selectedMeasureCheckboxes
  );

  yValuesOfMeasureText = getYValuesOfMeasureText(
    selectedStressorCheckboxes,
    selectedMeasureCheckboxes,
    plotData
  );

  extentX = getExtentX(plotData);
  extentY = getExtentY(plotData);
};
