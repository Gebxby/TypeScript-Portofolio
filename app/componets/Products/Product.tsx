'use client';

import { useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react";
import { div, p } from "framer-motion/client";
import { BentoGrid, BentoGridItem } from "../BentoGrid/bento-grid";

interface Project {
    name: string;
    date: string;
    image: string;
    description: string;
    tools: string[];
    link: { url: string; type: "github" | "live" }[];
}

interface Productsprops {
    projects: Project[];
}

const IconLink = ({ href, type }: { href: string; type: string }) => {
    const icons = {
        live: <IconExternalLink size={24} />,
        github: <IconBrandGithub size={24} />,
    };

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            {icons[type as keyof typeof icons] || <IconExternalLink size={24} />}
        </a>
    );
};

const Icon = ({ name }: { name: string }) => (
    <img
        src={`/assets/img/${name}.svg`}
        alt={name}
        className={`w-6 h-6`}
        title={name}
    />
);

export default function Products({ projects }: Productsprops) {
    const [selectedProduct, setSelectedProduct] = useState<Project | null>(null);

    return (
        <div>
          <p>List of my project</p>
          <div className="overflow-x-auto">
            {/* Product Cards */}
            
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-auto">
            {projects.map((project, idx) => (
                <BentoGridItem key={project.name} className="" title={project.name} description={project.description} icon={project.image} header=""></BentoGridItem>
            ))}
        </BentoGrid>
        
        </div>
        </div>
        
    );
}
