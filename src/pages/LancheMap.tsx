import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import logoImg from '../images/FoodFinder.png';
import '../styles/pages/lanche-map.css';
import {  MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import mapMarkerImg from '../images/FoodFinder-icon.png';

const position: [number, number] = [-12.9718, -38.5011]

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [100, 110],
  iconAnchor: [50, 110],
  popupAnchor: [170, 2]
})

function LancheMap() {
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={logoImg} className='img2' alt='finder' />

          <h2>Veja um ponto</h2>
          <p>E mate sua fome!</p>
        </header>

        <footer>
          <strong>Salvador</strong>
          <span>Bahia</span>
        </footer>
      </aside>

      <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker 
      icon={mapIcon} 
      position={position}>
    <Popup closeButton={false} minWidth={240} maxWidth={240 } className='map-popup'>

        Lanche FoodFinder
        <Link to='/finder/1'>
            <FiArrowRight size={20} color='#FFF' />
        </Link>
    </Popup>

    </Marker>
  </MapContainer>
  
      <Link to='/finder/create' className='create-lanche'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
}

export default LancheMap;