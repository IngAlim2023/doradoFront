// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { MdLogout, MdModeEditOutline } from "react-icons/md";
import { PiAirplaneTakeoffLight } from "react-icons/pi";


import type { Flight } from "../types";
import CreateFlightModal from "../components/CreateFlightModal";
import EditFlightModal from "../components/EditFlightModal";
import PassengerListModal from "../components/PassengerListModal";
import RegisterPassengerModal from "../components/RegisterPassengerModal";

const Dashboard: React.FC = () => {
  const [openFlightModal, setOpenFlightModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPassengersModal, setOpenPassengersModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  // const [flights, setFlights] = useState<Flight[]>([]);
  const [flights,  ] = useState<Flight[]>([
  {
    codigo: "AV123",
    aerolinea: "Avianca",
    destino: "Nueva York",
    salida: "08:00",
    llegada: "13:00",
    duracion: "5h 00m",
  },
  {
    codigo: "LA456",
    aerolinea: "LATAM",
    destino: "Miami",
    salida: "09:30",
    llegada: "12:30",
    duracion: "3h 00m",
  },
  {
    codigo: "UA789",
    aerolinea: "United Airlines",
    destino: "Los Ángeles",
    salida: "11:00",
    llegada: "16:00",
    duracion: "7h 00m",
  },
  {
    codigo: "AC101",
    aerolinea: "Air Canada",
    destino: "Toronto",
    salida: "13:00",
    llegada: "18:00",
    duracion: "5h 00m",
  },
  {
    codigo: "AA222",
    aerolinea: "American Airlines",
    destino: "Dallas",
    salida: "15:30",
    llegada: "19:30",
    duracion: "4h 00m",
  },
]);

  // const addFlight = (newFlight: Flight) => {
  //   setFlights((prev) => [...prev, newFlight]);
  // };

  return (
    <>
      <CreateFlightModal isOpen={openFlightModal} onClose={() => setOpenFlightModal(false)} />
      <EditFlightModal isOpen={openEditModal} onClose={() => setOpenEditModal(false)} />
      <PassengerListModal isOpen={openPassengersModal} onClose={() => setOpenPassengersModal(false)} />
      <RegisterPassengerModal isOpen={openRegisterModal} onClose={() => setOpenRegisterModal(false)} />

      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <PiAirplaneTakeoffLight size={24} />
            Gestión de Vuelos
          </h1>
          <button className="bg-white px-4 py-2 border rounded-lg hover:bg-gray-100 transition text-sm font-medium flex items-center gap-2">
            <MdLogout size={18} />
            Cerrar Sesión
          </button>
        </header>

        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-600">
                <th>CÓDIGO DE VUELO</th>
                <th>AEROLÍNEA</th>
                <th>DESTINO</th>
                <th>HORA DE SALIDA</th>
                <th>HORA DE LLEGADA</th>
                <th>DURACIÓN DEL VUELO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr
                  key={flight.codigo}
                  className="bg-gray-50 rounded-lg shadow-sm hover:bg-blue-50 transition"
                >
                  <td className="px-2 py-3">{flight.codigo}</td>
                  <td className="px-2 py-3">{flight.aerolinea}</td>
                  <td className="px-2 py-3">{flight.destino}</td>
                  <td className="px-2 py-3">{flight.salida}</td>
                  <td className="px-2 py-3">{flight.llegada}</td>
                  <td className="px-2 py-3">{flight.duracion}</td>
                  <td className="px-2 py-3 flex gap-3 text-sm">
                    <button
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                      onClick={() => setOpenEditModal(true)}
                    >
                      <MdModeEditOutline />
                      Editar
                    </button>
                    <button
                      className="text-blue-600 hover:underline flex items-center gap-1"
                      onClick={() => setOpenPassengersModal(true)}
                    >
                      <PiAirplaneTakeoffLight />
                      Pasajeros
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setOpenFlightModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <PiAirplaneTakeoffLight />
            Crear Vuelo
          </button>
          <button
            onClick={() => setOpenRegisterModal(true)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <FaUserPlus />
            Crear Pasajero
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
