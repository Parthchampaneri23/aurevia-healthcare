"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";

const indianClients = [
  {
    name: "Sun Pharma",
    location: "Mumbai, Maharashtra",
    type: "Third-Party Formulations",
    logo: "/client-logos/sun.png",
  },
  {
    name: "Cipla Healthcare",
    location: "Mumbai, Maharashtra",
    type: "Contract Manufacturing",
    logo: "/client-logos/cipla.png",
  },
  {
    name: "Mankind Pharma",
    location: "New Delhi, Delhi",
    type: "PCD & Distribution Partner",
    logo: "/client-logos/mankind.png",
  },
  {
    name: "Torrent Pharma",
    location: "Ahmedabad, Gujarat",
    type: "WHO-GMP Quality Partner",
    logo: "/client-logos/torrent.png",
  },
  {
    name: "Zydus Lifesciences",
    location: "Ahmedabad, Gujarat",
    type: "Manufacturing & Supply Partner",
    logo: "/client-logos/zydus.png",
  },
  {
    name: "Lupin Pharmaceuticals",
    location: "Mumbai, Maharashtra",
    type: "Generic Formulations",
    logo: "/client-logos/lupin.png",
  },
];

export default function ClientSlider() {
  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-12 border-t border-slate-100">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#0F766E] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
              OUR TRUSTED CLIENTS
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#123B5D] sm:text-4xl lg:text-5xl leading-tight">
            Trusted by Leading Indian Pharmaceutical Brands
          </h2>
        </div>
      </div>

      {/* Prominent Edge-to-Edge Continuous Infinite Logo Carousel */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="flex w-max animate-marquee space-x-6 sm:space-x-8">
          {[...indianClients, ...indianClients, ...indianClients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="group relative flex h-32 w-72 sm:w-80 shrink-0 items-center gap-5 rounded-2xl border border-slate-200/80 bg-white px-6 py-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#0F766E]/50 hover:bg-white hover:shadow-xl hover:shadow-teal-900/10 cursor-pointer"
            >
              {/* Top Animated Accent Bar on Hover */}
              <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full rounded-t-2xl" />

              {/* Logo Box */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-2 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:border-[#0F766E]/30">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </div>

              {/* Client Info */}
              <div className="flex flex-col justify-center overflow-hidden">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-slate-900 truncate transition-colors duration-300 group-hover:text-[#123B5D]">
                    {client.name}
                  </h3>
                  <ArrowRight
                    size={16}
                    className="text-[#0F766E] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shrink-0"
                  />
                </div>

                <p className="mt-1 text-xs font-medium text-slate-500 truncate flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#0F766E] shrink-0" />
                  {client.location}
                </p>

                <div className="mt-2.5">
                  <span className="inline-block text-[11px] font-bold text-[#0F766E] bg-teal-50 border border-teal-100/80 px-2.5 py-0.5 rounded-md transition-colors group-hover:bg-[#0F766E] group-hover:text-white">
                    {client.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
