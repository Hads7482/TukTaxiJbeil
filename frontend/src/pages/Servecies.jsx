import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import {
  ArrowRight,
  CarFront,
  MapPin,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  Navigation,
  X,
  LocateFixed,
  Map,
} from "lucide-react";

const WHATSAPP_NUMBER = "96103803370";

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

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Enter Your Trip",
    description: "Tell us your pickup location and destination.",
  },
  {
    number: "02",
    icon: Navigation,
    title: "Choose Your Ride",
    description: "Select a Taxi or a Tuk Tuk for your journey.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Send Your Booking",
    description: "Your trip details open in WhatsApp, ready to send.",
  },
];

// ========================================
// GOOGLE MAPS PICKUP LOCATION SELECTOR
// ========================================

function GoogleMapPicker({ onConfirm, onClose }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);
  const geocoderRef = useRef(null);
  const requestId = useRef(0);

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState("");
  const [locating, setLocating] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    let cancelled = false;
    let clickListener;
    let dragListener;

    async function initializeMap() {
      try {
        if (!apiKey) {
          throw new Error(
            "Google Maps API key is missing. Please check your .env file."
          );
        }

        setOptions({
          key: apiKey,
          v: "weekly",
        });

        const [{ Map }, { Geocoder }] = await Promise.all([
          importLibrary("maps"),
          importLibrary("geocoding"),
        ]);

        if (cancelled) return;

        const map = new Map(mapRef.current, {
          center: { lat: 34.1236, lng: 35.6511 },
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          clickableIcons: false,
          gestureHandling: "greedy",
          backgroundColor: "#09090b",
        });

        const geocoder = new Geocoder();

        mapInstance.current = map;
        geocoderRef.current = geocoder;

        const marker = new window.google.maps.Marker({
          map,
          draggable: true,
          title: "Your pickup location",
          visible: false,
          animation: window.google.maps.Animation.DROP,
        });

        markerRef.current = marker;

        const selectLocation = async (position) => {
          const lat = position.lat();
          const lng = position.lng();

          const currentRequest = ++requestId.current;

          marker.setPosition(position);
          marker.setVisible(true);
          map.panTo(position);

          setSelected({
            lat,
            lng,
            address: "Finding address...",
          });

          setMapError("");

          try {
            const response = await geocoder.geocode({
              location: { lat, lng },
            });

            if (cancelled || currentRequest !== requestId.current) return;

            const address =
              response.results?.[0]?.formatted_address ||
              `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

            setSelected({
              lat,
              lng,
              address,
            });
          } catch {
            if (cancelled || currentRequest !== requestId.current) return;

            setSelected({
              lat,
              lng,
              address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            });

            setMapError(
              "Address could not be found. You can still use this map location."
            );
          }
        };

        clickListener = map.addListener("click", (event) => {
          if (event.latLng) {
            selectLocation(event.latLng);
          }
        });

        dragListener = marker.addListener("dragend", (event) => {
          if (event.latLng) {
            selectLocation(event.latLng);
          }
        });

        setLoading(false);
      } catch (error) {
        if (!cancelled) {
          setMapError(
            error.message || "Could not load Google Maps. Please try again."
          );
          setLoading(false);
        }
      }
    }

    initializeMap();

    return () => {
      cancelled = true;
      requestId.current++;

      if (clickListener) clickListener.remove();
      if (dragListener) dragListener.remove();
    };
  }, [apiKey]);

  // USE CUSTOMER'S CURRENT LOCATION

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMapError("Your browser does not support location services.");
      return;
    }

    setLocating(true);
    setMapError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const location = { lat, lng };

        const point = new window.google.maps.LatLng(lat, lng);

        mapInstance.current?.setCenter(point);
        mapInstance.current?.setZoom(17);

        markerRef.current?.setPosition(point);
        markerRef.current?.setVisible(true);

        const currentRequest = ++requestId.current;

        setSelected({
          lat,
          lng,
          address: "Finding address...",
        });

        try {
          const response = await geocoderRef.current.geocode({
            location,
          });

          if (currentRequest !== requestId.current) return;

          const address =
            response.results?.[0]?.formatted_address ||
            `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

          setSelected({ lat, lng, address });
        } catch {
          if (currentRequest !== requestId.current) return;

          setSelected({
            lat,
            lng,
            address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          });

          setMapError("Address unavailable. Your map pin is still saved.");
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        setLocating(false);

        if (error.code === 1) {
          setMapError(
            "Location permission denied. Allow location access in your browser."
          );
        } else if (error.code === 3) {
          setMapError("Location request timed out. Please try again.");
        } else {
          setMapError(
            "Unable to find your location. Please select it manually."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const confirmPickup = () => {
    if (!selected || selected.address === "Finding address...") return;

    onConfirm(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6">
      <div className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-yellow-400/30 bg-zinc-950 shadow-2xl shadow-yellow-400/5">

        {/* MAP HEADER */}

        <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-5">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-400" />
              <h2 className="text-lg font-black sm:text-xl">
                Choose Pickup Location
              </h2>
            </div>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Tap anywhere on the map or drag the yellow pin.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close map"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* GOOGLE MAP */}

        <div className="relative min-h-[280px] flex-1 bg-zinc-900">
          <div
            ref={mapRef}
            className="h-[45vh] min-h-[280px] max-h-[450px] w-full"
          />

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950">
              <Map className="h-10 w-10 text-yellow-400" />
              <p className="font-bold text-yellow-400">
                Loading Google Maps...
              </p>
            </div>
          )}
        </div>

        {/* MAP CONTROLS */}

        <div className="space-y-4 p-4 sm:p-5">

          <button
            type="button"
            onClick={useCurrentLocation}
            disabled={loading || locating}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 font-bold text-yellow-400 transition hover:bg-yellow-400/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LocateFixed className="h-5 w-5" />

            {locating
              ? "Finding Your Location..."
              : "Use My Current Location"}
          </button>

          {/* SELECTED ADDRESS */}

          <div className="rounded-xl border border-white/10 bg-black p-3 sm:p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
              Selected Pickup Location
            </p>

            {selected ? (
              <>
                <p className="mt-2 text-sm leading-6 text-white">
                  {selected.address}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {selected.lat.toFixed(6)}, {selected.lng.toFixed(6)}
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                Select a location on the map to continue.
              </p>
            )}
          </div>

          {mapError && (
            <p role="alert" className="text-sm leading-5 text-red-400">
              {mapError}
            </p>
          )}

          {/* CONFIRM BUTTON */}

          <button
            type="button"
            onClick={confirmPickup}
            disabled={
              loading ||
              !selected ||
              selected.address === "Finding address..."
            }
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-4 font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCircle2 className="h-5 w-5" />
            CONFIRM PICKUP
            <ArrowRight className="h-5 w-5" />
          </button>

          <p className="text-center text-xs text-gray-500">
            Make sure the pin is placed at your exact pickup location.
          </p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// MAIN SERVICES PAGE
// ========================================

export default function Servecies() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ride, setRide] = useState("taxi");

  const [pickupTimeMode, setPickupTimeMode] = useState("asap");
  const [pickupTime, setPickupTime] = useState("");

  const [passengers, setPassengers] = useState("1");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");

  const [mapOpen, setMapOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState(null);

  // ========================================
  // WHATSAPP BOOKING
  // ========================================

  const handleBooking = (event) => {
    event.preventDefault();

    if (!from.trim() || !to.trim()) {
      setError("Please enter your pickup and destination.");
      return;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setError("Your pickup and destination cannot be the same.");
      return;
    }

    if (pickupTimeMode === "scheduled" && !pickupTime) {
      setError("Please choose your pickup time, or select ASAP.");
      return;
    }

    setError("");

    const rideName = ride === "taxi" ? "Taxi / Car" : "Tuk Tuk";

    const pickupMapLink = pickupLocation
      ? `https://www.google.com/maps?q=${pickupLocation.lat},${pickupLocation.lng}`
      : "Not selected from map";

    const formattedPickupTime =
      pickupTimeMode === "asap"
        ? "As soon as possible (ASAP)"
        : new Date(`2000-01-01T${pickupTime}`).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          });

    const message = [
      "Hello Tuk Taxi Jbeil!",
      "",
      "I would like to book a ride.",
      "",
      `Pickup: ${from.trim()}`,
      `Pickup Google Maps: ${pickupMapLink}`,
      `Destination: ${to.trim()}`,
      `Pickup time: ${formattedPickupTime}`,
      `Ride type: ${rideName}`,
      `Passengers: ${passengers}`,
      `Notes: ${notes.trim() || "None"}`,
      "",
      "Please confirm availability. Thank you!",
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">

      {/* ================================== */}
      {/* PAGE HEADER */}
      {/* ================================== */}

      <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[100px] sm:h-96 sm:w-96" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-xs font-bold text-gray-300 sm:text-sm">
            <MapPin className="h-4 w-4 text-yellow-400" />
            JBEIL, LEBANON
          </div>

          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            OUR <span className="text-yellow-400">SERVICES</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
            Wherever you need to go, choose your ride and book it in a few
            simple steps.
          </p>
        </motion.div>
      </section>

      {/* ================================== */}
      {/* RIDE OPTIONS */}
      {/* ================================== */}

      <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">

          {/* TAXI */}

          <button
            type="button"
            onClick={() => setRide("taxi")}
            aria-pressed={ride === "taxi"}
            className={`rounded-2xl border p-5 text-left transition duration-200 sm:p-7 ${
              ride === "taxi"
                ? "border-yellow-400 bg-yellow-400/[0.08] shadow-lg shadow-yellow-400/5"
                : "border-white/10 bg-white/[0.03] hover:border-yellow-400/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black sm:h-16 sm:w-16">
                <CarFront className="h-8 w-8" />
              </div>

              {ride === "taxi" && (
                <CheckCircle2 className="h-6 w-6 text-yellow-400" />
              )}
            </div>

            <h2 className="mt-5 text-2xl font-black">Taxi / Car</h2>

            <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
              A comfortable ride for your everyday trips.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
              {ride === "taxi" ? "Selected" : "Choose Taxi"}
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>

          {/* TUK TUK */}

          <button
            type="button"
            onClick={() => setRide("tuktuk")}
            aria-pressed={ride === "tuktuk"}
            className={`rounded-2xl border p-5 text-left transition duration-200 sm:p-7 ${
              ride === "tuktuk"
                ? "border-yellow-400 bg-yellow-400/[0.08] shadow-lg shadow-yellow-400/5"
                : "border-white/10 bg-white/[0.03] hover:border-yellow-400/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400 text-black sm:h-16 sm:w-16">
                <TukTukIcon className="h-10 w-10" />
              </div>

              {ride === "tuktuk" && (
                <CheckCircle2 className="h-6 w-6 text-yellow-400" />
              )}
            </div>

            <h2 className="mt-5 text-2xl font-black">Tuk Tuk</h2>

            <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
              A convenient option for getting around locally.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
              {ride === "tuktuk" ? "Selected" : "Choose Tuk Tuk"}
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </section>

      {/* ================================== */}
      {/* BOOKING FORM */}
      {/* ================================== */}

      <section
        id="book-ride"
        className="scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10"
      >
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 p-5 sm:p-8 md:p-10">

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <MapPin className="h-7 w-7" />
            </div>

            <h2 className="mt-4 text-2xl font-black sm:text-3xl">
              Book Your Ride
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Enter your trip details below.
            </p>
          </div>

          <form onSubmit={handleBooking} className="mt-8 space-y-5">

            {/* PICKUP LOCATION */}

            <div>
              <label
                htmlFor="pickup"
                className="mb-2 block text-sm font-bold text-gray-200"
              >
                Pickup Location
              </label>

              <div className="space-y-3">
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-yellow-400" />

                  <input
                    id="pickup"
                    type="text"
                    value={from}
                    onChange={(event) => {
                      setFrom(event.target.value);
                      setPickupLocation(null);
                    }}
                    placeholder="Where should we pick you up?"
                    autoComplete="street-address"
                    required
                    className="min-h-14 w-full min-w-0 rounded-xl border border-white/10 bg-black py-4 pl-12 pr-4 text-base text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setMapOpen(true)}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 font-bold text-yellow-400 transition hover:bg-yellow-400/20"
                >
                  <MapPin className="h-5 w-5" />
                  Choose Pickup on Google Maps
                </button>

                {pickupLocation && (
                  <div className="flex items-start gap-2 rounded-lg bg-green-400/5 p-3 text-xs leading-5 text-green-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      Exact pickup location selected from Google Maps.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* DESTINATION */}

            <div>
              <label
                htmlFor="destination"
                className="mb-2 block text-sm font-bold text-gray-200"
              >
                Destination
              </label>

              <div className="relative">
                <Navigation className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-yellow-400" />

                <input
                  id="destination"
                  type="text"
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  placeholder="Where are you going?"
                  required
                  className="min-h-14 w-full min-w-0 rounded-xl border border-white/10 bg-black py-4 pl-12 pr-4 text-base text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
                />
              </div>
            </div>

            {/* PICKUP TIME */}

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-200">
                Pickup Time
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPickupTimeMode("asap");
                    setPickupTime("");
                    setError("");
                  }}
                  aria-pressed={pickupTimeMode === "asap"}
                  className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    pickupTimeMode === "asap"
                      ? "border-yellow-400 bg-yellow-400 text-black"
                      : "border-white/10 bg-black text-gray-300 hover:border-yellow-400/50"
                  }`}
                >
                  Now
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPickupTimeMode("scheduled");
                    setError("");
                  }}
                  aria-pressed={pickupTimeMode === "scheduled"}
                  className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    pickupTimeMode === "scheduled"
                      ? "border-yellow-400 bg-yellow-400 text-black"
                      : "border-white/10 bg-black text-gray-300 hover:border-yellow-400/50"
                  }`}
                >
                  Choose Time
                </button>
              </div>

              {pickupTimeMode === "scheduled" && (
                <div className="relative mt-3">
                  <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-yellow-400" />

                  <input
                    id="pickup-time"
                    type="time"
                    value={pickupTime}
                    onChange={(event) => {
                      setPickupTime(event.target.value);
                      setError("");
                    }}
                    required
                    className="min-h-14 w-full rounded-xl border border-white/10 bg-black py-4 pl-12 pr-4 text-base text-white outline-none [color-scheme:dark] focus:border-yellow-400"
                  />
                </div>
              )}

              <p className="mt-2 text-xs text-gray-500">
                {pickupTimeMode === "asap"
                  ? "We'll ask the team to arrange your ride as soon as possible."
                  : "Choose the time you'd like to be picked up. The team will confirm availability."}
              </p>
            </div>

            {/* PASSENGERS */}

            <div>
              <label
                htmlFor="passengers"
                className="mb-2 block text-sm font-bold text-gray-200"
              >
                Number of Passengers
              </label>

              <select
                id="passengers"
                value={passengers}
                onChange={(event) => setPassengers(event.target.value)}
                className="min-h-14 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none focus:border-yellow-400"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option key={count} value={String(count)}>
                    {count} {count === 1 ? "Passenger" : "Passengers"}
                  </option>
                ))}
              </select>
            </div>

            {/* OPTIONAL NOTES */}

            <div>
              <label
                htmlFor="booking-notes"
                className="mb-2 block text-sm font-bold text-gray-200"
              >
                Notes <span className="font-normal text-gray-500">(Optional)</span>
              </label>

              <textarea
                id="booking-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                placeholder="Any extra details for the driver?"
                className="w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 text-base text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
              />
            </div>

            {/* SELECTED RIDE */}

            <div className="rounded-xl border border-white/10 bg-black p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Selected ride
                </p>

                <p className="mt-1 font-bold">
                  {ride === "taxi" ? "Taxi / Car" : "Tuk Tuk"}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-yellow-400 sm:mt-0">
                {ride === "taxi" ? (
                  <CarFront className="h-5 w-5" />
                ) : (
                  <TukTukIcon className="h-6 w-6" />
                )}

                Ready to book
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            {/* WHATSAPP BUTTON */}

            <button
              type="submit"
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-4 text-center font-black text-black transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              BOOK ON WHATSAPP
              <ArrowRight className="h-5 w-5 shrink-0" />
            </button>

            <p className="text-center text-xs leading-5 text-gray-500">
              WhatsApp will open with your trip details, pickup time, and map link.
              Your booking is only confirmed after the team replies.
            </p>
          </form>
        </div>
      </section>

      {/* ================================== */}
      {/* HOW IT WORKS */}
      {/* ================================== */}

      <section className="border-y border-white/5 bg-zinc-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-400 sm:text-sm">
              SIMPLE AND CONVENIENT
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">
              How It <span className="text-yellow-400">Works</span>
            </h2>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ number, icon: Icon, title, description }) => (
              <article
                key={number}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="text-3xl font-black text-white/15">
                    {number}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">{title}</h3>

                <p className="mt-2 leading-7 text-gray-400">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 p-5">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-yellow-400" />

              <div>
                <h3 className="font-bold">Reliable Service</h3>

                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Contact our team directly to arrange your trip.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 p-5">
              <Clock3 className="mt-1 h-5 w-5 shrink-0 text-yellow-400" />

              <div>
                <h3 className="font-bold">Quick Booking</h3>

                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Send your pickup and destination in one message.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================== */}
      {/* GOOGLE MAP MODAL */}
      {/* ================================== */}

      {mapOpen && (
        <GoogleMapPicker
          onConfirm={(location) => {
            setPickupLocation(location);
            setFrom(location.address);
            setError("");
          }}
          onClose={() => setMapOpen(false)}
        />
      )}
    </div>
  );
}