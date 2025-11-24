import { useParams, useNavigate } from "react-router-dom";

export default function DestinationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const goToBack = () => {
    navigate('/home');
  }

  interface DestinationData {
  nombre: string;
  region: string;
  precio: string;
  rating: number;
  descripcion: string;
  imagen: string;
  reviews: string;
  miniaturas: string[];
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
      imagen: "/img/paine2.png",
      miniaturas: [
        "/img/paine2.png",
        "/img/torresdelpaine.jpg",
        "/img/torres3.png",
        /*"/img/p4.jpg",
        "/img/p5.jpg",*/
      ],
    },
    cajon: {
      nombre: "Cajon del Maipo",
      region: "Metropolitana",
      rating: 4.8,
      reviews: "1.500",
      precio: "$2.500",
      descripcion:
        "Los visitantes pueden disfrutar de una variedad de actividades, como senderismo, rafting, escalada y paseos a caballo. Además, el área cuenta con termas naturales donde los turistas pueden relajarse después de un día lleno de aventuras. El Cajón del Maipo también",
      imagen: "/img/cajon2.png",
      miniaturas: [
        "/img/cajon2.png",
        "/img/cajonmaipo.jpg",
        "/img/cajon3.png",
        /*"/img/p4.jpg",
        "/img/p5.jpg",*/
      ],
    },
  };


  const data = destinos[id as keyof typeof destinos];

  return (
    <div className="w-full h-screen flex flex-col bg-white overflow-hidden">
      
      {/* IMAGEN SUPERIOR */}
      <div className="relative w-full h-[260px]">
        <img src={data.imagen} className="w-full h-full object-cover" />

        {/* Barra superior */}
        <div className="absolute top-4 left-4 flex items-center">
          <button onClick={goToBack} className="w-9 h-9 bg-white/70 rounded-full flex items-center justify-center backdrop-blur"
            >
            <img src="/img/atras.png" className="w-4" />
          </button>
        </div>

        <div className="absolute top-4 w-full flex justify-center">
            <span className="bg-white px-4 py-1 rounded-xl shadow font-semibold text-[16px] text-[#1B1E28] inline-block">
            Detalles
            </span>
        </div>
    </div>

      {/* CONTENEDOR CURVO BLANCO */}
      <div className="bg-white rounded-t-[40px] p-6 mt-[-35px] relative z-10">

        <h1 className="text-[22px] font-semibold text-[#1B1E28]">
          {data.nombre}
        </h1>

        <p className="text-[14px] text-[#7D848D]">
          {data.region}
        </p>

        {/* INFO EXTRA */}
        <div className="flex items-center gap-3 mt-3 text-[14px] text-[#7D848D]">
          <div className="flex items-center gap-1">
            <img src="/img/ubicacion.png" className="w-4 h-4" />
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
        <button className="flex-1 bg-[#0A84FF] text-white py-3 rounded-[14px] font-semibold">
          Comprar entradas
        </button>

        <button className="flex-1 bg-[#062E5C] text-white py-3 rounded-[14px] font-semibold">
          Más información
        </button>
      </div>
    </div>
  );
}
