import {MapPin, ChevronLeft, TicketPlus, } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function DestinationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const goToBack = () => {
    navigate(-1);
  }
  const goToMap = () => {
  navigate(`/map/${data.lat}/${data.lon}/${data.nombre}`);
};

  const Reservar = () => {
  navigate(`/reserva/${id}`);
};


interface DestinationData {
  nombre: string;
  region: string;
  precio: string;
  rating: number;
  descripcion: string;
  imagen: string;
  reviews: string;
  miniaturas: string[];
  lat: number; 
  lon: number; 
}




const destinos: Record<string, DestinationData> = {
  paine: {
    nombre: "Torres del Paine",
    region: "Magallanes y la Antártica",
    rating: 4.8,
    reviews: "10.600",
    precio: "$5.200",
    descripcion:
      "En el Parque Nacional Torres del Paine, puedes disfrutar de una gran variedad de actividades, incluyendo trekking, navegación, avistamiento de fauna, y exploración de paisajes naturales.",
    imagen: "/img/paine.png",
    miniaturas: [
      "/img/paine.png",
      "/img/torresdelpaine.jpg",
      "/img/torres3.png",
    ],
    lat: -51.253,
    lon: -72.331,
  },

  cajon: {
    nombre: "Cajón del Maipo",
    region: "Metropolitana",
    rating: 4.8,
    reviews: "1.500",
    precio: "$2.500",
    descripcion:
      "Los visitantes pueden disfrutar de una variedad de actividades, como senderismo, rafting, escalada y paseos a caballo. Además, el área cuenta con termas naturales donde los turistas pueden relajarse después de un día lleno de aventuras. El Cajón del Maipo también",
    imagen: "/img/cajon2.png",
    miniaturas: [
      "/img/cajon2.png",
      "/img/cajondelmaipo.jpg",
      "/img/cajon3.png",
    ],
    lat: -33.648,
    lon: -70.330,
  },

  valparaiso: {
    nombre: "Puerto Valparaíso",
    region: "Valparaíso",
    rating: 4.7,
    reviews: "8.200",
    precio: "Gratis",
    descripcion:
      "Valparaíso es conocido por su arquitectura colorida, su vibrante vida cultural y su puerto histórico. Los visitantes pueden explorar sus cerros, disfrutar de su gastronomía y descubrir su arte callejero.",
    imagen: "/img/valparaiso3.png",
    miniaturas: [
      "/img/valpo.png",
      "/img/valparaiso2.png",
      "/img/valparaiso3.png",
    ],
    lat: -33.047,
    lon: -71.612,
  },
  viña: {
    nombre: "Viña del Mar",
    region: "Valparaíso",
    rating: 4.6,
    reviews: "7.800",
    precio: "Gratis",
    descripcion:
      "Viña del Mar es famosa por sus playas, jardines y festivales. Los visitantes pueden disfrutar de su arquitectura, gastronomía y vida nocturna.",
    imagen: "/img/vina.png",
    miniaturas: [
      "/img/vina.png",
      "/img/vina2.png",
      "/img/vina3.png",
    ],
    lat: -33.024,
    lon: -71.551,
  }
};


  const data = destinos[id as keyof typeof destinos];

  return (
      <div className="w-full min-h-screen flex flex-col bg-white">
        {/* Barra superior */}
        <div className="relative w-full h-[260px]">
        <img src={data.imagen} className="w-full h-full object-cover" />

        {/* Botón atrás */}
        <button
          onClick={goToBack}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <ChevronLeft className="w-4" />
        </button>

        {/* Título que no tapa el botón */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-white px-4 py-1 rounded-xl shadow font-semibold text-[16px] text-[#1B1E28] inline-block">
          Detalles
          </span>
        </div>
        {/* IMAGEN SUPERIOR */}
        <div className="relative w-full h-[260px]">
        <img src={data.imagen} className="w-full h-full object-cover z-0" />
        </div>
      </div>

      {/* CONTENEDOR CURVO BLANCO */}
      <div className="relative z-20 bg-white rounded-t-[40px] p-6 mt-[-35px]">

        <h1 className="text-[22px] font-semibold text-[#1B1E28]">
          {data.nombre}
        </h1>

        <p className="text-[14px] text-[#7D848D]">
          {data.region}
        </p>

        {/* INFO EXTRA */}
        <div className="flex items-center gap-3 mt-3 text-[14px] text-[#7D848D]">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {data.region}
          </div>
          <div className="flex items-center gap-1">
            ⭐ {data.rating} ({data.reviews})
          </div>
          <div className="text-[#0A84FF] font-semibold">
            {data.precio}/Persona
          </div>
        </div>

        {/* MINI imágenes */}
        <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
          {data.miniaturas.map((m: string) => (
            <img
              key={m}
              src={m}
              className="w-16 h-16 rounded-[10px] object-cover"
            />
          ))}
        </div>

        {/* SOBRE EL DESTINO */}
        <h2 className="mt-6 text-[18px] font-semibold">Sobre el destino</h2>

        <p className="mt-2 text-[14px] text-[#444] leading-relaxed">
          {data.descripcion} <span className="text-[#0A84FF]">Leer más</span>
        </p>

      </div>

      {/* BOTONES ABAJO */}
      <div className="p-5 flex gap-3">
        <button onClick={Reservar} className="flex-1 bg-[#0A84FF] text-white py-3 rounded-[14px] font-semibold flex items-center justify-center gap-2">
          <TicketPlus className="w-5 h-5" />
          Hacer Reserva
        </button>
        <button 
          onClick={goToMap}
          className="flex-1 bg-[#062E5C] text-white py-3 rounded-[14px] font-semibold flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5" />
          Ver Ubicación
        </button>

      </div>
    </div>
  );
}
