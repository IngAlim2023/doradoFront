import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PassengerListModal = ({
  isOpen,
  onClose,
  codFPa,
  setCodFPa,
}: {
  isOpen: boolean;
  onClose: () => void;
  codFPa: string;
  setCodFPa: (codFPa: string) => void;
}) => {
  const [info, setInfo] = useState<any[]>([]);
  const [accion, setAccion] = useState<boolean>(false);
  useEffect(() => {
    const loadData = async () => {
      if (codFPa === "") {
        return;
      }
      const res = await fetch(
        `http://localhost:3333/dorado/passenger/${codFPa}`
      );
      const respuesta = await res.json();
      setInfo(respuesta.data);
    };
    loadData();
  }, [codFPa, accion]);

  const deletePassenger = async (id: any) => {
    const res = await fetch(`http://localhost:3333/dorado/passenger/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const respuesta = await res.json();
    if (respuesta.message === "Exito") {
      setAccion(!accion);
      return toast.success("Pasajero eliminado");
    }
    return toast.success("Error al eliminar el pasajero");
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Pasajeros del Vuelo</h2>
        {info.length === 0 ? (
          <div className="mt-4 flex justify-end">
            No hay pasajeros en este vuelo
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-2">
              {info.map((p, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border px-3 py-2 rounded"
                >
                  <span>{p.nombres}</span>
                  <button
                    className="text-red-600 text-sm hover:underline"
                    onClick={() => deletePassenger(p.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cerrar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PassengerListModal;
