'use client'

import React from "react";
import { toYouTubeEmbedUrl } from "@/lib/youtube";



interface Ytlink {
    links: string[]
}

interface YoutubeLinksprops {
    ytlink: Ytlink[];
}

export default function Youtubelink({ ytlink }: YoutubeLinksprops) {
    return (
        <div className="z-[1] grid grid-cols-1 sm:grid-cols-4 gap-4">
           
            {ytlink.map((group, idx) =>
                group.links.map((link, i) => {
                    const embedUrl = toYouTubeEmbedUrl(link);
                    if (!embedUrl) {
                        return (
                            <div
                                key={`${idx}-${i}`}
                                className="flex w-[320px] h-[180px] items-center justify-center rounded-lg bg-neutral-900 px-4 text-center text-sm text-neutral-400"
                            >
                                Invalid YouTube URL.
                            </div>
                        );
                    }

                    return (
                        <iframe
                            key={`${idx}-${i}`}
                            src={embedUrl}
                            title={`YouTube video ${idx}-${i}`}
                            className=" w-[320px] h-[180px] rounded-lg"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    );
                })
            )}
           
        </div>
    )
}
