"use client"

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link' 
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetail = async() =>{
    const res = await axios.get("/api/users/me")
    console.log(res.data)
    setData(res.data.data._id)
  }

  const logout = async() =>{
    try {
      await axios.get('/api/users/logout')
      toast.success("Logged out successfully")
      router.push("/home")
    } catch (error:any) {
        console.log(error.message);
        toast.error(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      <h2>
        {data === "nothing" ? "Nothing": <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      <button onClick={getUserDetail} className="bg-blue-500 text-white px-4 py-2 rounded-md">Get User Details</button>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
    </div>
  )
}