
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  MapPin,
  HeartHandshake,
  CarFront,
  CheckCircle2,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Your safety matters. We aim to provide dependable rides and a comfortable travel experience.",
  },
  {
    icon: Clock3,
    title: "Always Reliable",
    description:
      "We value your time and work to make every trip smooth, convenient, and reliable.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Care",
    description:
      "Every passenger matters. We believe in friendly service and treating customers with respect.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    description:
      "With a focus on Jbeil and the surrounding areas, we help make getting around easier.",
  },
];

const About = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-10">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-yellow-400/5 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              About TUK TAXI JBEIL
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Getting You
              <br />
              There With
              <br />
              <span className="text-yellow-400">Confidence.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
              We make getting around Jbeil easier by bringing taxi and tuk-tuk
              transportation together in one convenient service. Whether
              you're heading to work, meeting friends, or exploring the area,
              we're here to help you get where you need to go.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-black text-black transition hover:bg-yellow-300"
              >
                Explore Our Services
                <ArrowRight size={19} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-bold text-white transition hover:border-yellow-400 hover:text-yellow-400"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* TRANSPORT CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-4 shadow-2xl shadow-yellow-400/5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    ONE SERVICE
                  </p>
                  <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                    Two Ways to Ride
                  </h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <CarFront size={26} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black p-5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <CarFront size={28} />
                  </div>
                  <h3 className="text-xl font-black">Taxi</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    A convenient option for everyday trips and comfortable
                    journeys.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black p-5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      className="h-8 w-8"
                      aria-hidden="true"
                    >
                      <path
                        d="M17 25H48L54 37H11L17 25Z"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M39 25L43 37"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        d="M10 37H54V45H10V37Z"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="19"
                        cy="49"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <circle
                        cx="49"
                        cy="49"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black">Tuk Tuk</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    A practical alternative for getting around town with ease.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-yellow-400 p-4 text-black">
                <CheckCircle2 className="mt-0.5 shrink-0" size={22} />
                <div>
                  <p className="font-black">Your journey matters</p>
                  <p className="mt-1 text-sm leading-6 text-black/70">
                    Our goal is to make every ride simple, convenient, and
                    customer-focused.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="border-y border-white/10 bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-400">
              Our Mission
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Making Every Journey
              <span className="text-yellow-400"> Easier.</span>
            </h2>
          </div>

          <p className="text-base leading-8 text-gray-400 sm:text-lg">
            At TUK TAXI JBEIL, our goal is to give people a convenient way to
            travel by offering two transportation options through one service.
            We focus on friendly communication, dependable service, and making
            it easier for customers to arrange their rides.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-400">
              What Matters to Us
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              The Values Behind Every Ride
            </h2>
            <p className="mt-4 leading-7 text-gray-400">
              We want every customer to feel that choosing their ride is simple
              and that their experience matters.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/50"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Icon size={25} />
                  </div>
                  <h3 className="text-lg font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-yellow-400 px-6 py-12 text-center text-black sm:px-12 sm:py-16">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-black/60">
            Ready to Ride?
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black sm:text-5xl">
            Your Destination Is Just a Ride Away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-black/70">
            Choose your ride and let us help you plan your next trip.
          </p>
          <Link
            to="/services"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 py-3 font-black text-white transition hover:bg-zinc-800"
          >
            Book Your Ride
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
