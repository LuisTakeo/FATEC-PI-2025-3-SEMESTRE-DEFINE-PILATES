
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Input from "./../../components/Input/Input"
import { useState } from 'react';
import { useEffect } from 'react';
import Estilizacoes from '../../uteis/Estilizacoes';

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

    const Logadouro = () => {

        if (JSON.stringify(center)===JSON.stringify([-23.50505456997555,-46.45550671873131])){
            return(
                <div className='flex flex-col gap-5'>
                    <div>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'><span className='font-bold'>Logadouro: </span>R. José Aldo Piassi, 165 - São Miguel Paulista, São Paulo - SP, 08011-300</h1>
                    </div>
                    <div>
                        <h1 className='text-[1.5rem] md:text-[1.3rem] font-bold'>Horário de serviço das nossas unidades:</h1>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'>Segunda a sexta: 07h até 21h</h1>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'>Sábado e Domingo: fechado</h1>
                    </div>
                </div>
            )
        }else if(JSON.stringify(center)===JSON.stringify([-23.505189956028758,-46.45554670523834])){
            return(
                <div className='flex flex-col gap-5'>
                    <div>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'><span className='font-bold'>Logadouro: </span>Rua Santana de Pirapama, 91 - Vila Jacuí, São Paulo - SP, 08060-370</h1>
                    </div>
                    <div>
                        <h1 className='text-[1.5rem] md:text-[1.3rem] font-bold'>Horário de serviço das nossas unidades:</h1>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'>Segunda a sexta: 14h até 21h</h1>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'>Domingo: fechado</h1>
                    </div>
                </div>
            )
        }else if(JSON.stringify(center)===JSON.stringify([-23.53042485224035,-46.443679847565896])){
            return(
                <div className='flex flex-col gap-5'>
                    <div>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'><span className='font-bold'>Logadouro: </span>Estrada Itaquera Guaianazes, 45 - Parada XV de Novembro, São Paulo - SP, 08246-000</h1>
                    </div>
                    <div>
                        <h1 className='text-[1.5rem] md:text-[1.3rem] font-bold'>Horário de serviço das nossas unidades:</h1>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'>Segunda a sexta: 14h até 21h</h1>
                        <h1 className='text-[1.5rem] md:text-[1.3rem]'>Domingo: fechado</h1>
                    </div>
                </div>
            )
        }
    }


    return(
        <section className="w-full h-[900px] px-[10%] mb-[5%] flex flex-col gap-8">
            <div className='flex flex-col gap-5'>
                <h1 className={Estilizacoes.titulo_principal}>Endereço das nossas unidades </h1>
                <h1 className={Estilizacoes.titulo_segundario}>Selecione a unidade que você quer conhecer</h1>
            </div>

            <div>
                <Input
                id=""
                name=""
                label="Unidade"
                as="select"
                options={[
                    {value:"-23.50505456997555,-46.45550671873131", label:"São Miguel Paulista"},
                    {value:"-23.53042485224035,-46.443679847565896", label:"Itaquera"},
                    {value:"-23.505189956028758,-46.45554670523834", label:"Vila Jacuí"} 
                ]}
                onChange={(e) => {
                    const valorSelecionado = e.target.value;
                    const [latitude , longitude] = valorSelecionado.split(",").map(Number)
                    setLatitude(latitude)
                    setLongitude(longitude)
                }}
                />
            </div>

            <Logadouro/>


            <div
                className="w-full h-full shadow-2xl"
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