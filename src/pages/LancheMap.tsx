import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import logoImg from '../images/FoodFinder.png';
import '../styles/pages/lanche-map.css';
import {  MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position: [number, number] = [-12.9718, -38.5011]

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
    <Marker position={position}>
    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>

    </Marker>
  </MapContainer>
      <Link to='' className='create-lanche'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
}

export default LancheMap;