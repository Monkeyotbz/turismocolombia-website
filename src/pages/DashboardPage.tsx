import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { FaHotel, FaPlane, FaMapMarkedAlt, FaUserCircle, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ADMIN_DASHBOARD_URL = "http://localhost:5174/"; // Cambia esta URL por la de producción en Vercel

const user = JSON.parse(localStorage.getItem("user") || "null");
const isSuperAdmin = user && user.rol === "superadmin";

type Reserva = {
  id: string;
  tipo: string;
  nombre: string;
  destino: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
};

const DashboardPage: React.FC = () => {
  const [section, setSection] = useState("resumen");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login");
      return;
    }
    fetch(`http://localhost:5000/api/reservas?email=${user.email}`)
      .then(res => res.json())
      .then(data => setReservas(data));
  }, [navigate]);

  if (!user) {
    return null; // O un loader
  }

  const resumenData = [
    { name: "Reservas", value: 2 },
    { name: "Vuelos", value: 1 },
    { name: "Tours", value: 3 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 pt-24">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4 sticky top-24 h-[calc(100vh-6rem)]">
        <div className="mb-8 flex items-center gap-2">
          <FaUserCircle className="text-2xl text-red-400" />
          <h2 className="text-xl font-bold truncate">{user.name || "Usuario"}</h2>
        </div>
        <button className={`text-left py-2 px-4 rounded transition-colors ${section === "resumen" ? "bg-red-100 text-red-700 font-bold" : "hover:bg-gray-100"}`} onClick={() => setSection("resumen")}>Resumen</button>
        <button className={`text-left py-2 px-4 rounded transition-colors ${section === "reservas" ? "bg-red-100 text-red-700 font-bold" : "hover:bg-gray-100"}`} onClick={() => setSection("reservas")}>Reservaciones</button>
        <button className={`text-left py-2 px-4 rounded transition-colors ${section === "vuelos" ? "bg-red-100 text-red-700 font-bold" : "hover:bg-gray-100"}`} onClick={() => setSection("vuelos")}>Tiquetes de Vuelo</button>
        <button className={`text-left py-2 px-4 rounded transition-colors ${section === "tours" ? "bg-red-100 text-red-700 font-bold" : "hover:bg-gray-100"}`} onClick={() => setSection("tours")}>Tours</button>
        <button className={`text-left py-2 px-4 rounded transition-colors ${section === "cuenta" ? "bg-red-100 text-red-700 font-bold" : "hover:bg-gray-100"}`} onClick={() => setSection("cuenta")}>Estado de Cuenta</button>
        <button className={`text-left py-2 px-4 rounded transition-colors ${section === "perfil" ? "bg-red-100 text-red-700 font-bold" : "hover:bg-gray-100"}`} onClick={() => setSection("perfil")}>Perfil</button>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow transition"
        >
          Cerrar sesión
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 max-w-6xl mx-auto">
        {/* Botón solo para superadmin */}
        {isSuperAdmin && (
          <div className="flex justify-end mb-6">
            <a
              href={ADMIN_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow transition"
            >
              Ir al Dashboard de Administración
            </a>
          </div>
        )}
        {section === "resumen" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Resumen General</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center flex flex-col items-center transition-shadow hover:shadow-xl">
                <FaHotel className="text-3xl text-red-400 mb-2" />
                <div className="text-4xl font-bold text-red-600 mb-2">2</div>
                <div className="text-gray-700">Reservaciones activas</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center flex flex-col items-center transition-shadow hover:shadow-xl">
                <FaPlane className="text-3xl text-blue-400 mb-2" />
                <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
                <div className="text-gray-700">Vuelos próximos</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center flex flex-col items-center transition-shadow hover:shadow-xl">
                <FaMapMarkedAlt className="text-3xl text-green-400 mb-2" />
                <div className="text-4xl font-bold text-green-600 mb-2">3</div>
                <div className="text-gray-700">Tours reservados</div>
              </div>
            </div>
            {/* Gráfico de barras */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Visualización de tus actividades</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={resumenData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} isAnimationActive />
                </BarChart>
              </ResponsiveContainer>
              {/* Aquí va la lógica de reservas */}
              {reservas.length === 0 ? (
                <div className="text-gray-500 mt-4">No tienes reservaciones activas.</div>
              ) : (
              reservas.filter((r: Reserva) => r.tipo === "hotel").map((reserva: Reserva) => (
                <div key={reserva.id} className="bg-white rounded-lg shadow p-6 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{reserva.nombre}</div>
                      <div className="text-gray-600 text-sm">{reserva.destino}, {reserva.fecha_inicio} - {reserva.fecha_fin}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${reserva.estado === "Confirmada" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{reserva.estado}</span>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        )}

        {section === "vuelos" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Tiquetes de Vuelo</h1>
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">Avianca AV123</div>
                  <div className="text-gray-600 text-sm">Bogotá → Cartagena, 12 Jun 2024, 10:00 AM</div>
                </div>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Check-in disponible</span>
              </div>
            </div>
          </div>
        )}

        {section === "tours" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Tus Tours</h1>
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">Tour Comuna 13</div>
                  <div className="text-gray-600 text-sm">Medellín, 14 Jun 2024, 2:00 PM</div>
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Reservado</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">Tour Tayrona</div>
                  <div className="text-gray-600 text-sm">Santa Marta, 22 Jul 2024, 8:00 AM</div>
                </div>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Pendiente</span>
              </div>
            </div>
          </div>
        )}

        {section === "cuenta" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Estado de Cuenta</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between mb-2">
                <span>Total pagado:</span>
                <span className="font-bold text-green-700">$1.200.000</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Pagos pendientes:</span>
                <span className="font-bold text-red-700">$200.000</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;