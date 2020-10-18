import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import L, { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from 'react-icons/fi';

import mapMarkerImg from '../../images/map-marker.svg';

import SideBar from '../../components/SideBar';
import api from '../../service/api';

import {
  ButtonSelect,
  ConfirmButton,
  Container,
  Form,
  ImagesContainer,
  InputBlock,
} from './styles';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});
const CreateOrphanage: React.FC = () => {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition([latitude, longitude]);
    });
  }, []);

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);

    console.log(selectedImages);

    setImages(selectedImages);

    const selectedPreviewImage = selectedImages.map((selectedImage) => {
      return URL.createObjectURL(selectedImage);
    });

    setPreviewImages(selectedPreviewImage);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('longitude', String(longitude));
    data.append('latitude', String(latitude));

    images.forEach((image) => {
      data.append('images', image);
    });

    console.log(images);

    await api.post('orphanages', data);

    alert('Cadastro realisado com sucesso!');

    history.push('/app');
  }

  return (
    <Container>
      <SideBar />
      <main>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={currentPosition}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="images">Fotos</label>
              <ImagesContainer>
                {previewImages.map((prevetImage) => {
                  return <img key={prevetImage} src={prevetImage} alt={name} />;
                })}
                <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </ImagesContainer>
              <input
                multiple
                onChange={handleSelectImage}
                type="file"
                id="images[]"
              />
            </InputBlock>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <InputBlock>
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <ButtonSelect>
                <button
                  onClick={() => {
                    setOpenOnWeekends(true);
                  }}
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                >
                  Sim
                </button>
                <button
                  onClick={() => {
                    setOpenOnWeekends(false);
                  }}
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                >
                  Não
                </button>
              </ButtonSelect>
            </InputBlock>
          </fieldset>

          <ConfirmButton>Confirmar</ConfirmButton>
        </Form>
      </main>
    </Container>
  );
};

export default CreateOrphanage;
