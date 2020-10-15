import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import mapMarkerImg from '../images/map-marker.svg';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanate {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
};

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanate[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Fortaleza</strong>
                    <span>Ceará</span>
                </footer>
            </aside>

            <Map 
                center={[-3.7423364,-38.5351201]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker
                                icon={mapIcon}
                                position={[orphanage.latitude, orphanage.longitude]}
                                key={orphanage.id}
                             >
                                <Popup closeButton={false} maxWidth={240} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20}/>
                                    </Link>
                                </Popup>
                            </Marker>
                        );
                    })
                }
            </Map>
                

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;