import { ArrowLeft, Edit3, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProfileScreen() {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate('/home');
  }

  const goToEditProfile = () => {
    navigate('/perfil/editarperfil');
  }

  return (
    <div className="w-full min-h-screen bg-white px-5 pb-10 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={goToBack} className="p-2 rounded-full bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-lg">Perfil de usuario</h1>
        <button onClick={goToEditProfile} className="p-2 rounded-full bg-gray-100">
          <Edit3 className="w-5 h-5" />
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <img src="img/avatar.png" alt="avatar" className="w-24 h-24 rounded-full mb-3" />
        <p className="text-xl ">Jorge López</p>
        <p className="text-sm text-gray-500">persona1.2025@example.com</p>
      </div>

      {/* Menu Options */}
      <div className="bg-white rounded-2xl shadow-md divide-y">
        {[
          { name: "Datos" },
          { name: "Guardados" },
          { name: "Últimas visitas" },
          { name: "Configuración" },
          { name: "Chile (CL)" },
        ].map((item, idx) => (
          <button
            key={idx}
            className="flex w-full items-center justify-between px-4 py-4 hover:bg-gray-50"
          >
            <span className="text-gray-700">{item.name}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}



export default function App() {
  return <ProfileScreen />;
}