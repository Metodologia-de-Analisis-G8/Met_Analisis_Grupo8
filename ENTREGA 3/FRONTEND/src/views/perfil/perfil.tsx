import { ArrowLeft, Edit3, ChevronRight, LogOut, User, Bookmark, Clock, Settings, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProfileScreen() {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate('/home');
  }

  const goToEditProfile = () => {
    navigate('/perfil/editarperfil');
  }

  const handleLogout = () => {
    navigate("/auth/login"); 
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
      <div className="bg-white rounded-3xl shadow-lg p-2 space-y-2">
      {[
        { name: "Datos", icon: <User className="w-5 h-5 text-gray-500" /> },
        { name: "Guardados", icon: <Bookmark className="w-5 h-5 text-gray-500" /> },
        { name: "Últimas visitas", icon: <Clock className="w-5 h-5 text-gray-500" /> },
        { name: "Configuración", icon: <Settings className="w-5 h-5 text-gray-500" /> },
        { name: "Chile (CL)", icon: <Globe className="w-5 h-5 text-gray-500" /> },
      ].map((item, idx) => (
        <button
          key={idx}
          className="flex items-center justify-between w-full px-5 py-4 bg-white rounded-2xl hover:bg-gray-200/70 active:bg-gray-200 transition"
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="text-gray-700">{item.name}</span>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-semibold"
      >
        <LogOut className="w-5 h-5" />
        Cerrar sesión
      </button>
    </div>
  );
}



export default function App() {
  return <ProfileScreen />;
}