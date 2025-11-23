import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#0A84FF] flex items-center justify-center text-white">
            {/* icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4z" fill="white"/></svg>
          </div>
          <h3 className="text-lg font-semibold">Verifica tu email</h3>
          <p className="text-sm text-[#7D848D] text-center">Se han enviado los pasos para recuperar tu contraseña</p>

          <button onClick={() => navigate("/auth/login")} className="mt-4 w-full bg-[#0A84FF] text-white py-3 rounded-xl">Volver al login</button>
        </div>
      </div>
    </div>
  );
}
