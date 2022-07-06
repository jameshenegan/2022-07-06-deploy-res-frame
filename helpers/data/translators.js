const getMeasureLabel = (measure, measureMetadata) => {
  return measureMetadata.find((d) => d.var_name === measure)["var_label"];
};

const getStressorLabel = (stressor, stressorMetadata) => {
  return stressorMetadata.find((d) => d.var_name === stressor)["var_label"];
};

// These are the labels that show up in the tool tips
const getLongEstimateLabel = (estimate) => {
  switch (estimate) {
    case "gf-rpr":
      return "Good Function Relative Prevalence Ratio";
    case "gf-rpr-cba":
      return "Good Function Relative Prevalence Ratio (CBA)";
    case "ds-hr":
      return "Downstream Outcome Hazard Ratio";
    case "ds-or":
      return "Downstream Outcome Odds Ratio";
    case "ds-rpr":
      return "Downstream Outcome Relative Prevalence Ratio";
    case "pcpf-adj":
      return "(Psuedo-)Continuous Measure, Adjusted for V5 Performance";
    case "pcpf-unadj":
      return "(Psuedo-)Continuous Measure, Unadjusted for V5 Performance";
    default:
      return "Undefined";
  }
};

// These are the plot titles (x-Axis titles)
const getEstimateLabel = (estimate) => {
  switch (estimate) {
    case "good-function-rpr":
      return "Good Function RPR";
    case "good-function-rpr-cba":
      return "Good Function RPR (CBA)";
    case "downstream-outcome-hazard-ratios":
      return "Downstream HR";
    case "downstream-outcome-odds-ratios":
      return "Downstream OR";
    case "downstream-outcome-rprs":
      return "Downstream RPR";
    default:
      return "Undefined";
  }
};

const getSizes = (selectedStressorCheckboxes, selectedMeasureCheckboxes) => {
  let pointSize, lineWidth;

  const numSpaces =
    selectedStressorCheckboxes.length * selectedMeasureCheckboxes.length;

  /*

  if (numSpaces < 5) {
    pointSize = 10;
    lineWidth = 10;
  } else if (numSpaces < 10) {
    pointSize = 9;
    lineWidth = 9;
  } else if (numSpaces < 15) {
    pointSize = 8;
    lineWidth = 8;
  } else if (numSpaces < 20) {
    pointSize = 7;
    lineWidth = 7;
  } else {
    pointSize = 3;
    lineWidth = 3;
  }
  */
  pointSize = Math.sqrt(400 / numSpaces);
  lineWidth = Math.sqrt(400 / numSpaces);

  return { pointSize, lineWidth };
};
