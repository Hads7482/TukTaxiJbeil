
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CarFront,
  MapPin,
  ShieldCheck,
  Clock3,
  Phone,
} from "lucide-react";

const TukTukIcon = ({ className = "h-8 w-8" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17 25H48L54 37H11L17 25Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M39 25L43 37" stroke="currentColor" strokeWidth="3" />
    <path
      d="M10 37H54V45H10V37Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="19" cy="49" r="6" stroke="currentColor" strokeWidth="3" />
    <circle cx="49" cy="49" r="6" stroke="currentColor" strokeWidth="3" />
    <path
      d="M21 34H34"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const benefits = [
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    description: "Your comfort and peace of mind matter to us.",
  },
  {
    icon: Clock3,
    title: "Easy Booking",
    description: "Send your trip details directly through WhatsApp.",
  },
  {
    icon: MapPin,
    title: "Local Service",
    description: "Your local ride service in Jbeil and nearby areas.",
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative flex min-h-[680px] items-center overflow-hidden pt-20 sm:min-h-[740px]">
        {/* Background image: place tuktaxi-hero.png inside public/ */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/tuktaxi-hero.png')",
          }}
        />

        {/* Dark overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        {/* Yellow ambient glow */}
        <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-yellow-400/10 blur-[100px] sm:h-96 sm:w-96" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-black/40 px-4 py-2 text-xs font-bold text-gray-200 backdrop-blur sm:text-sm">
              <MapPin className="h-4 w-4 text-yellow-400" />
              JBEIL, LEBANON
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Want A
              <br />
              <span className="text-yellow-400">Ride ?</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
              Wherever you need to go, Tuk Taxi Jbeil gets you moving.
              Choose your taxi or Tuk Tuk and book your next ride with ease.
            </p>

            {/* Responsive buttons */}
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <Link
                to="/services"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-yellow-300 min-[420px]:w-auto"
              >
                BOOK A RIDE
                <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href="tel:+96176123456"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/30 px-6 py-4 font-bold text-white transition hover:border-yellow-400 hover:text-yellow-400 min-[420px]:w-auto"
              >
                <Phone className="h-5 w-5" />
                CALL NOW
              </a>
            </div>

            {/* Ride options */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur">
                <CarFront className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-semibold">Taxi</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur">
                <TukTukIcon className="h-6 w-6 text-yellow-400" />
                <span className="text-sm font-semibold">Tuk Tuk</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop feature panel */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="ml-auto max-w-md rounded-3xl border border-yellow-400/20 bg-black/60 p-8 shadow-2xl shadow-yellow-400/5 backdrop-blur-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <TukTukIcon className="h-10 w-10" />
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
                TUK TAXI JBEIL
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight">
                One team.
                <br />
                Two ways to ride.
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                Whether you prefer a taxi or a Tuk Tuk, getting started is
                simple. Tell us where you're going and send your booking.
              </p>

              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-2 font-bold text-yellow-400 transition hover:text-yellow-300"
              >
                Start booking
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 h-1 w-2/3 bg-gradient-to-r from-yellow-400 to-transparent" />
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-400 sm:text-sm">
              WHY CHOOSE US
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Getting around,
              <span className="text-yellow-400"> made simple.</span>
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              A convenient way to arrange your ride around Jbeil.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-yellow-400/30 sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold">{title}</h3>

                <p className="mt-2 leading-7 text-gray-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 to-transparent p-6 sm:p-10 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400 sm:text-sm">
              YOUR NEXT JOURNEY
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Ready to ride?
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-gray-400">
              Choose your ride and send us your pickup and destination details.
            </p>
          </div>

          <Link
            to="/services"
            className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-yellow-300 md:mt-0 md:w-auto md:shrink-0"
          >
            BOOK NOW
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
