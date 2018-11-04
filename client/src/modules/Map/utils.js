export const getTileUrl=(user)=>{
  let tileUrl = ''
  switch (user.mapTile) {
    case 'osm':
      tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      break;
    case 'mapbox':
      tileUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access" +
          "_token="+user.client.mapboxKey

          
      break;
    default:
      tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      break;
  }
  return tileUrl;
}