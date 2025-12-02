import { Search, Mic, ChevronLeft, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/home");
  };

  const places = [
    { id: "paine", name: "Torres del Paine", img: "/img/torresdelpaine.jpg", location: "Magallanes", rating: 4.8 },
    { id: "cajon", name: "Cajón del Maipo", img: "/img/cajondelmaipo.jpg", location: "RM", rating: 4.7 },
    { id: "atacama", name: "San Pedro de Atacama", img: "/img/atacama.png", location: "Antofagasta", rating: 4.6 },
    { id: "valparaiso", name: "Valparaíso", img: "/img/valpo.png", location: "Valparaíso", rating: 4.5 },
    { id: "viña", name: "Viña del Mar", img: "/img/vina.png", location: "Valparaíso", rating: 4.4 },
    // puedes agregar más
  ];

  return (
    <div className="w-full h-screen bg-white flex flex-col rounded-[30px]">
      
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 gap-2">
        <div className="flex items-center w-full relative">
  <button onClick={goToHome} className="p-2 rounded-full bg-gray-100">
    <ChevronLeft className="w-5 h-5" />
  </button>

  <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold text-lg text-center">
    Buscar
  </h1>
</div>
        </div>

      {/* SEARCH BAR */}
      <div className="mx-4 flex items-center bg-[#F4F6FA] rounded-full px-4 py-2">
        <Search className="text-gray-500 w-5" />
        <input
          type="text"
          placeholder="Buscar destino"
          className="bg-transparent flex-grow px-3 text-[15px] outline-none"
        />
        <Mic className="text-gray-500 w-5" />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto">
        {places.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[20px] shadow p-2 cursor-pointer"
            onClick={() => navigate(`/destinos/${item.id}`)}
          >
            <img
              src={item.img}
              className="w-full h-[120px] object-cover rounded-[15px]"
            />
            <div className="mt-2 text-[15px] font-semibold text-[#1B1E28]">
              {item.name}
            </div>
            <div className="flex items-center text-[13px] text-[#7D848D]">
              <MapPin className="w-3 h-3 mr-1" /> {item.location}
            </div>
            <div className="flex items-center text-[13px] text-[#1B1E28]">
              <Star className="w-3 h-3 mr-1" /> {item.rating}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
