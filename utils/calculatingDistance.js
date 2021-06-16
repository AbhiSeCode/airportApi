const toRadians = (degree) => {
  return degree * (Math.PI / 180);
};

const calculatingDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371;
  var latR1 = toRadians(lat1);
  var latR2 = toRadians(lat2);
  var latR = toRadians(lat2 - lat1);
  var lonR = toRadians(lon2 - lon1);
  var a =
    Math.sin(latR / 2) * Math.sin(latR / 2) +
    Math.cos(latR1) * Math.cos(latR2) * Math.sin(lonR / 2) * Math.sin(lonR / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
  return d;
};

module.exports = calculatingDistance;
