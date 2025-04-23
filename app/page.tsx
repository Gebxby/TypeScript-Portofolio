'use client'

import Image from "next/image";
import Link from "next/link";
import TiltedCard from "./componets/TiltedCard/TiltedCard";
import RotatingText from "./componets/RotatingText/RotatingText";
import FadeContent from "./componets/FadeContent/FadeContent";
import DecryptedText from "./componets/DecryptedText/DecryptedText";
import { div } from "framer-motion/client";

import Particles from "./componets/Particles/Particles";
import AnimatedList from "./componets/AnimatedList/AnimatedList";
import Marquee from "react-fast-marquee";
import DisplayVelocity from "./componets/DisplayVelocity/DisplayVelocity";
import VelocityShowcase from "./componets/DisplayVelocity/DisplayVelocity";
import Dock from "./componets/Dock/Dock";
import SpotlightCard from "./componets/SpotlightCard/SpotlightCard";
import { FloatingDock } from "./componets/Ui/Floating-Dock";
import {
  IconBrandGithub,
  IconBrandSpotify,
  IconBrandX,
  IconBrandYoutube,
  IconExchange,
  IconHome,
  IconNewSection,
  IconPencil,
  IconTerminal2, icons
} from "@tabler/icons-react";


export default function Home() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products Or Masterpiece",
      icon: (
        <IconPencil className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Spotify",
      icon: (
        <IconBrandSpotify className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        // <img
        //   src="Spo"
        //   width={20}
        //   height={20}
        //   alt="Aceternity Logo"
        // />
      ),
      href: "#",
    },
    {
      title: "Youtube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];



  return (
    <div className=" min-h-screen overflow-x-hidden">
      {/* bg */}
      <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-[-1] ">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={150}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false} />
      </div>
      <div className="w-full flex justify-center pt-20 ">
        <FloatingDock
          mobileClassName="translate-y-20" // only for demo, remove for production
          items={links}
        />
      </div>


      {/* content */}
      <div className="container  mx-auto h-full">
        <div className="grid grid-cols-12">



          <div className="col-span-6">
            <div className="mt-50 ml-auto">
              <div className="flex flex-col ">
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                  <div className="flex items-center gap-3">
                    <h1 className="text-6xl font-bold text-[#f8981d]">Hello</h1>
                    <h1 className="text-6xl font-bold text-[#38b6ff]">Internet!</h1>
                  </div>

                </FadeContent>
                {/* <FadeContent blur={true} duration={2500} easing="ease-out" initialOpacity={0}>
                  <h1 className="text-4xl font-bold">My name is Gabriel</h1>
                </FadeContent> */}

              </div>
              <br /><br />
              <div className="flex flex-col gap-6">
                {/* <div className="">
                  <FadeContent blur={true} duration={5000} easing="ease-out" initialOpacity={0}>
                    <div className="flex items-center gap-2">
                      <h1 className=" text-2xl text-amber-50 font-bold  ">My Hobby</h1>
                      <RotatingText
                        texts={['Drawing', 'Sing', 'Coding', 'Thinking']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-[#38b6ff] text-black overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg text-2xl font-bold inline-flex transition-all"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                      />
                    </div>

                  </FadeContent>

                </div> */}
              </div>
              <br />
              <div className="">
                <DecryptedText text="My Name is" />
                <p className="text-[#faff00]"><DecryptedText text="Gabriel Selwas Aboyaman Fenanlampir" /></p>
                <p>i am a undgraduate Computer science University of Indonesia, this is my second years of collage and for sure i really enjoy my collage; with my hands i do drawing, i'am a singer, i like to Photographic, i used to design (poster, website, game), and last but not least i really love coding. </p>
              </div>
            </div>




          </div>

          <div className="col-span-6 items-center mt-auto ml-25">
            {/* <TiltedCard
              imageSrc="./assets/img/FotoProfile.jpg"
              altText="Gabriel - A person"
              captionText="Gabriel - A person"
              containerHeight="350px"
              containerWidth="350px"
              imageHeight="350px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="text-2xl font-bold tilted-card-demo-text bg-[#323333] rounded-2xl px-2">
                  Gabriel F - A Person
                </p>
              }
            /> */}


          </div>
          <div className="col col-span-12 ">
            {/* <div className="z-10 container mx-[500px] mb-20 w-150 h-90 overflow-x-hidden mt-50 items-center col-span-6 bg-black rounded-2xl hover:border-b hover:scale-101 hover:shadow-[0_0_25px_#38b6ff] 
  transition-all  hover:border-[#38b6ff]  hover:bg-gradient-to-b from-[#000000] to-[#222424] hover:rounded-2xl
 border-1 transition all duration-500 ease-in-out">
              <Marquee className="w-full" pauseOnHover={true} speed={90} gradient={true} autoFill={true} gradientColor="black">

                <div className="flex gap-10 items-center">
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950 ml-10">
                    <Image src="/assets/img/python.svg" alt="Python" width={60} height={60} />
                  </div>
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950">
                    <Image src="/assets/img/js.svg" alt="JavaScript" width={60} height={60} />
                  </div>
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950">
                    <Image src="/assets/img/react.svg" alt="React" width={60} height={60} />
                  </div>
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950">
                    <Image src="/assets/img/dj.svg" alt="React" width={60} height={60} />
                  </div>
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950">
                    <Image src="/assets/img/dart.svg" alt="React" width={60} height={60} />
                  </div>
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950">
                    <Image src="/assets/img/flutter.svg" alt="React" width={60} height={60} />
                  </div>
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950">
                    <Image src="/assets/img/nextjss.svg" alt="React" width={60} height={60} />
                  </div>
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950">
                    <Image src="/assets/img/tailwind.svg" alt="React" width={60} height={60} />
                  </div>
                  <div className="border-white border-1 rounded-2xl p-2 bg-cyan-950">
                    <Image src="/assets/img/ts.svg" alt="React" width={60} height={60} />
                  </div>
                </div>
              </Marquee>
            </div> */}



          </div>
        </div>
      </div>

      {/* displays skill */}
      <div className="container  mx-auto h-full">
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

                <div className="border-white border-1 rounded-2xl p-2 ml-10 mr-10">
                  <Image src="/assets/img/GPT.svg" alt="Python" width={60} height={60} />
                </div>
                {/* <div className="border-white border-1 rounded-2xl p-2 ml-10 mr-10">
                  <Image src="https://assets.aceternity.com/logo-dark.png" alt="Ui aceternity" width={60} height={60} />
                </div> */}
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
      </div>


    </div>
  );
}

