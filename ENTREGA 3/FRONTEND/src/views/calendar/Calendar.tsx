import ScheduleCard from "../../components/ScheduleCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, BellDot, House, UserRound, MessageCircleMore, CalendarDays, Search } from "lucide-react";

export default function Calendar() {
    const [selected, setSelected] = useState(22);

    const days = [
        { label: "S", day: 18 },
        { label: "M", day: 19 },
        { label: "T", day: 20 },
        { label: "W", day: 21 },
        { label: "T", day: 22 },
        { label: "F", day: 23 },
        { label: "S", day: 24 },
    ];

    const navigate = useNavigate();
    const goToProfile = () => {
    navigate("/perfil");
    };
    const goToBack = () => {
      navigate('/home');
    }
    const [filter] = useState<"today" | "week" | "month">("today");
    return (
    <div className="w-full min-h-screen bg-white px-5 pb-10 pt-6">

      <div className="flex items-center justify-between mb-6">
        <button onClick={goToBack} className="p-2 rounded-full bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-lg">Calendario</h1>
        <button className="p-2 rounded-full bg-gray-100">
          <BellDot className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 mt-5">
      <div className="bg-[#F6F7FB] rounded-2xl p-5">
        <div className="text-[18px] font-semibold mb-3">22 October</div>

        <div className="flex justify-between text-center">
          {days.map(({ label, day }) => (
            <div
              key={day}
              className="flex flex-col items-center"
              onClick={() => setSelected(day)}
            >
              <span className="text-[12px] text-[#7D848D]">{label}</span>

              <div
                className={`w-10 h-10 mt-1 flex justify-center items-center rounded-xl
                ${
                  selected === day
                    ? "bg-[#0A84FF] text-white font-semibold"
                    : "text-[#1B1E28]"
                }`}
              >
                {day}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      <div className="px-5 mt-6 flex justify-between items-center">
        <span className="text-[18px] font-bold">Mis Reservas</span>
        <span className="text-[14px] text-[#0A84FF]">Ver todo</span>
      </div>

      <div className="mt-4 px-5 space-y-4 overflow-y-auto pb-20">

        {filter === "today" && (
          <ScheduleCard
            title="Cajón del Maipo"
            location="Región Metropolitana"
            date="26 Enero 2026"
            image="/img/cajon2.png"
          />
        )}

        {filter === "today" && (
          <ScheduleCard
            title="Paine"
            location="Magallanes y la Antártica"
            date="28 Febrero 2026"
            image="/img/torres3.png"
          />
        )}

        {filter === "today" && (
          <ScheduleCard
            title="Cerro San Cristóbal"
            location="Región Metropolitana"
            date="15 Febrero 2025"
            image="/img/sancri.png"
          />
        )}

      </div>
        {/* BOTTOM BAR */}
        <div className="absolute bottom-0 left-0 w-full h-[90px] bg-white border border-gray-500 rounded-t-[25px] flex justify-around items-center">
        <div className="flex flex-col items-center" onClick={goToBack}>
          <House />
          <span className="text-[12px] text-black">Inicio</span>
        </div>

        <div className="flex flex-col items-center">
          <CalendarDays/>
          <span className="text-[12px] text-[#007AFF] font-semibold">Calendario</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#007AFF] rounded-full flex items-center justify-center shadow-lg">
            <Search className="w-6 text-white" />
          </div>
          <span className="text-black text-[12px] mt-1">Buscar</span>
        </div>

        <div className="flex flex-col items-center">
          <MessageCircleMore />
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
