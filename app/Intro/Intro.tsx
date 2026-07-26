'use client'

import DecryptedText from "../componets/DecryptedText/DecryptedText"
import FadeContent from "../componets/FadeContent/FadeContent"
import FadeUpOnScroll from "../componets/FadeUpOnScroll/FadeUpOnScroll"

export default function IntroBar() {
  return (
    <FadeUpOnScroll>
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
              </div>
              <br /><br />
              <div className="flex flex-col gap-6">
              </div>
              <br />
              <div className="" id="#1">
                <DecryptedText text="My Name is" />
                <p className="text-[#faff00]"><DecryptedText text="Gabriel Selwas Aboyaman Fenanlampir" /></p>
                <FadeContent>
                    <p>I'm a second-year Computer Science student at the University of Indonesia. Outside of coding, I love expressing myself through drawing, singing, photography, and design—whether it's posters, websites, or even games. Creativity and logic are what drive me, both in art and in tech.</p>
                </FadeContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeUpOnScroll>
  )
}