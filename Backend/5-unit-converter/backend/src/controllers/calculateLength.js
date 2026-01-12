const conversionRates = {
  "meters meters": 1,
  "meters kilometers": 0.001,
  "meters miles": 0.000621371,
  "meters feet": 3.28084,

  "kilometers meters": 1000,
  "kilometers kilometers": 1,
  "kilometers miles": 0.621371,
  "kilometers feet": 3280.84,

  "miles meters": 1609.34,
  "miles kilometers": 1.60934,
  "miles miles": 1,
  "miles feet": 5280,

  "feet meters": 0.3048,
  "feet kilometers": 0.0003048,
  "feet miles": 0.000189394,
  "feet feet": 1,
};

async function calculateLength(data) {
  const dataKey = `${data.fromUnit} ${data.toUnit}`;
  const rate = conversionRates[dataKey];

  if (rate === undefined) {
    throw new Error(
      `Conversion from ${data.fromUnit} to ${data.toUnit} not supported.`
    );
  }

  return rate * data.value;
}

module.exports = calculateLength;
