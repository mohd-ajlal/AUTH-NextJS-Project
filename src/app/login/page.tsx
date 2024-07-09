'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/utils/cn";
import {
  IconLogin,
} from "@tabler/icons-react";
import Link from 'next/link'


export default function Loginpage() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };


  const router = useRouter()

  const [user, setUser] = useState({
    email:"",
    password:"",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onLogin = async() =>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login" , user)
      console.log("SignUp Success", response.data);
      router.push('/rpofile')


    } catch (error:any) {
      console.log("Login Failed");
      toast.error(error.message)
    }
  }

  useEffect(() =>{
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])
  return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {loading ? "Processing":"Login"}
      </h1>  
      <form className="my-8" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="ajlal00786@gmail.com" type='email'
          value={user.email}
          onChange={(e) => setUser({...user, email:e.target.value})}
          />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type='password'
          value={user.password}
          onChange={(e) => setUser({...user, password:e.target.value})}
          />
      </LabelInputContainer>

      <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={onLogin}
        >
          {buttonDisabled ? "Please fill detail ": "Login "}&rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col space-y-4">
          <Link href="/signup"><button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconLogin stroke={2} className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm ">
            Sign Up
          </span>
          <BottomGradient />
        </button></Link>
        </div>
      </form>
        </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};