import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


export function EditProfileScreen() {
    const navigate = useNavigate();

    const goToBack = () => {
      navigate('/perfil');
    }

    const goToMenu = () => {
      navigate('/home');
    }
  return (
    <div className="w-full min-h-screen bg-white px-5 pb-10 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={goToBack} className="p-2 rounded-full bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-lg">Editar Perfil</h1>
        <button onClick={goToMenu} className="text-blue-600 font-semibold">Listo</button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <img src="/img/avatar.png" alt="avatar" className="w-30 h-30 rounded-full mb-3" />
        <p className="text-xl font-semibold">Jorge López</p>
        <button className="text-blue-600 text-sm">Cambiar foto de perfil</button>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {[
          { label: "Nombre/s", value: "Jorge" },
          { label: "Apellido", value: "López" },
          { label: "Ciudad", value: "Valparaíso" },
          { label: "Número de contacto", value: "+56 9 1234 5678" },
        ].map((field, idx) => (
          <div key={idx}>
            <p className="text-gray-500 mb-1 text-sm">{field.label}</p>
            <div className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3">
              <span className="text-gray-700">{field.value}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}