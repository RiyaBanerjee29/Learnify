import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../Utility/index";
import useMyStore from "../../Store/ZustandStore.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const storeLogin = useMyStore((state) => state.login);  
  const [lgin, setLogin] = useState("");
  const navigate = useNavigate()

  const registration = (data) => {
    console.log(data);
    storeLogin(data.name , 29 , data.userType )
    navigate("/")

  };
  return (
    <div className="flex items-center flex-col justify-center ">
      <div className="flex items-center justify-center w-full py-4 my-auto">
        <div className="mx-auto w-full max-w-lg bg-white shadow-xl rounded-xl p-10 border border-slate-300">
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px] text-3xl font-bold text-rose-500">
              Pawsome
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-rose-600">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit(registration)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Name: "
                type="text"
                placeholder="Enter your Name"
                {...register("name", {
                  required: true,
                })}
              />

              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
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
              <div className="flex flex-col">
                <label htmlFor="userType">Adopter or Caretaker?</label>
                <select
                  id="userType"
                  className="w-full rounded-md border border-slate-300 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-50 px-3 py-2"
                  {...register("userType", {
                    required: true,
                    onChange: (e) => setUserType(e.target.value),
                  })}
                >
                  <option value="">-- Select User Type --</option>
                  <option className="hover:bg-rose-200" value="Caretaker">Caretaker</option>
                  <option className="hover:bg-rose-200" value="Adopter">Adopter</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-500 transition duration-300"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
