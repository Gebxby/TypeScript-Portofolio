'use client'

import Marquee from "react-fast-marquee";
import Image from "next/image";
// import { useEffect, useState, useRef } from 'react';
import * as React from "react";

import { div } from "framer-motion/client";


interface DisplayVelocityprops {
    logo : string;
    altName : string;
    className:"";
}


const DisplayVelocityData = ({ logo, altName, className}: DisplayVelocityprops) => {
    return(
        <div>
            <img src="{logo}" alt="{altName}" className="" />
        </div>
    )
}
const logo: DisplayVelocityprops[] = [
    {altName : "Python", logo: "./assets/img/python.svg", className: ""},
    {altName: 'JS', logo: "./assets/img/js.svg", className: ""},    
];

const VelocityShowcase =()=>{
    return (
        <div className="w-auto py-6 bg-neutral-100">
          
            {logo.map((item, index) => (
              <DisplayVelocityData
                key={index}
                logo={item.logo}
                altName={item.altName}
                className=""
              />
            ))}
         
        </div>
      );
}

export default VelocityShowcase;
