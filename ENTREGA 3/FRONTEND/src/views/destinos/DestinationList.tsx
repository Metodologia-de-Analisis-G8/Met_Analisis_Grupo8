import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Destino = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  lat?: number;
  lon?: number;
  destacado?: number;
};

export default function DestinationsList() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/destinos/recomendados")
      .then((r) => r.json())
      .then((data) => {
        setDestinos(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando destinos...</div>;
  if (!destinos.length) return <div>No hay destinos</div>;

  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {destinos.map((d) => (
        <div key={d.id} className="bg-white rounded-lg shadow p-3">
          <img src={d.imagen || "/img/placeholder.png"} alt={d.nombre} className="h-40 w-full object-cover rounded" />
          <h3 className="font-semibold mt-2">{d.nombre}</h3>
          <p className="text-sm text-gray-600">{d.descripcion}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold">${d.precio}</span>
            <Link to={`/destino/${d.id}`} className="text-blue-600">Ver</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
