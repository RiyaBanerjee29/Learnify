import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import {Button , Input} from "../Utility/index"
function Login() {
  
  const {register, handleSubmit} = useForm()
  const[lgin,setLogin] = useState("")
  const login = (data) =>{
      console.log(data)
       
  }
  return (
    <div className='flex items-center flex-col justify-center '>
    <div className='flex items-center justify-center w-full py-4 my-auto'>
      <div className="mx-auto w-full max-w-lg bg-white shadow-xl rounded-xl p-10 border border-slate-300">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px] text-3xl font-bold text-rose-500">
            Pawsome
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-rose-600">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-500 transition duration-300"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login