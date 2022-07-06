const setupHtmlForStressors = (stressorMetadata) => {
  const makeInnerHtmlForStressorGroup = (stressorMetadata, group) => {
    const stressorsFilteredToGroup = stressorMetadata.filter(
      (d) => d.group === group
    );

    let innerHtml = "";

    for (const stressor of stressorsFilteredToGroup) {
      const { var_name, var_label, default_checked } = stressor;
      let checkedText = "";
      default_checked === 1 ? (checkedText = "checked") : null;

      innerHtml += `
        <p>
        <label>
          <input type="checkbox" ${checkedText} id="${var_name}" />
          <span id="${var_name}_canvas"></span>
          <span>${var_label}</span>
        </label>
      </p>
      `;
    }

    document.getElementById(
      `stressorList-group-${group}`
    ).innerHTML = innerHtml;
  };

  for (const group of [1, 2, 3]) {
    makeInnerHtmlForStressorGroup(stressorMetadata, group);
  }

  drawStressorLegends(stressorMetadata);
};
