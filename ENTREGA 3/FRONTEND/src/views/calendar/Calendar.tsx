import ScheduleCard from "../../components/ScheduleCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, BellDot, House, UserRound, MessageCircleMore, CalendarDays, Search } from "lucide-react";

interface Reserva {
  title: string;
  location: string;
  date: string;
  image: string;
}

export default function Calendar() {

  const [selected, setSelected] = useState<number>(22);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const navigate = useNavigate();
  const goToProfile = () => navigate("/perfil");
  const goToBack = () => navigate("/home");
  const goToSearch = () => navigate("/search");

  // 🔥 FORMATOS VALIDOS:
  
  function obtenerDiaNumero(dateStr: string) {
    const partes = dateStr.split("-");
    return parseInt(partes[2]);  // obtiene día: 22
  }

  const reservasFiltradas = reservas.filter(r => obtenerDiaNumero(r.date) === selected);

  useEffect(() => {
    fetch("http://localhost:5000/reservas")
      .then((res) => res.json())
      .then((data) => setReservas(data))
      .catch((err) => console.error(err));
  }, []);

  const days = [
    { label: "S", day: 18 },
    { label: "M", day: 19 },
    { label: "T", day: 20 },
    { label: "W", day: 21 },
    { label: "T", day: 22 },
    { label: "F", day: 23 },
    { label: "S", day: 24 },
  ];
  console.log("RESERVAS:", reservas);
  console.log("FILTRADAS:", reservasFiltradas);


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

      {/* CALENDARIO */}
      <div className="px-5 mt-5">
        <div className="bg-[#F6F7FB] rounded-2xl p-5">
          <div className="text-[18px] font-semibold mb-3">Reservas del día</div>

          <div className="flex justify-between text-center">
            {days.map(({ label, day }) => (
              <div
                key={day}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setSelected(day)}
              >
                <span className="text-[12px] text-[#7D848D]">{label}</span>

                <div
                  className={`w-10 h-10 mt-1 flex justify-center items-center rounded-xl ${
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

      {/* LISTA DE RESERVAS */}
      <div className="mt-6 px-5 space-y-4 overflow-y-auto pb-20">
        {reservasFiltradas.length === 0 && (
          <p className="text-gray-400 text-center mt-4">
            No hay reservas para este día.
          </p>
        )}

        {reservasFiltradas.map((r, index) => (
          <ScheduleCard
            key={index}
            title={r.title}
            location={r.location}
            date={r.date}
            image={r.image}
          />
        ))}
      </div>

      {/* BOTTOM MENU */}
      <div className="absolute bottom-0 left-0 w-full h-[90px] bg-white border border-gray-500 rounded-t-[25px] flex justify-around items-center">
        <div className="flex flex-col items-center" onClick={goToBack}>
          <House />
          <span className="text-[12px] text-black">Inicio</span>
        </div>

        <div className="flex flex-col items-center">
          <CalendarDays />
          <span className="text-[12px] text-[#007AFF] font-semibold">Calendario</span>
        </div>

        <div className="flex flex-col items-center" onClick={goToSearch}>
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
