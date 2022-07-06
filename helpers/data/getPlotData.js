const getPlotData = (
  selectedStressorCheckboxes,
  selectedMeasureCheckboxes,
  selectedEstimate,
  originalPlotData
) => {
  const plotData = [];

  for (const element of originalPlotData) {
    // Get everything except for the y-Coordinate
    let requested, valid;

    const datum = {};
    const { measure, stressor, type } = element;

    datum["measure"] = measure;
    datum["stressor"] = stressor;
    datum["outcome"] = type;
    datum["point"] = element["est"];
    datum["ll"] = element["est_lb"];
    datum["ul"] = element["est_ub"];

    (datum["point"] !== MISSING_VALUE_IN_DATA) &
    (datum["ll"] !== MISSING_VALUE_IN_DATA) &
    (datum["ul"] !== MISSING_VALUE_IN_DATA)
      ? (valid = 1)
      : (valid = 0);

    valid ? (datum["valid"] = 1) : (datum["valid"] = 0);
    if (!valid) {
      datum["point"] = MISSING_VALUE_ON_PLOT;
      datum["ll"] = MISSING_VALUE_ON_PLOT;
      datum["ul"] = MISSING_VALUE_ON_PLOT;
    }

    selectedMeasureCheckboxes.includes(measure) &
    selectedStressorCheckboxes.includes(stressor) &
    (selectedEstimate === type)
      ? (requested = true)
      : (requested = false);

    requested ? (datum["requested"] = 1) : (datum["requested"] = 0);

    plotData.push(datum);
  }

  // Sort
  plotData.sort((a, b) => ySort(a, b));

  // Go back through and get the y-Coordinate
  let y = 1;

  for (const datum of plotData) {
    if (datum.requested === 1) {
      datum["y"] = y + 0.5;
      y = y + 1;
    } else {
      datum["y"] = MISSING_VALUE_ON_PLOT;
    }
  }

  return plotData;
};

const ySort = (a, b) => {
  const measureSortOrderA = measureMetadata.find(
    (d) => d.var_name === a.measure
  )["y_sort_order"];

  const measureSortOrderB = measureMetadata.find(
    (d) => d.var_name === b.measure
  )["y_sort_order"];

  if (measureSortOrderA > measureSortOrderB) return -1;
  if (measureSortOrderA < measureSortOrderB) return 1;
  if (a.point < b.point) return 1;
  if (a.point > b.point) return -1;
  return 0;
};
