import { useNavigate } from "react-router-dom";

const destinations = [
  {
    id: "paine",
    name: "Torres del Paine",
    region: "Magallanes",
    price: "5200",
    rating: "4.8",
    image: "/img/torresdelpaine.jpg"
  },
  {
    id: "atacama",
    name: "San Pedro de Atacama",
    region: "Antofagasta",
    price: "3900",
    rating: "4.7",
    image: "/img/atacama.jpg"
  },
  {
    id: "cajon",
    name: "Cajón del Maipo",
    region: "Metropolitana",
    price: "2500",
    rating: "4.8",
    image: "/img/cajondelmaipo.jpg"
  },
  {
    id: "rapa_nui",
    name: "Rapa Nui",
    region: "Isla de Pascua",
    price: "8900",
    rating: "4.9",
    image: "/img/rapanui.jpg"
  }
];

export default function DestinationList() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Destinos disponibles</h2>

      {destinations.map(dest => (
        <div
          key={dest.id}
          onClick={() => navigate(`/destination/${dest.id}`)}
          className="cursor-pointer mb-4 bg-gray-100 rounded-xl overflow-hidden"
        >
          <img src={dest.image} className="h-36 w-full object-cover" />
          <div className="p-3">
            <h3 className="font-semibold">{dest.name}</h3>
            <p className="text-sm text-gray-500">{dest.region}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
