import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import logoImg from '../images/FoodFinder.png';
import '../styles/pages/lanche-map.css';
import {  Map, Marker, Popup, TileLayer } from 'react-leaflet';

import finderMapIcon from '../utils/mapIcon';
import api from '../services/api';


const position: [number, number] = [-12.9718, -38.5011]

function LancheMap() {
  

  useEffect(() => {
    api.get('finder').then(response => {
      const finders = response.data
    })
  }, [])

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

    <Map center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker 
      icon={finderMapIcon} 
      position={position}>
    <Popup closeButton={false} minWidth={240} maxWidth={240 } className='map-popup'>

        Lanche FoodFinder
        <Link to='/finder/1'>
            <FiArrowRight size={20} color='#FFF' />
        </Link>
    </Popup>

    </Marker>
  </Map>
  
      <Link to='/finder/create' className='create-lanche'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
}

export default LancheMap;