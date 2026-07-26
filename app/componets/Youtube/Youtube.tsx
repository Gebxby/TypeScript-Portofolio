'use client'

import { useEffect, useState } from "react";
import Youtubelink from "./YoutubeLink";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import { IconBrandYoutube } from "@tabler/icons-react";
import FadeUpOnScroll from "../FadeUpOnScroll/FadeUpOnScroll";
import Avatar from "../Avatar/Avatar";

export default function Youtube() {
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        console.log("✅ YouTube data:", data);
        setChannel(data);
      } catch (error) {
        console.error("❌ Failed to fetch YouTube data:", error);
      }
    }
    fetchData();
  }, []);

  if (
    !channel ||
    !channel.snippet ||
    !channel.snippet.thumbnails?.high?.url ||
    !channel.statistics
  ) {
    return <div className="text-white">Loading YouTube channel...</div>;
  }

  return (
    <div className="relative w-full min-h-screen">



      <FadeUpOnScroll>
        <div className="absolute inset-0 z-[-1]">

          <img src="./assets/img/DYTB2.png" alt="" />
        </div>
        <SpotlightCard

          className="custom-spotlight-card z-[1] mx-auto mt-12 w-[320px] sm:w-[400px] hover:shadow-[0_0_25px_#e8050c] transition-all duration-300 ease-in-out"

          spotlightColor="rgba(232, 5, 12, 0.4)"
        >
          <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col items-center text-center">
              <img
                src={channel.snippet.thumbnails.high.url}
                alt="Channel Thumbnail"
                className="rounded-full w-32 h-32 shadow-md"
              />
              <h2 className="text-2xl font-bold mt-4">
                {channel.snippet.title}
              </h2>
              <p className="text-gray-400 mt-1 text-lg">
                {parseInt(channel.statistics.subscriberCount).toLocaleString()} subscribers
              </p>
              <a
                href={`https://youtube.com/channel/${channel.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
              >
                <IconBrandYoutube className="w-5 h-5" />
                Subscribe
              </a>
            </div>


          </div>
          
        </SpotlightCard>
        <div className="mt-10">
            <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
              <Youtubelink
                ytlink={[
                  {
                    links: [
                      "https://www.youtube.com/embed/YJ-YJ3iZdZY?si=HiYp4HEHo-Q43WpV",
                      "https://www.youtube.com/embed//lZ4QhYa6GGc?si=8cu8iLrmlXHsRm5c",
                      "https://www.youtube.com/embed/tY94a7Tm364?si=tDFKnHWTtll-f1zZ",
                      "https://www.youtube.com/embed/-GeIRRfJZ24?si=30O3A1YHHRJJb2s5"
                    
                    ],
                  },
                ]}
              />
            </div>
          </div>
      </FadeUpOnScroll>
    </div>

  );
}
