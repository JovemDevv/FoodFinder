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
  const [finders, setFinders] = useState<Finder[]>([]);
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]); // Coordenadas iniciais do mapa

  useEffect(() => {
    // Função para obter a localização da pessoa que fez login
    const getLocation = async () => {
      try {
        // Tentar obter a localização do usuário através do GPS
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
              const data = await response.json();
              const city = data.address.city || data.address.town || data.address.village || '';
              const state = data.address.state || '';
              setCity(city);
              setState(state);
              setMapCenter([latitude, longitude]); // Definindo o centro do mapa para as coordenadas do GPS
            },
            async () => {
              // Em caso de erro ao obter a localização através do GPS, tentar obter através do IP
              const response = await fetch('https://ipapi.co/json/');
              const data = await response.json();
              const city = data.city || '';
              const state = data.region || '';
              setCity(city);
              setState(state);
              setMapCenter([data.latitude, data.longitude]); // Definindo o centro do mapa para as coordenadas do IP
            }
          );
        } else {
          // Se o navegador não suporta geolocalização, tentar obter a localização através do IP
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          const city = data.city || '';
          const state = data.region || '';
          setCity(city);
          setState(state);
          setMapCenter([data.latitude, data.longitude]); // Definindo o centro do mapa para as coordenadas do IP
        }
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    // Chamada da função para obter a localização do usuário
    getLocation();
  }, []);

  useEffect(() => {
    api.get('finder').then(response => {
      setFinders(response.data);
    });
  }, []);

  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={logoImg} className='img2' alt='finder' />
          <h2>Veja um ponto</h2>
          <p>E mate sua fome!</p>
        </header>
        <footer>
          <strong>{city}</strong>
          <span>{state}</span>
        </footer>
      </aside>

      <Map center={mapCenter} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {finders.map(finder => (
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
        ))}
      </Map>
      <Link to='/finder/create' className='create-lanche'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
}

export default LancheMap;
