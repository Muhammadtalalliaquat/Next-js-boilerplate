"use client";

import { useState } from "react";
import { setCookie } from 'cookies-next';
import axios from 'axios'
import { ApiRoutes } from '@/constant/constant';
import { loginUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux";


export default function Login() {

  const [ isLoading , setIsLoading ] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const loginUserToAPI = (e) => { 
    e.preventDefault()
    const obj = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    axios.post(ApiRoutes.login , obj).then((res)=> {
      console.log(`res.data=>` , res.data)
      setCookie(`token` , res.data?.data?.token)
      dispatch(loginUser(res.data?.data.user))
      setIsLoading(false)
      router.push(`/task`)
    })
    .catch((error)=>{
      console.log(error.response.data)
      setIsLoading(false)
    })
  }

  return (
    <>
      <form onSubmit={loginUserToAPI} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="enter email"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="enter password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {/* <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
            //   defaultValue
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div> */}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          { isLoading ? `loading...` : `Sign in`}
        </button>
      </form>
    </>
  );
}
