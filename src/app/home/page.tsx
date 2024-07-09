"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { AuroraBackground } from "../components/ui/aurora-background"
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

export default function Homepage() {
  return (
    <>
    <Navbar/>
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Auth Project With NextJS
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          By Mohd Ajlal
        </div>
        <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
       < AceternityLogo />
          <span>LogIn</span>
          </HoverBorderGradient>
      </motion.div>
    </AuroraBackground>
    </>
  )
}


const AceternityLogo = () => {
    return (
      <svg
        width="66"
        height="65"
        viewBox="0 0 66 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-black dark:text-white"
      >
        <path
          d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
          stroke="currentColor"
          strokeWidth="15"
          strokeMiterlimit="3.86874"
          strokeLinecap="round"
        />
      </svg>
    );
  };
