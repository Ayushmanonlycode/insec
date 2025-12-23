"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
    id: string;
    name: string;
    image: string;
}

const defaultLogos: Logo[] = [
    // Tech & Internet
    { id: "google", name: "Google", image: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg" },
    { id: "amazon", name: "Amazon", image: "https://cdn.worldvectorlogo.com/logos/amazon-com-logo.svg" },
    { id: "microsoft", name: "Microsoft", image: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
    { id: "apple", name: "Apple", image: "https://cdn.worldvectorlogo.com/logos/apple-14.svg" },
    { id: "github", name: "GitHub", image: "https://cdn.worldvectorlogo.com/logos/github-icon.svg" },
    { id: "gitlab", name: "GitLab", image: "https://cdn.worldvectorlogo.com/logos/gitlab.svg" },
    { id: "meta", name: "Meta", image: "https://cdn.worldvectorlogo.com/logos/meta-3.svg" },
    { id: "netflix", name: "Netflix", image: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg" },
    { id: "cloudflare", name: "Cloudflare", image: "https://cdn.worldvectorlogo.com/logos/cloudflare.svg" },
    { id: "atlassian", name: "Atlassian", image: "https://cdn.worldvectorlogo.com/logos/atlassian-1.svg" },
    { id: "figma", name: "Figma", image: "https://cdn.worldvectorlogo.com/logos/figma-icon.svg" },
    // E-commerce & Consumer
    { id: "flipkart", name: "Flipkart", image: "https://cdn.worldvectorlogo.com/logos/flipkart.svg" },
    { id: "zomato", name: "Zomato", image: "https://cdn.worldvectorlogo.com/logos/zomato-1.svg" },
    { id: "paytm", name: "Paytm", image: "https://cdn.worldvectorlogo.com/logos/paytm-1.svg" },
    { id: "dominos", name: "Domino's", image: "https://cdn.worldvectorlogo.com/logos/dominos-pizza-4.svg" },
    { id: "sony", name: "Sony", image: "https://cdn.worldvectorlogo.com/logos/sony-2.svg" },
    { id: "dell", name: "Dell", image: "https://cdn.worldvectorlogo.com/logos/dell-2.svg" },
    { id: "asus", name: "ASUS", image: "https://cdn.worldvectorlogo.com/logos/asus-rog-1-1.svg" },
    // Fintech & Payments
    { id: "mastercard", name: "Mastercard", image: "https://cdn.worldvectorlogo.com/logos/mastercard-6.svg" },
    { id: "visa", name: "Visa", image: "https://cdn.worldvectorlogo.com/logos/visa-10.svg" },
    // Security
    { id: "hackerone", name: "HackerOne", image: "https://cdn.worldvectorlogo.com/logos/hackerone.svg" },
    { id: "bacardi", name: "Bacardi", image: "https://cdn.worldvectorlogo.com/logos/bacardi-2.svg" },
];

function Case() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        const timer = setTimeout(() => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent(current + 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [api, current]);

    return (
        <div className="w-full py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black/40">
                            Global Partner Network
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight lg:max-w-4xl text-left text-black uppercase leading-[0.9]">
                            Trusted by <br className="hidden md:block" />
                            <span className="text-black/20">thousands of</span><br className="hidden lg:block" /> businesses worldwide
                        </h2>
                    </div>

                    <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
                        <CarouselContent className="-ml-4">
                            {defaultLogos.map((logo) => (
                                <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-4" key={logo.id}>
                                    <div className="flex items-center justify-center p-6 opacity-60 hover:opacity-100 transition-all duration-500 h-32 w-full">
                                        <img
                                            src={logo.image}
                                            alt={logo.name}
                                            className="h-14 md:h-16 w-auto object-contain"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export { Case };
