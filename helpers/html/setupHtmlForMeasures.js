const setupHtmlForMeasures = (measureMetadata) => {
  for (const group of [1, 2]) {
    const groupMetadata = measureMetadata.filter((d) => d.group === group);
    let innerHtml = "";

    for (const measure of groupMetadata) {
      const { var_name, var_label, default_checked } = measure;
      let checkedText = "";
      default_checked === 1 ? (checkedText = "checked") : null;

      innerHtml += `
      <div class="col s12">
        <p>
          <label>
            <input type="checkbox" ${checkedText} id="${var_name}" />
            <span id="${var_name}_canvas"></span>
            <span>${var_label}</span>
          </label>
        </p>
       </div>
        `;
    }

    document.getElementById(`measures-group-${group}`).innerHTML = innerHtml;
  }
};
