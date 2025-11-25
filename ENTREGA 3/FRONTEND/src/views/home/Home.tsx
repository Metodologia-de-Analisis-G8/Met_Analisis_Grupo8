import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type SavedKeys = "paine" | "cajon";

export default function Home() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const goToDestination = (id: string) => {
    navigate(`/destinos/${id}`);
  };

  const goToProfile = () => {
    navigate("/perfil");
  };

  const goToMoreDestinations = () => {
    navigate("/destinos/mejores");
  };
  const goToCalendar = () => {
    navigate("/calendar");
  }

  // ❤️ estados de guardado
  const [saved, setSaved] = useState<Record<SavedKeys, boolean>>({
    paine: false,
    cajon: false,
  });

  const toggleSave = (id: SavedKeys) => {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden rounded-[30px]">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-5 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="img/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
            <div className="px-3 py-1 bg-[#F4F6FA] rounded-full text-[#1B1E28] text-[14px] font-medium">
              Jorge
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F4F6FA] flex items-center justify-center text-[14px]">ES</div>

            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-[#F4F6FA] flex items-center justify-center hover:bg-[#e5e7eb]"
            >
              <img src="img/salida.png" alt="log-out" className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-full bg-[#F4F6FA] flex items-center justify-center">
              <img src="img/notificacion.png" alt="notificacion" className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="px-5 mt-10 mb-2">
          <h1 className="text-[32px] font-light leading-[42px] text-[#1B1E28]">
            Conoce a lo largo<br />
            de <span className="font-semibold text-[#0A84FF]">Chile!</span>
          </h1>
        </div>

        <div className="px-5 flex justify-between items-center mt-6 mb-4">
          <span className="text-[18px] font-bold text-[#1B1E28]">Mejores destinos</span>
          <button onClick={goToMoreDestinations} className="text-[14px] text-[#0A84FF] cursor-pointer">Ver todo</button>
        </div>

        {/* DESTINOS */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar px-5 pb-10">

          {/* TORRES DEL PAINE */}
          <div className="min-w-[260px] bg-white rounded-[25px] shadow-md pb-4 cursor-pointer relative"
            onClick={() => goToDestination("paine")}>
            
            <div className="relative">
              <img src="img/torresdelpaine.jpg" className="w-full h-[200px] rounded-t-[25px] object-cover" />

              {/* ❤️ botón */}
              <div
                onClick={(e) => { e.stopPropagation(); toggleSave("paine"); }}
                className="absolute right-3 top-3 w-9 h-9 bg-white/70 rounded-full flex items-center justify-center backdrop-blur cursor-pointer"
              >
                <Heart
                  size={20}
                  className={`transition-all duration-300 ${
                    saved.paine
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-700"
                  }`}
                />
              </div>
            </div>

            <div className="px-4 mt-3 text-[16px] font-semibold text-[#1B1E28]">Torres del Paine</div>
            <div className="px-4 text-[14px] flex items-center gap-1 text-[#7D848D]">
              <img src="img/ubicacion.png" className="w-3 h-3" /> Magallanes y la Antártica
            </div>
            <div className="px-4 flex items-center gap-1 mt-1 text-[14px] text-[#1B1E28]">
              <img src="img/estrella.png" className="w-3 h-3" /> 4.8
            </div>
          </div>

          {/* CAJÓN DEL MAIPO */}
          <div className="min-w-[260px] bg-white rounded-[25px] shadow-md pb-4 cursor-pointer relative"
            onClick={() => goToDestination("cajon")}>

            <div className="relative">
              <img src="/img/cajondelmaipo.jpg" className="w-full h-[200px] rounded-t-[25px] object-cover" />

              {/* ❤️ botón */}
              <div
                onClick={(e) => { e.stopPropagation(); toggleSave("cajon"); }}
                className="absolute right-3 top-3 w-9 h-9 bg-white/70 rounded-full flex items-center justify-center backdrop-blur cursor-pointer"
              >
                <Heart
                  size={20}
                  className={`transition-all duration-300 ${
                    saved.cajon
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-700"
                  }`}
                />
              </div>
            </div>

            <div className="px-4 mt-3 text-[16px] font-semibold text-[#1B1E28]">Cajón del Maipo</div>
            <div className="px-4 text-[14px] flex items-center gap-1 text-[#7D848D]">
              <img src="/img/ubicacion.png" className="w-3 h-3" /> San José de Maipo
            </div>
            <div className="px-4 flex items-center gap-1 mt-1 text-[14px] text-[#1B1E28]">
              <img src="/img/estrella.png" className="w-3 h-3" /> 4.8
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="h-[90px] bg-white shadow-lg rounded-t-[25px] flex justify-around items-center">
        <div className="flex flex-col items-center">
          <img src="img/home.png" className="w-6" />
          <span className="text-[12px] text-[#007AFF]">Inicio</span>
        </div>

        <div className="flex flex-col items-center" onClick={goToCalendar}>
          <img src="img/calendar.png" className="w-6" />
          <span className="text-[12px] text-[#7D848D]">Calendario</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#007AFF] rounded-full flex items-center justify-center shadow-lg">
            <img src="img/buscar.png" className="w-6" />
          </div>
          <span className="text-[#007AFF] text-[12px] mt-1">Buscar</span>
        </div>

        <div className="flex flex-col items-center">
          <img src="img/mensaje.png" className="w-6" />
          <span className="text-[12px] text-[#7D848D]">Mensajes</span>
        </div>

        <div className="flex flex-col items-center" onClick={goToProfile}>
          <img src="img/perfil.png" className="w-6" />
          <span className="text-[12px] text-[#7D848D]">Perfil</span>
        </div>
      </div>
    </div>
  );
}