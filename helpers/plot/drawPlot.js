const drawPlot = (
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
) => {
  let xMin, xMax;
  if (control === "automatic") {
    // set the xDomain
    xMin = extentX.xMin;
    xMax = extentX.xMax;
    if (xMax < 1.1) {
      xMax = 1.1;
    }
  }

  if (control === "manual") {
    xMin = lowerX;
    xMax = upperX;
  }

  xScale.domain([xMin, xMax]);

  // set the yDomain
  const { yMin, yMax } = extentY;
  yScale.domain([yMin, yMax]);

  // Erase the old graph (if it exists) to make room for the new one
  lineGroup.selectAll("line").remove();
  pointGroup.selectAll("circle").remove();
  horizontalLineGroup.selectAll("line").remove();
  textGroup.selectAll("text").remove();
  noEffectLineGroup.selectAll("line").remove();
  xAxisGroup.selectAll(".gridline").remove();
  titleGroup.selectAll("text").remove();
  missingDataGroup.selectAll("rect").remove();

  const { pointSize, lineWidth } = getSizes(
    selectedStressorCheckboxes,
    selectedMeasureCheckboxes
  );

  // Draw the lines that represent the confidence intervals
  lineGroup
    .selectAll("line")
    .data(plotData)
    .join("line")
    .attr("x1", (d) => xScale(d["ll"]))
    .attr("x2", (d) => xScale(d["ul"]))
    .attr("y1", (d) => yScale(d["y"]))
    .attr("y2", (d) => yScale(d["y"]))
    .attr("stroke", (d) => color(d.stressor))
    .attr("stroke-width", lineWidth);

  // Draw the points
  pointGroup
    .selectAll("circle")
    .data(plotData)
    .join("circle")
    .attr("cx", (d) => xScale(d["point"]))
    .attr("cy", (d) => yScale(d["y"]))
    .attr("r", pointSize)
    .on("mouseover", (e, d) => {
      const pointEstimate = Math.round(100 * d.point) / 100;
      const lowerLimit = Math.round(100 * d.ll) / 100;
      const upperLimit = Math.round(100 * d.ul) / 100;

      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(
          `
          Stressor: ${getStressorLabel(d.stressor, stressorMetadata)} <br>
          Measure: ${getMeasureLabel(d.measure, measureMetadata)} <br>
          ${getEstimateLabel(
            selectedEstimate
          )}: ${pointEstimate} (${lowerLimit}, ${upperLimit})          
          `
        )
        .style("left", e.pageX - 250 + "px")
        .style("top", e.pageY + 20 + "px");
    })
    .on("mouseout", (d) => {
      div.transition().duration(500).style("opacity", 0);
    });

  //Draw Horizontal Lines where needed
  horizontalLineGroup
    .selectAll("line")
    .data(yValuesOfDividerLines)
    .join("line")
    .attr("x1", (d) => xScale(xMin))
    .attr("x2", (d) => xScale(xMax))
    .attr("y1", (d) => yScale(d))
    .attr("y2", (d) => yScale(d))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4");

  // Draw the measure labels above the horizontal divider lines

  textGroup
    .selectAll("text")
    .data(yValuesOfMeasureText)
    .join("text")
    .attr("x", xScale(xMin))
    .attr("y", (d) => yScale(d.y) - 2)
    .text((d) => getMeasureLabel(d.measure, measureMetadata))
    .style("font-size", (d) => {
      if (["sppb", "robust"].includes(d.measure)) {
        return "22px";
      } else {
        return "20px";
      }
    })
    .attr("font-weight", (d) => {
      if (["sppb", "robust"].includes(d.measure)) {
        return 700; // Bold
      } else {
        return 400; // Normal
      }
    });

  // Draw the no-effect line

  noEffectLineGroup
    .append("line")
    .attr("x1", xScale(1))
    .attr("x2", xScale(1))
    .attr("y1", yScale(1))
    .attr(
      "y2",
      yScale(
        selectedStressorCheckboxes.length * selectedMeasureCheckboxes.length +
          1.5
      )
    )
    .attr("stroke", "black")
    .attr("stroke-dasharray", "4");

  // make x-axis
  xAxisGroup.call(d3.axisBottom(xScale).ticks(5, ".3").tickSize(0));

  // Draw Title (below xAxis)

  const title = getLongEstimateLabel(selectedEstimate);

  //

  titleGroup
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - 15)
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .text(title);

  const missingData = plotData.filter(
    (d) => (d.valid === 0) & (d.requested === 1)
  );

  // Draw lines for missing data

  missingDataGroup
    .selectAll("rect")
    .data(missingData)
    .join("rect")
    .attr("x", xScale(xMin))
    .attr("width", width)
    .attr("y", (d) => yScale(d.y + 0.25))
    .attr("height", (yScale(0) - yScale(1)) / 2)
    .attr("opacity", 0.06)
    .attr("fill", (d) => color(d.stressor))
    .on("mouseover", (e, d) => {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(
          `
          Stressor: ${getStressorLabel(d.stressor, stressorMetadata)} <br>
          Measure: ${getMeasureLabel(d.measure, measureMetadata)} <br>
          ${getEstimateLabel(selectedEstimate)}: Missing          
          `
        )
        .style("left", e.pageX - 350 + "px")
        .style("top", e.pageY - 28 + "px");
    })
    .on("mouseout", (d) => {
      div.transition().duration(500).style("opacity", 0);
    });
};
