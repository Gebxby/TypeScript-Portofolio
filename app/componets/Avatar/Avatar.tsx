'use client'



import { div } from "framer-motion/client";
import { useEffect, useState } from "react";


interface AvatarProps {
    img: string;
}

export default function Avatar({ img }: AvatarProps) {
    
    return (
        <div className="">
            <img
                src={img}
                alt="Avatar"
                className="w-full h-full object-cover object-center transition duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] fade-mask"
            />
        </div>

    );

    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [isVisible, setIsVisible] = useState(true);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // Fade out
    //         setIsVisible(false);

    //         // Setelah fade out selesai (500ms), ganti gambar & fade in
    //         setTimeout(() => {
    //             setCurrentIndex((prevIndex) => (prevIndex + 1) % img.length);
    //             setIsVisible(true);
    //         }, 500); // waktu fade out
    //     }, 3000); // tampil 3 detik sebelum pindah

    //     return () => clearInterval(interval);
    // }, [img.length]);

    // return (
    //     <div className=" flex justify-center items-center">
    //         <img
    //             src={img[currentIndex]}
    //             alt={`Avatar ${currentIndex}`}
    //             className={`
    //                 w-64 h-64 object-cover transition-opacity duration-500
    //                 ${isVisible ? "opacity-100" : "opacity-0"}
    //             `}
    //         />
    //     </div>
    // );
}
