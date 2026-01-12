async function calculateTemperature(data) {
  const { value, fromUnit, toUnit } = data;
  let result;

  if (fromUnit === toUnit) {
    result = value;
  } else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    result = (value * 9) / 5 + 32;
  } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    result = ((value - 32) * 5) / 9;
  } else if (fromUnit === "celsius" && toUnit === "kelvin") {
    result = value + 273.15;
  } else if (fromUnit === "kelvin" && toUnit === "celsius") {
    result = value - 273.15;
  } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
    result = ((value - 32) * 5) / 9 + 273.15;
  } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
    result = ((value - 273.15) * 9) / 5 + 32;
  } else {
    throw new Error(`Conversion from ${fromUnit} to ${toUnit} not supported.`);
  }

  return result;
}

module.exports = calculateTemperature;
