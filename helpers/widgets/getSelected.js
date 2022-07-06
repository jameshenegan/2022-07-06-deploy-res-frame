const getSelectedMeasures = (measures) => {
  const selectedMeasures = [];

  for (const measure of measures) {
    if (document.getElementById(measure).checked) {
      selectedMeasures.push(measure);
    }
  }

  return selectedMeasures;
};

const getSelectedStressors = (stressors) => {
  const selectedStressors = [];

  for (const stressor of stressors) {
    if (document.getElementById(stressor).checked) {
      selectedStressors.push(stressor);
    }
  }

  return selectedStressors;
};

const getSelectedEstimate = (event, radioButtons) => {
  // Set selectedEstimate to what was just selected
  selectedEstimate = event.target.id;

  // Turn everything else "off"
  for (const rb of radioButtons) {
    if (rb !== selectedEstimate) {
      document.getElementById(rb).checked = false;
    }
  }

  return selectedEstimate;
};
