const express = require("express");
const airportRoute = require("./routes/airportRoute");
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use("/airport", airportRoute);

app.listen(port, () => console.log(`Server is running on ${port}`));
