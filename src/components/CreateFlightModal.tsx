import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateFlightModal = ({
  isOpen,
  onClose,
  accion,
  setAccion
}: {
  isOpen: boolean;
  onClose: () => void;
  accion: boolean;
  setAccion:(accion:boolean) => void;
}) => {
  if (!isOpen) return null;

  const { register, handleSubmit } = useForm();
  
  // Vamos a almacenar la informacion de la aerolinea:
  const [airlines, setAirlines] = useState<any[]>([])
  const [destino, setDestino] = useState<any[]>([])

  useEffect(()=>{
    const loadData = async () =>{
        const res = await fetch("http://localhost:3333/dorado/airline");
        const respuesta = await res.json()
        
        const resDes = await fetch("http://localhost:3333/dorado/destinos");
        const respuestaDes = await resDes.json()


        setAirlines(respuesta.data)
        setDestino(respuestaDes.data)
    }
    loadData()
  }, [])

  const onSubmit = async (data: any) => {
    
    const res = await fetch("http://localhost:3333/dorado/flight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const respuesta = await res.json()
    
    if(respuesta.message === 'Exito'){
        setAccion(!accion)
        toast.success('Vuelo creado')
        onClose()
        return
    }
    return toast.error('No se pudo crear el vuelo')

  };


  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Crear Vuelo</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Sala de abordaje"
            {...register("salaabordaje", { required: true })}
          />
          <label > Hora salida</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="time"
            {...register("horasalida", { required: true })}
          />
          <label> Hora llegada</label>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Hora de llegada"
            type="time"
            {...register("horallegada", { required: true })}
          />
          <label> Seleccionar aerolinea</label>
          <select
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("codaerolinea", { required: true })}
          >
            <option value="">-- Seleccione la aerolinea --</option>
            {airlines.map((val) => (
              <option key={val.id} value={val.id}>
                {val.descripcion}
              </option>
            ))}
          </select>
          <label> Seleccionar destino</label>
          <select
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("coddestino", { required: true })}
          >
            <option value="">-- Seleccione el destino --</option>
            {destino.map((val) => (
              <option key={val.id} value={val.id}>
                {val.descripcion}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFlightModal;
