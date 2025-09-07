import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { MdLogout, MdModeEditOutline } from "react-icons/md";
import { PiAirplaneTakeoffLight } from "react-icons/pi";


import CreateFlightModal from "../components/CreateFlightModal";
import EditFlightModal from "../components/EditFlightModal";
import PassengerListModal from "../components/PassengerListModal";
import RegisterPassengerModal from "../components/RegisterPassengerModal";
import useAuthContext from "../context/AuthHook";

const Dashboard: React.FC = () => {
  const {setIsAutenticate} = useAuthContext()
  const [openFlightModal, setOpenFlightModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPassengersModal, setOpenPassengersModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);


  //Acciones para recargar la informacion de ser necesario:
  const [accion, setAccion] =useState<boolean>(false)

  //Para editar un vuelo:
  const [ codF, setCodF] = useState<string>('');

  // En data se almacena la informacion de los vuelos:
  const [data, setData] = useState<any[]>([]);

  useEffect(()=>{
    const loadData = async ()=>{
      const res = await fetch('http://localhost:3333/dorado/infoflights')
      const respuesta = await res.json()
      setData(respuesta.data)
    }
    loadData()
  },[accion])


  const close = async () =>{
    const res = await fetch("http://localhost:3333/dorado/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    if(res.status === 200){
      return setIsAutenticate(false)
    }
  }

  // Para calcular la duracion del vuelo
  const calcularDuracion =(horasalida:any, horallegada:any) => {
  const [hSal, mSal, sSal] = horasalida.split(':').map(Number);
  const [hLleg, mLleg, sLleg] = horallegada.split(':').map(Number);

  let salidaMs = hSal * 3600 + mSal * 60 + sSal;
  let llegadaMs = hLleg * 3600 + mLleg * 60 + sLleg;

  if (llegadaMs < salidaMs) llegadaMs += 24 * 3600;

  const duracionMs = llegadaMs - salidaMs;
  const horas = Math.floor(duracionMs / 3600);
  const minutos = Math.floor((duracionMs % 3600) / 60);

  return `${horas}h ${minutos}m`;
}


  return (
    <>
      <CreateFlightModal isOpen={openFlightModal}  onClose={() => setOpenFlightModal(false)} accion={accion} setAccion={setAccion} />
      <EditFlightModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} codF={codF} setCodF={setCodF} setAccion={setAccion} accion={accion}/>
      <PassengerListModal isOpen={openPassengersModal} onClose={() => setOpenPassengersModal(false)} />
      <RegisterPassengerModal isOpen={openRegisterModal} onClose={() => setOpenRegisterModal(false)} accion={accion} setAccion={setAccion} />

      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <PiAirplaneTakeoffLight size={24} />
            Gestión de Vuelos
          </h1>
          <button className="bg-white px-4 py-2 border rounded-lg hover:bg-gray-100 transition text-sm font-medium flex items-center gap-2"
          onClick={()=>{
              close()
            }}
          >
            <MdLogout size={18} 
            />
            Cerrar Sesión
          </button>
        </header>

        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-600">
                <th>CÓDIGO DE VUELO</th>
                <th>SALA DE ABORDAJE</th>
                <th>AEROLÍNEA</th>
                <th>DESTINO</th>
                <th>HORA DE SALIDA</th>
                <th>HORA DE LLEGADA</th>
                <th>DURACIÓN DEL VUELO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {data.map((flight) => (
                <tr
                  key={flight.id}
                  className="bg-gray-50 rounded-lg shadow-sm hover:bg-blue-50 transition"
                >
                  <td className="px-2 py-3">{flight.id}</td>
                  <td className="px-2 py-3">{flight.salaabordaje}</td>
                  <td className="px-2 py-3">{flight.airline.descripcion}</td>
                  <td className="px-2 py-3">{flight.destination.descripcion}</td>
                  <td className="px-2 py-3">{flight.horasalida}</td>
                  <td className="px-2 py-3">{flight.horallegada}</td>
                  <td className="px-2 py-3">{calcularDuracion(flight.horasalida, flight.horallegada)}</td>
                  <td className="px-2 py-3 flex gap-3 text-sm">
                    <button
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                      onClick={() => {
                        setCodF(flight.id)
                        setOpenEditModal(true)
                      }}
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
