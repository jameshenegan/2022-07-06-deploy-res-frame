const getExtentX = (plotData) => {
  const filteredPlotData = plotData.filter(
    (d) => (d.requested === 1) & (d.valid === 1)
  );
  const xMin = d3.min(filteredPlotData.map((d) => d.ll));
  const xMax = d3.max(filteredPlotData.map((d) => d.ul));
  return { xMin, xMax };
};

const getExtentY = (plotData) => {
  const filteredPlotData = plotData.filter((d) => d.requested === 1);
  // const yMin = d3.min(filteredPlotData.map((d) => d.y));
  const yMin = 1;
  const yMax = d3.max(filteredPlotData.map((d) => d.y));
  return { yMin, yMax };
};
