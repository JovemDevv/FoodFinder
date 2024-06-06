import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Marker, Map, TileLayer } from "react-leaflet";
import '../styles/pages/finder.css';
import Sidebar from "../components/Sidebar";
import finderMapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { LeafletMouseEvent } from "leaflet";

interface Finder {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface FinderParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<FinderParams>();
  const [finder, setFinder] = useState<Finder>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    api.get(`finder/${params.id}`).then(response => {
      const { latitude, longitude } = response.data;
      setPosition({ latitude, longitude });
      setFinder(response.data);
    });
  }, [params.id]);

  if (!finder || !position) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      <div className="sidebar">
        <Sidebar />
      </div>
      <main>
        <div className="orphanage-details">
          <img src={finder.images[activeImageIndex].url} alt={finder.name} />

          <div className="images">
            {finder.images.map((image, index) => (
              <button
                key={image.id}
                className={activeImageIndex === index ? 'active' : ''}
                type="button"
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.url} alt={finder.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{finder.name}</h1>
            <p>{finder.about}</p>

            <div className="map-container">
              <Map center={[position.latitude, position.longitude]} zoom={15} style={{ width: '100%', height: 280 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker
                  interactive={false}
                  icon={finderMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${finder.latitude},${finder.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{finder.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Segunda <br />
                {finder.opening_hours}
              </div>
              <div className={`open-on-weekends ${finder.open_on_weekends ? '' : 'dont-open'}`}>
                <FiInfo size={32} color={finder.open_on_weekends ? "#39CC83" : "#FF669D"} />
                {finder.open_on_weekends ? 'Atendemos' : 'Não atendemos'} <br />
                fim de semana
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
