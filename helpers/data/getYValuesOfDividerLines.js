const getYValuesOfDividerLines = (
  selectedStressorCheckboxes,
  selectedMeasureCheckboxes
) => {
  const yValues = [];

  if (selectedMeasureCheckboxes.length < 2) {
    return yValues;
  }
  const yDelta = selectedStressorCheckboxes.length;
  const offSet = 1;
  const numMeasures = selectedMeasureCheckboxes.length;
  for (let i = 1; i < numMeasures; i++) {
    yValues.push(i * yDelta + offSet);
  }
  return yValues;
};
