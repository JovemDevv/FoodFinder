import React from "react";
import { MapContainer, Marker } from 'react-leaflet';
import '../styles/pages/create-finder.css';
import mapMarkerImg from '../images/FoodFinder-icon.png'
import L from "leaflet";
import { FiPlus } from "react-icons/fi";

const mapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [100, 110],
  iconAnchor: [50, 110],
  popupAnchor: [170, 2]
})





export default function OrphanagesMap() {
  return (
    <div id="page-create-orphanage">
      

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer style={{ width: '100%', height: 280 }}>
              <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#d42b27" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <button type="submit">Confirmar</button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
