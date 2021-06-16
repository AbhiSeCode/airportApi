const express = require("express");
const api = require("../data/alaska_airports_II.json");
const calculatingDistance = require("../utils/calculatingDistance");
const response = require("../utils/response");
const router = express.Router();

router.get("/all", (req, res) => {
  try {
    res.status(200).send(response(1, "Data found", api));
  } catch (err) {
    res.status(500).send(response(0, err.message));
  }
});

router.post("/distance", (req, res) => {
  try {
    const source = req.body.source;
    const destination = req.body.destination;
    const sourceData = api.find((data) => data.FacilityName === source);
    const destinationData = api.find(
      (data) => data.FacilityName === destination
    );
    const distance = calculatingDistance(
      sourceData.Lat,
      sourceData.Lon,
      destinationData.Lat,
      destinationData.Lon
    );
    res.status(200).send(response(1, "Distance in km", distance));
  } catch (err) {
    res.status(400).send(response(0, err.message));
  }
});

router.post("/nearby", (req, res) => {
  try {
    const currentAirport = api.find(
      (data) => data.FacilityName === req.body.currentAirport.toUpperCase()
    );
    const allDistances = api
      .map((data) => {
        data.From = currentAirport.FacilityName;
        data.Distance = calculatingDistance(
          data.Lat,
          data.Lon,
          currentAirport.Lat,
          currentAirport.Lon
        );
        return data;
      })
      .filter((data) => data.FacilityName !== currentAirport.FacilityName)
      .sort((a, b) =>
        a.Distance > b.Distance ? 1 : b.Distance > a.Distance ? -1 : 0
      );
    res
      .status(200)
      .send(
        response(1, "Data", [allDistances[0], allDistances[1], allDistances[2]])
      );
  } catch (err) {
    res.status(400).send(response(0, err.message, err));
  }
});

// router.get("/threenearest", (req, res) => {
//   try {
//     const three = [];
//     api.forEach((data1) => {
//       const distance = api
//         .map((data) => {
//           data.From = data1.FacilityName;
//           data.Distance = calculatingDistance(
//             data.Lat,
//             data.Lon,
//             data1.Lat,
//             data1.Lon
//           );
//           return data;
//         })
//         .filter((data) => data.FacilityName !== data1.FacilityName)
//         .sort((a, b) =>
//           a.Distance > b.Distance ? 1 : b.Distance > a.Distance ? -1 : 0
//         );
//       three.push(distance.filter((data) => data.Distance < 100));
//     });
//     res.status(200).send(response(1, "Here", three));
//   } catch (err) {
//     res.status(400).send(response(0, err.message, err));
//   }
// });

module.exports = router;
