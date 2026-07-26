'use client'

import React, { useEffect } from "react";
import GradientText from "../GradientText/GradientText";

export default function Contact() {
    useEffect(() => {
        const form = document.getElementById("form") as HTMLFormElement;
        if (!form) return;

        const formSubmit = (e: Event) => {
            e.preventDefault();
            const formData = new FormData(form);

            fetch("/api/saveForm", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }

        form.addEventListener("submit", formSubmit);
        return () => form.removeEventListener("submit", formSubmit);
    }, []);

    return (
        <div className="w-full px-4 py-10 md:px-10 lg:px-40 bg-gradient-to-b from-neutral-950 to-black min-h-screen flex justify-center items-center">
            <form
                id="form"
                className="w-full max-w-2xl bg-neutral-900 p-8 rounded-3xl shadow-lg shadow-purple-500/10 space-y-6 border border-neutral-700"
            >
                <div className="flex space-x-4 justify-center">
                    <h2 className="text-3xl font-bold text-[#f8981d] text-center">
                        {/* <GradientText
                        colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                        animationSpeed={80}
                        showBorder={false}
                        className="text-4xl font-bold"
                    >
                        Contact Me
                    </GradientText> */}
                        Contact
                    </h2>
                    <h2 className="text-3xl font-bold text-[#38b6ff] text-center" >
                        Me
                    </h2>


                </div>
                <p>E-mail : Gabrielfenanilmupengetahuan@gmail.com</p>
                <p>Line : @elgiabel77</p>
                <p>or your can send feedback to me! </p>


                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Gorgeous Name"
                        className="w-full px-4 py-2 rounded-xl bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your E-mail"
                        className="w-full px-4 py-2 rounded-xl bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={4}
                        className="w-full px-4 py-2 rounded-xl bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="space-y-2 text-white">
                    <p className="font-semibold">Your Gender</p>
                    <div className="flex space-x-4">
                        <label>
                            <input type="radio" name="gender" value="male" className="mr-1" /> Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" className="mr-1" /> Female
                        </label>
                    </div>
                </div>

                <div className="space-y-2 text-white">
                    <p className="font-semibold">You are?</p>
                    <select
                        name="You are"
                        className="w-full bg-black text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="not to choose">Anonymous (not to choose)</option>
                        <option value="High school Student">High school Student</option>
                        <option value="College Student">College Student</option>
                        <option value="Graduated Student">Graduated Student</option>
                        <option value="Worker">Worker</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-green-700 to-green-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300 shadow-md shadow-green-700/50"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
