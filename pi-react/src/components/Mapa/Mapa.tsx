
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Input from "./../../components/Input/Input"
import { useState } from 'react';
import { useEffect } from 'react';

export default function Mapa(){

    const [latitude, setLatitude] = useState(-23.50505456997555)
    const [longitude, setLongitude] = useState(-46.45550671873131)

    const center: [number, number] = [latitude, longitude]

    function AtualizaCentro({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
    }


    return(
        <section className="w-full h-[800px] px-[9%]">
            <div>
                <h1>Endereço das nossas unidades </h1>
                <h1>Selecione a unidade que você quer conhecer</h1>
            </div>

            <div>
                <Input
                id=""
                name=""
                label="Unidade"
                as="select"
                options={[
                    {value:"-23.50505456997555,-46.45550671873131", label:"São Miguel Paulista"},
                    {value:"-23.552064890825484,-46.44188109617867", label:"Itaquera"}
                    
                ]}
                onChange={(e) => {
                    const valorSelecionado = e.target.value;
                    const [latitude , longitude] = valorSelecionado.split(",").map(Number)
                    setLatitude(latitude)
                    setLongitude(longitude)
                }}
                />
            </div>


            <div
                className="w-full h-[500px]"
                >
                <MapContainer 
                center={center} 
                zoom={55} 
                className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center}>
                    <Popup>Localização</Popup>
                </Marker>
                <AtualizaCentro center={center}/>
                </MapContainer>
            </div>
        </section>

    )
}