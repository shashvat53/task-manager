const fetch = require("node-fetch");

async function getLocationName(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    {
      headers: {
        "User-Agent": "Task Manager",
      },
    }
  );
  const data = await res.json();
  // console.log("Location Data: ", data);
  return (
    data?.address?.city ||
    data?.address?.town ||
    data?.address?.village ||
    data?.address?.state ||
    "Unknown"
  );
}

module.exports = getLocationName;
