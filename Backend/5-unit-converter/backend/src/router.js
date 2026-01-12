const parseRequest = require("./utils/parseRequest");
const calculateLength = require("./controllers/calculateLength");
const calculateWeight = require("./controllers/calculateWeight");
const calculateTemperature = require("./controllers/calculateTemperature");

async function router(req, res) {
  const url = req.url.split("?")[0].replace(/\/$/, "");
  const routeKey = `${req.method} ${url}`;
  console.log(routeKey);

  switch (routeKey) {
    case "POST /api": {
      const data = await parseRequest(req);

      const result = {
        value: data.value,
        fromUnit: data.fromUnit,
        result: 0,
        toUnit: data.toUnit,
      };

      if (data.formType == 0) {
        result.result = await calculateLength(data);
      } else if (data.formType == 1) {
        result.result = await calculateWeight(data);
      } else if (data.formType == 2) {
        result.result = await calculateTemperature(data);
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid formType" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
      break;
    }
    default: {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end("Not found");
    }
  }
}

module.exports = router;
