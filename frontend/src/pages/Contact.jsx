
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock3,
  Send,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const WHATSAPP_NUMBER = "96103803370"; 
const PHONE_NUMBER = "+96103803370"; 

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Please complete your name, phone number, and message.");
      return;
    }

    const text = [
      "Hello TUK TAXI JBEIL!",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Subject: ${form.subject}`,
      `Message: ${form.message.trim()}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with us directly",
      value: PHONE_NUMBER,
      href: `tel:${PHONE_NUMBER}`,
      action: "Call Now",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Send us a message",
      value: "Chat with our team",
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      action: "Message Us",
    },
    {
      icon: MapPin,
      title: "Our Location",
      description: "Serving Jbeil and surrounding areas",
      value: "Jbeil, Lebanon",
      href: "https://www.google.com/maps/search/?api=1&query=Jbeil%2C%20Lebanon",
      action: "View Map",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-10">
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Get in Touch
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Let's Talk About
              <br />
              <span className="text-yellow-400">Your Next Ride.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Need a taxi, a tuk-tuk, or have a question? Contact TUK TAXI
              JBEIL. We're here to help you arrange your journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="px-4 pb-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.title === "WhatsApp" || item.title === "Our Location" ? "_blank" : undefined}
                rel={item.title === "WhatsApp" || item.title === "Our Location" ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-yellow-400/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                    <Icon size={25} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-gray-500 transition group-hover:text-yellow-400"
                  />
                </div>

                <h2 className="mt-5 text-xl font-black">{item.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{item.description}</p>
                <p className="mt-4 break-words font-semibold text-white">
                  {item.value}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
                  {item.action}
                  <ArrowUpRight size={16} />
                </span>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-400">
              Contact Our Team
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              How Can We
              <span className="text-yellow-400"> Help You?</span>
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Send us your question or request using the form. When you submit
              it, WhatsApp will open with your message ready to send.
            </p>

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-950 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <Clock3 size={23} />
              </div>
              <div>
                <h3 className="font-black">Need a ride urgently?</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Call us directly or message us on WhatsApp to discuss your
                  ride.
                </p>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="mt-3 inline-flex items-center gap-2 font-bold text-yellow-400 hover:text-yellow-300"
                >
                  Call Now <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-zinc-950 p-5 sm:p-8"
          >
            <h3 className="text-2xl font-black">Send Us a Message</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Fill in your details and continue through WhatsApp.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Phone Number *
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="Your phone number"
                  autoComplete="tel"
                  required
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-semibold text-gray-300"
              >
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={updateField}
                className="min-h-12 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none transition focus:border-yellow-400"
              >
                <option>General Inquiry</option>
                <option>Book a Taxi</option>
                <option>Book a Tuk Tuk</option>
                <option>Business Partnership</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold text-gray-300"
              >
                Your Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="Tell us how we can help..."
                rows={5}
                required
                className="w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
              />
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-black text-black transition hover:bg-yellow-300"
            >
              Continue on WhatsApp
              <Send size={18} />
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-gray-500">
              <CheckCircle2 size={15} className="shrink-0 text-yellow-400" />
              Your message will be prepared in WhatsApp for you to send.
            </p>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
