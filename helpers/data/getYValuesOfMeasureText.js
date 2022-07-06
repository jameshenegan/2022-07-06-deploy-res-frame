const getYValuesOfMeasureText = (
  selectedStressorCheckboxes,
  selectedMeasureCheckboxes,
  plotData
) => {
  const results = [];

  console.log({ plotData });
  const filteredPlotData = plotData.filter((d) => d.requested === 1);

  const numMeasures = selectedMeasureCheckboxes.length;
  const yDelta = selectedStressorCheckboxes.length;
  // const offSet = (5 / 10) * yDelta;
  const offSet = 1;

  if (numMeasures === 0 || yDelta === 0) {
    return results;
  }

  for (let i = 0; i < numMeasures; i++) {
    const index = i * yDelta;
    const y = index + offSet;
    const measure = filteredPlotData[index]["measure"];
    results.push({ y, measure });
  }

  return results;
};
