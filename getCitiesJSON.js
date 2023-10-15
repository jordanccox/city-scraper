const fs = require("fs");
const csv = fs.readFileSync("census_cities.csv");

const array = csv.toString().split("\r");

const result = [];

array.forEach((city) => {
  const cityObj = {};

  // Match city and state names

  const cityRegex = /"([^"]+), ([^"]+)"/;
  const cityMatch = city.match(cityRegex);

  // Match population numbers surrounded by parentheses

  const populationRegex = /"([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"/;
  const populationMatch = city.match(populationRegex);

  // Match population numbers that are not surrounded by parentheses

  const popNumbersRegex = /"([^"]+), ([^,]+)",?(\d+),?(\d+),?(\d+),?(\d+)/;
  const popNumbersMatch = city.match(popNumbersRegex);

  if (cityMatch) {
    cityObj["Geographic Area"] = cityMatch[1] + ", " + cityMatch[2];
  }

  if (populationMatch) {
    cityObj["2022 Population"] = populationMatch[5];
  }

  if (!populationMatch && popNumbersMatch) {
    cityObj["2022 Population"] = popNumbersMatch[6];
  }

  result.push(cityObj);
});

let json = JSON.stringify(result);
fs.writeFileSync('output2.json', json);
