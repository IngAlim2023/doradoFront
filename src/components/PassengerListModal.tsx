
const dummyPassengers = [
{ nombre: "Ana Pérez", email: "ana@email.com" },
{ nombre: "Juan Gómez", email: "juan@email.com" },
{ nombre: "Laura Ruiz", email: "laura@email.com" },
]


const PassengerListModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
if (!isOpen) return null
return (
<div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-md">
<h2 className="text-lg font-semibold mb-4">Pasajeros del Vuelo</h2>
<ul className="space-y-2">
{dummyPassengers.map((p, i) => (
<li key={i} className="flex justify-between items-center border px-3 py-2 rounded">
<span>{p.nombre}</span>
<button className="text-red-600 text-sm hover:underline">Eliminar</button>
</li>
))}
</ul>
<div className="mt-4 flex justify-end">
<button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cerrar</button>
</div>
</div>
</div>
)
}


export default PassengerListModal