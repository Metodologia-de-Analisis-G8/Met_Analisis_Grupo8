import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapView } from "../../components/MapView.tsx";

type Horario = { id: number; fecha: string; hora: string; cupos: number };
type Destino = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  lat: number;
  lon: number;
};

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const [destino, setDestino] = useState<Destino | null>(null);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [selectedHorario, setSelectedHorario] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reservaMessage, setReservaMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:5000/destinos/${id}`).then((r) => r.json()),
      fetch(`http://localhost:5000/horarios/${id}`).then((r) => r.json())
    ])
      .then(([dest, hrs]) => {
        setDestino(dest);
        setHorarios(hrs);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  const reservar = async () => {
    if (!destino || !selectedHorario) return setReservaMessage("Seleccione un horario.");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          destino_id: destino.id,
          horario_id: selectedHorario,
          cantidad
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setReservaMessage(data?.error || "Error creando reserva");
        return;
      }
      // data.reserva_id -> proceed to payment (simple)
      setReservaMessage(`Reserva creada (id=${data.reserva_id}). Proceda al pago.`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setReservaMessage("Error de conexión al crear reserva.");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!destino) return <div>Destino no encontrado</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">{destino.nombre}</h2>
      <p className="text-gray-600">{destino.descripcion}</p>
      <div className="mt-4">
        <MapView lat={destino.lat} lon={destino.lon} title={destino.nombre} />
      </div>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Precios y servicios</h3>
        <p className="mt-1">Precio: <strong>${destino.precio}</strong></p>
        <hr className="my-3" />
        <h4 className="font-semibold">Selecciona fecha / horario</h4>
        <div className="mt-2 space-y-2">
          {horarios.length === 0 && <div>No hay horarios disponibles</div>}
          {horarios.map((h) => (
            <label key={h.id} className={`block p-2 border rounded ${selectedHorario === h.id ? 'border-blue-500' : 'border-gray-200'}`}>
              <input type="radio" name="horario" value={h.id} checked={selectedHorario === h.id} onChange={() => setSelectedHorario(h.id)} />
              <span className="ml-2">{h.fecha} - {h.hora} (cupos: {h.cupos})</span>
            </label>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <label>Cantidad:</label>
          <input type="number" min={1} value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} className="w-20 border rounded p-1" />
        </div>

        <button onClick={reservar} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Reservar</button>

        {reservaMessage && <div className="mt-3 text-sm text-gray-700">{reservaMessage}</div>}
      </div>
    </div>
  );
}
