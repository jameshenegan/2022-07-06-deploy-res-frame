const drawStressorLegends = (stressorMetadata) => {
  const legendRectHeight = 10;
  const legendRectWidth = 1.618 * legendRectHeight;

  // Adding Legends for Stressor Data

  for (const item of stressorMetadata) {
    const stressorName = item.var_name;
    let divId = `${stressorName}_canvas`;
    const color = item.color;

    const selection = document.getElementById(divId);
    if (selection) {
      divId = "#" + divId;

      d3.select(divId)
        .append("svg")
        .attr("height", legendRectHeight)
        .attr("width", legendRectWidth)
        .append("rect")
        .attr("height", legendRectHeight)
        .attr("width", legendRectWidth)
        .attr("fill", color)
        .attr("stroke", "black");
    }
  }
};
