import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Notification() {
    
  const navigate = useNavigate();

  const gotoBack = () => {
    navigate("/home");
  };
  const [tab, setTab] = useState("recent");

  const notifications = [
    { name: "Super Offer", msg: "Get 60% off in our first booking", date: "Sun,12:40pm", color: "bg-blue-200" },
    { name: "Super Offer", msg: "Get 60% off in our first booking", date: "Mon,11:50pm", color: "bg-pink-200" },
    { name: "Super Offer", msg: "Get 60% off in our first booking", date: "Tue,10:56pm", color: "bg-green-200" },
    { name: "Super Offer", msg: "Get 60% off in our first booking", date: "Wed,12:40pm", color: "bg-gray-200" },
    { name: "Super Offer", msg: "Get 60% off in our first booking", date: "Fri,11:50pm", color: "bg-red-200" },
    { name: "Super Offer", msg: "Get 60% off in our first booking", date: "Sat,10:56pm", color: "bg-yellow-200" },
  ];

  return (
    <div className="w-full h-screen bg-white flex flex-col text-[15px]">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={gotoBack}><ArrowLeft size={22} /></button>
        <span className="font-semibold text-[17px]">Notificaciones</span>
        <button className="text-blue-600 text-sm">Limpiar</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 px-4 border-b">
        <button onClick={() => setTab("recent")} className={`pb-2 ${tab==="recent" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-400"}`}>
          Reciente
        </button>
        <button onClick={() => setTab("earlier")} className={`pb-2 ${tab==="earlier" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-400"}`}>
          Anteriores
        </button>
        <button onClick={() => setTab("archived")} className={`pb-2 ${tab==="archived" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-400"}`}>
          Archivadas
        </button>
      </div>

      {/* Lista de notificaciones */}
      <div className="flex-1 overflow-y-auto px-3 mt-3">

        {tab === "recent" &&
          notifications.map((n, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl mb-2 ${i===0 ? "bg-blue-50" : ""}`}>
              
              {/* Avatar fake con fondo */}
              <div className={`${n.color} w-12 h-12 rounded-full`} />

              {/* Texto */}
              <div className="flex-1 ml-3">
                <p className="font-semibold text-[15px]">{n.name}</p>
                <p className="text-gray-500 text-[13px]">{n.msg}</p>
              </div>

              {/* Hora */}
              <span className="text-gray-400 text-[12px]">{n.date}</span>
            </div>
          ))
        }

        {tab !== "recent" && (
          <p className="text-gray-400 text-center mt-10">No notifications</p>
        )}
      </div>

    </div>
  );
}
