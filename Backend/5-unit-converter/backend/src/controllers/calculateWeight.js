const conversionRates = {
  // grams, kilograms, pounds, ounces
  "grams grams": 1,
  "grams kilograms": 0.001,
  "grams pounds": 0.00220462,
  "grams ounces": 0.035274,

  "kilograms grams": 1000,
  "kilograms kilograms": 1,
  "kilograms pounds": 2.20462,
  "kilograms ounces": 35.274,

  "pounds grams": 453.592,
  "pounds kilograms": 0.453592,
  "pounds pounds": 1,
  "pounds ounces": 16,

  "ounces grams": 28.3495,
  "ounces kilograms": 0.0283495,
  "ounces pounds": 0.0625,
  "ounces ounces": 1,
};

async function calculateWeight(data) {
  const dataKey = `${data.fromUnit} ${data.toUnit}`;
  const rate = conversionRates[dataKey];

  if (rate === undefined) {
    throw new Error(
      `Conversion from ${data.fromUnit} to ${data.toUnit} not supported.`
    );
  }

  return rate * data.value;
}

module.exports = calculateWeight;
