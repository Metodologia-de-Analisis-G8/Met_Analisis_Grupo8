

import { useParams } from "react-router-dom";
interface DestinationData {
  name: string;
  region: string;
  price: string;
  rating: string;
  description: string;
  image: string;
}

const destinationsData: Record<string, DestinationData> = {
  paine: {
    name: "Torres del Paine",
    region: "Magallanes",
    price: "5200",
    rating: "4.8",
    description: "Un parque con trekking y paisajes hermosos.",
    image: "/img/torresdelpaine.jpg"
  },
  atacama: {
    name: "San Pedro de Atacama",
    region: "Antofagasta",
    price: "3900",
    rating: "4.7",
    description: "El desierto más árido del mundo, con lagunas, salares y estrellas.",
    image: "/img/atacama.jpg"
  },
  rapa_nui: {
    name: "Rapa Nui",
    region: "Isla de Pascua",
    price: "8900",
    rating: "4.9",
    description: "Una cultura misteriosa llena de historia y moai.",
    image: "/img/rapanui.jpg"
  },
  cajon_maipo: {
    name: "Cajón del Maipo",
    region: "Metropolitana",
    price: "2500",
    rating: "4.8",
    description: "Un valle con ríos y montañas para actividades al aire libre.",
    image: "/img/cajondelmaipo.jpg"
  }
};

export default function DestinationDetails() {
  const { id } = useParams();
  const data = destinationsData[id as string];

  if (!data) return <div>No existe este destino</div>;

  return (
    <div>
      <img src={data.image} className="w-full h-60 object-cover" />

      <div className="p-4">
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <p className="text-gray-500">{data.region}</p>
        <p className="mt-2 text-gray-700">{data.description}</p>
      </div>
    </div>
  );
}
