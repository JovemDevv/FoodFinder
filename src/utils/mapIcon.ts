import Leaflet from 'leaflet';

import mapMarkerImg from '../images/FoodFinder-icon.png';

const finderMapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [100, 110],
  iconAnchor: [50, 110],
  popupAnchor: [170, 2]
})

export default finderMapIcon;