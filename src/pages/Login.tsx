import React from 'react';
import {useForm} from 'react-hook-form';

const Login:React.FC = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) =>{
        const res = fetch('http://localhost:3333/dorado/login')
    }
  return (
    <div className="h-[75vh] w-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="m-4">
          <h3 className="text-center font-bold text-2xl">Iniciar sesión</h3>
        </div>
        <div>
            <p className="text-gray-500">Ingresa tus credenciales</p>
        </div>
        <form className="flex flex-col gap-2 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="text-center border-indigo-200 border-b-2 focus:outline-none focus:border-indigo-300"
            placeholder="username"
            {...register('username', {required:true})}
          />

          <input type="password" className="text-center border-indigo-200 border-b-2 focus:outline-none focus:border-indigo-300" 
          placeholder="password"
          {...register('password', {required:true})}
          />
          <button className="rounded-lg bg-indigo-600 hover:bg-indigo-800 transition text-white p-1">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
