import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import logoImg from '../images/FoodFinder.png';
import '../styles/pages/lanche-map.css';
import {  Map, Marker, Popup, TileLayer } from 'react-leaflet';

import finderMapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Finder {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function LancheMap() {
    const [finders, setFinders] = useState<Finder[]>([])

  useEffect(() => {
    api.get('finder').then(response => {
       setFinders(response.data)
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

    <Map center={[-27.2092052,-49.6481092]} zoom={15} style={{ height: "100%", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   
   {finders.map(finder => {
    return (
      <Marker 
      key={finder.id}
      icon={finderMapIcon} 
      position={[finder.latitude, finder.longitude]}
      >
    <Popup closeButton={false} minWidth={240} maxWidth={240 } className='map-popup'>
          {finder.name}

        <Link to={`/finder/${finder.id}`}>
            <FiArrowRight size={20} color='#FFF' />
        </Link>
    </Popup>

    </Marker>
    )
   })}
  </Map>
  
      <Link to='/finder/create' className='create-lanche'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
}

export default LancheMap;