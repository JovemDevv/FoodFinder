import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";
import '../styles/pages/create-finder.css';
import { FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import finderMapIcon from "../utils/mapIcon";
import PrimaryButton from "../components/PrimaryButtton";
import api from "../services/api";
import { useHistory } from "react-router-dom";

const defaultPosition = { latitude: -27.599724, longitude: -48.548049 }; // Florianópolis, Brazil

export default function OrphanagesMap() {
  const history = useHistory();

  const [position, setPosition] = useState(defaultPosition);
  const [address, setAddress] = useState('');

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image));
    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => data.append('images', image));
    
    await api.post('finder', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }

  async function handleAddressSearch() {
    if (!address) return;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      setPosition({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
    } else {
      alert('Endereço não encontrado');
    }
  }

  return (
    <div id="page-create-orphanage">
      <div className="sidebar">
        <Sidebar />
      </div>
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label htmlFor="address">Endereço</label>
              <div className="form-address-search">
                <input 
                  id="address" 
                  value={address} 
                  onChange={event => setAddress(event.target.value)} 
                  placeholder="Digite o endereço (ex.: Rua, Cidade, Estado)" 
                />
                <button type="button" onClick={handleAddressSearch}>Buscar</button>
              </div>
            </div>

            <Map 
              style={{ width: '100%', height: 280 }}
              center={[position.latitude, position.longitude]}
              zoom={15}
              onClick={handleMapClick} 
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker 
                interactive={false} 
                icon={finderMapIcon} 
                position={[position.latitude, position.longitude]} 
              />       
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300}
                value={about} 
                onChange={event => setAbout(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#d42b27" />
                </label>
               
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions} 
                onChange={event => setInstructions(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}
