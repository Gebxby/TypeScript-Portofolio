'use client'
import Image from "next/image";
import Link from "next/link";

import { div, img } from "framer-motion/client";


import Marquee from "react-fast-marquee";

import {
    IconArrowAutofitContent,
    IconBrandGithub,
    IconBrandSpotify,
    IconBrandX,
    IconBrandYoutube,
    IconExchange,
    IconHome,
    IconNewSection,
    IconPencil,
    IconPointerFilled,
    IconTerminal2, icons
} from "@tabler/icons-react";
import SpotlightCard from "../componets/SpotlightCard/SpotlightCard";

export default function SetDisplay() {
    return (
      
            <div className="grid grid-cols-12 ">
                <div className="col col-span-6">
                    <SpotlightCard className="custom-spotlight-card z-10 container mb-20 w-150 h-90 overflow-x-hidden mt-50 hover:shadow-[0_0_25px_#fa9109] transition-all duration-300 ease-in-out   " spotlightColor="rgba(248, 152, 29, 0.2)">
                        <Marquee className="w-full" pauseOnHover={true} speed={50} gradient={true} autoFill={true} gradientColor="#171717">

                            <div className="w-[200px] h-[200px] flex items-center justify-center border border-white rounded-2xl ml-10 mr-10">
                                <p>Ketua Osis</p>
                            </div>

                            <div className="flex gap-10 items-center">
                                {[
                                    "Ketua Panitia FPN", "Juara 1 Photographi", "Magang Di PACE-UI"
                                ].map((judul, idx) => (
                                    <div key={idx} className="w-[200px] h-[200px] flex items-center justify-center border border-white rounded-2xl">
                                        <p>{judul}</p>
                                    </div>
                                ))}
                            </div>
                        </Marquee>
                        <br /><br />

                        <h3 className="text-2xl sm:text-xl font-extrabold text-center  text-[#f8981d] drop-shadow-[0_0_10px_rgba(248,152,29,0.7)] animate-pulse tracking-wide">
                            <strong>🌟 my Experiances</strong>
                        </h3>
                    </SpotlightCard>
                </div>

                <div className="col col-span-6">
                    <SpotlightCard className="custom-spotlight-card z-10 container mb-20 w-150 h-90 overflow-x-hidden mt-50 hover:shadow-[0_0_25px_#38b6ff] transition-all duration-300 ease-in-out  " spotlightColor="rgba(56, 182, 255, 0.2)">
                        <Marquee className="w-full" pauseOnHover={true} speed={50} gradient={true} autoFill={true} gradientColor="#171717">

                            <div className="border-white border-1 rounded-2xl p-2 ml-10 mr-10">
                                <Image src="/assets/img/python.svg" alt="Python" width={60} height={60} />
                            </div>

                            <div className="flex gap-10 items-center">
                                {[
                                    "HTML", "CSS", "js", "react", "dj", "dart", "flutter", "nextjss", "tailwind", "ts", "expressjs"
                                ].map((name, idx) => (
                                    <div key={idx} className="w-[80px] h-[80px] flex items-center justify-center border border-white rounded-2xl">
                                        <Image src={`/assets/img/${name}.svg`} alt={name} width={40} height={40} />
                                    </div>
                                ))}
                            </div>
                        </Marquee>
                        <br />
                        <Marquee className="w-full" pauseOnHover={true} speed={50} gradient={true} autoFill={true} gradientColor="#171717" direction="right">

                            <div className="border-white border-1 rounded-2xl p-2 ml-10 mr-1">
                                <Image src="/assets/img/GPT.svg" alt="Python" width={60} height={60} />
                            </div>
                            <div className="border-white border-1 rounded-2xl p-2 ml-10 mr-10">
                                <img src="https://assets.aceternity.com/logo-dark.png" alt="Ui aceternity" width={60} height={60} />
                                {/* <Img src="https://assets.aceternity.com/logo-dark.png" alt="Ui aceternity" width={60} height={60} /> */}
                            </div>
                            <div className="flex gap-10 items-center">
                                {[
                                    "Deepseek", "Discord Blue Icon", "Git", "Youtube Icon", "Netlify New 2023", "Google"
                                ].map((name, idx) => (
                                    <div key={idx} className="w-[80px] h-[80px] flex items-center justify-center border border-white rounded-2xl">
                                        <Image src={`/assets/img/${name}.svg`} alt={name} width={40} height={40} />
                                    </div>
                                ))}
                            </div>
                        </Marquee>
                        <br /><br />
                        <h3 className="text-2xl sm:text-xl font-extrabold text-center  text-[#38c3ff] drop-shadow-[0_0_10px_rgba(248,152,29,0.7)] animate-pulse tracking-wide">
                            <strong>⚙️ my Tools and Tech i use</strong>
                        </h3>
                    </SpotlightCard>
                </div>

            </div>
    
                )
}