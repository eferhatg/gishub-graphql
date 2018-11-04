const express = require("express");
const app = express();
const pgp = require("pg-promise")();

app.get("/", (req, res) => {
  const db = pgp(
    "conn"
  );

  var fs = require("fs");
  var geojson = JSON.parse(fs.readFileSync("minorislands.json", "utf8"));

  var propArray = [];
  var geomArray = [];
  var queryArray = [];
  geojson.features.forEach(feature => {
    propArray.push(feature.properties);
    geomArray.push(feature.geometry);
    if (feature.geometry.type === "Polygon") {
      queryArray.push(
        db.none(
          "INSERT INTO feature(layer_id, type, geometry, properties,  geom_type) VALUES($1, $2,ST_GeomFromGeoJSON($3),$4,$5)",
          [4, "Feature", feature.geometry, feature.properties, "Polygon"]
        )
      );
    }
  });

  db.tx(t => {
    return t.batch(queryArray);
  })
    .then(data => {
      console.log("SUCCESS:");
    })
    .catch(error => {
      console.log("ERROR:", error);
    });

  res.send("Hello World!");
});

app.listen(9999, () => console.log("listening on port 9999!"));
