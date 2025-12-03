import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";

export default function ReservaView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [error, setError] = useState("");

  const confirmarReserva = () => {
    if (!fecha || !hora) {
      setError("⚠️ Debes seleccionar fecha y hora antes de continuar");
      return;
    }
    setError("");

    localStorage.setItem(
      "reserva",
      JSON.stringify({
        destino: id,
        fecha,
        hora,
      })
    );

    navigate("/home");
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F7FA] p-5">

      <div className="max-w-md mx-auto mt-6 bg-white rounded-[18px] shadow-md p-6 border border-gray-200">

        <h1 className="text-[22px] font-bold text-[#1B1E28] text-center mb-2">
          Realizar Reserva
        </h1>

        <p className="text-[14px] text-[#555] text-center mb-6">
          Selecciona la fecha y el horario en que deseas realizar tu recorrido.
        </p>

        {/* FECHA */}
        <label className="block text-[14px] font-semibold text-[#1B1E28] mb-1">
          Fecha del recorrido
        </label>

        <div className="relative">
          <CalendarDays className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <input
            type="date"
            className="border rounded-xl px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0A84FF]"
            min={new Date().toISOString().split("T")[0]}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        {/* HORA */}
        <label className="block mt-6 text-[14px] font-semibold text-[#1B1E28] mb-1">
          Horario del recorrido
        </label>

        <div className="relative">
          <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <select
            className="border rounded-xl px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0A84FF]"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          >
            <option value="">Seleccione un horario</option>
            <option value="08:00"> 08:00</option>
            <option value="10:00"> 10:00</option>
            <option value="12:00"> 12:00</option>
            <option value="15:00"> 15:00</option>
          </select>
        </div>

        {/* NOTIFICACIÓN DE ERROR */}
        {error && (
          <div className="mt-5 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* BOTÓN */}
        <button
          onClick={confirmarReserva}
          className="mt-8 flex items-center justify-center gap-2 bg-[#0A84FF] hover:bg-[#006FE6] transition text-white py-3 w-full rounded-xl font-semibold"
        >
          <CheckCircle2 className="w-5 h-5" />
          Confirmar Reserva
        </button>

      </div>
    </div>
  );
}
