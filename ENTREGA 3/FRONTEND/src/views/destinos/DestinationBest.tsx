import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 👇 Tipo del estado de likes
type LikesState = Record<string, boolean>;

export default function DestinationBest() {
  const navigate = useNavigate();

  // 👇 Aquí se soluciona el error
  const [liked, setLiked] = useState<LikesState>({});

  // 👇 También tipamos el parámetro id
  const toggleLike = (id: string) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }
  const goToBack = () => {
    navigate('/home');
  }

  const destinos = [
    {
      id: "paine",
      nombre: "Torres del Paine",
      region: "Magallanes",
      precio: "$5.200",
      rating: 4.8,
      imagen: "/img/paine2.png",
    },
    {
      id: "cajon",
      nombre: "Cajón del Maipo",
      region: "San José de Maipo",
      precio: "$25.000",
      rating: 4.8,
      imagen: "/img/cajon2.png",
    },
    {
      id: "cristo",
      nombre: "Cerro San Cristóbal",
      region: "Recoleta",
      precio: "Gratuito",
      rating: 4.7,
      imagen: "/img/sancri.png",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">

      {/* HEADER */}
      <div className="flex items-center px-4 py-4 relative">
        <button
          onClick={goToBack}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <img src="/img/atras.png" className="w-4" />
        </button>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-semibold">
          Mejores Destinos
        </h1>
      </div>

      {/* SUBTÍTULO */}
      <h2 className="px-4 text-[20px] font-semibold mb-4">
        Lugares Más Visitados
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 px-4 pb-20">
        {destinos.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <div
              className="relative"
              onClick={() => navigate(`/destinos/${d.id}`)}
            >
              <img
                src={d.imagen}
                className="w-full h-28 object-cover"
              />

              {/* CORAZÓN ANIMADO */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // para que no abra el destino
                  toggleLike(d.id);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur hover:bg-white transition"
              >
                <Heart
                  size={20}
                  className={`transition-all duration-300 ${
                    liked[d.id]
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-700"
                  }`}
                />
              </button>
            </div>

            <div
              className="p-3"
              onClick={() => navigate(`/destinos/${d.id}`)}
            >
              <p className="font-semibold text-[14px]">{d.nombre}</p>

              <div className="flex items-center text-[12px] text-gray-500 gap-1">
                <img src="/img/ubicacion.png" className="w-3 h-3" />
                {d.region}
              </div>

              <div className="flex items-center gap-1 text-[12px] mt-1">
                ⭐ {d.rating}
              </div>

              <p className="text-[13px] text-[#0A84FF] font-semibold mt-1">
                {d.precio}/Persona
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
