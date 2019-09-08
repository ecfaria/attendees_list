require('dotenv').config();

const getDistance = (
  lat1,
  lng1,
  lat2 = process.env.OFFICE_LAT,
  lng2 = process.env.OFFICE_LNG
) => {
  // Convert Degress to Radians
  function Deg2Rad(deg) {
    return (deg * Math.PI) / 180;
  }

  function getDistanceBetweenPoints(startLat, startLng, finishLat, finishLng) {
    startLat = Deg2Rad(startLat);
    finishLat = Deg2Rad(finishLat);
    startLng = Deg2Rad(startLng);
    finishLng = Deg2Rad(finishLng);

    let earthRadius = 6371; // km
    let x = (finishLng - startLng) * Math.cos((startLat + finishLat) / 2);
    let y = finishLat - startLat;
    let distance = Math.sqrt(x * x + y * y) * earthRadius;
    return distance;
  }

  return getDistanceBetweenPoints(lat1, lng1, lat2, lng2);
};
module.exports = {
  getDistance
};
