import { Search, Mic, ChevronLeft, MapPin, Star, House, CalendarDays, MessageCircleMore, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/home");
  };
    const goToCalendar = () => {
      navigate("/calendar");
    };
    const goToProfile = () => {
      navigate("/perfil");
    };

  const places = [
    { id: "paine", name: "Torres del Paine", img: "/img/torresdelpaine.jpg", location: "Magallanes", rating: 4.8 },
    { id: "cajon", name: "Cajón del Maipo", img: "/img/cajondelmaipo.jpg", location: "RM", rating: 4.7 },
    { id: "atacama", name: "San Pedro de Atacama", img: "/img/atacama.png", location: "Antofagasta", rating: 4.6 },
    { id: "valparaiso", name: "Valparaíso", img: "/img/valpo.png", location: "Valparaíso", rating: 4.5 },
    { id: "viña", name: "Viña del Mar", img: "/img/vina.png", location: "Valparaíso", rating: 4.4 },
    
  ];

  return (
    <div className="w-full h-screen bg-white flex flex-col rounded-[30px] relative">
      
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
      <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto pb-[120px]">
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
      <div className="absolute bottom-0 left-0 w-full h-[90px] bg-white border border-gray-500 rounded-t-[25px] flex justify-around items-center">
        <div className="flex flex-col items-center" onClick={goToHome}>
          <House />
          <span className="text-black text-[12px] mt-1">Inicio</span>
        </div>

        <div className="flex flex-col items-center" onClick={goToCalendar}>
          <CalendarDays/>
          <span className="text-[12px] text-black">Calendario</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#007AFF] rounded-full flex items-center justify-center shadow-lg">
            <Search className="w-6 text-white" />
          </div>
          <span className="text-[12px] text-[#007AFF] font-semibold">Buscar</span>
        </div>

        <div className="flex flex-col items-center">
          <MessageCircleMore/>
          <span className="text-[12px] text-black">Mensajes</span>
        </div>

        <div className="flex flex-col items-center" onClick={goToProfile}>
          <UserRound />
          <span className="text-[12px] text-black">Perfil</span>
        </div>
      </div>

    </div>
  );
}
