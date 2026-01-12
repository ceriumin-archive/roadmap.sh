document.addEventListener("DOMContentLoaded", () => {
  const URL = "http://localhost:3000/api";

  const form = document.getElementById("unit-converter-form");
  const result = document.getElementById("result");
  if (!form) return;

  const formTypes = Array.from(form.querySelectorAll("div"));
  const unitSelection = document.querySelector(".unit-selection");
  if (!unitSelection) return;

  const unitTypes = Array.from(unitSelection.querySelectorAll("p"));

  unitTypes.forEach((unit, i) => (unit.dataset.index = i));
  formTypes.forEach((formType, i) => (formType.dataset.index = i));

  function showForm(index) {
    unitTypes[index].classList.add("active");
    form.style.display = "flex";
    result.style.display = "none";

    formTypes.forEach((formType, i) => {
      if (i == index) {
        formType.style.display = "flex";
        Array.from(formType.querySelectorAll("input, select")).forEach(
          (el) => (el.disabled = false)
        );
      } else {
        formType.style.display = "none";
        Array.from(formType.querySelectorAll("input, select")).forEach(
          (el) => (el.disabled = true)
        );
      }
    });
  }

  showForm(0);

  // Handles the navigation bar
  unitSelection.addEventListener("click", (event) => {
    if (event.target.tagName === "P") {
      const index = event.target.dataset.index;

      unitTypes.forEach((unit) => unit.classList.remove("active"));
      event.target.classList.add("active");

      showForm(index);
    }
  });

  // Handles form Submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const activeForm = formTypes.find((div) => div.style.display !== "none");

    const enabledFields = Array.from(
      activeForm.querySelectorAll(
        "input:not([disabled]), select:not([disabled])"
      )
    );

    let value, fromValue, toValue;
    enabledFields.forEach((field) => {
      if (field.name.includes("value")) value = field.value;
      else if (field.name.startsWith("from")) fromValue = field.value;
      else if (field.name.startsWith("to")) toValue = field.value;
    });

    enabledFields.forEach((field) => {
      if (field.tagName === "INPUT") field.value = "";
      if (field.tagName === "SELECT") field.selectedIndex = 0;
    });

    const response = await handleSubmission(
      value,
      fromValue,
      toValue,
      activeForm.dataset.index
    );
    const data = await response.json();

    if (data) {
      const resultContent = document.querySelector(".result-content");
      const reset = document.querySelector('button[type="reset"]');

      form.style.display = "none";
      result.style.display = "flex";

      const roundedResult = Number(data.result).toFixed(2);
      resultContent.textContent = `${data.value} ${data.fromUnit} = ${roundedResult} ${data.toUnit}`;

      reset.addEventListener("click", () => {
        form.style.display = "flex";
        result.style.display = "none";
      });
    }
  });

  // POST the data to the endpoint here
  async function handleSubmission(value, fromValue, toValue, formType) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: value,
          fromUnit: fromValue,
          toUnit: toValue,
          formType: formType,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (err) {
      console.log(err.message);
      return { json: async () => ({ error: err.message }) };
    }
  }
});
