
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TukTaxiLogo from "./TukTaxiLogo";

const Navi = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMenu = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* ================= NAVBAR ================= */}
        <div className="h-20 flex items-center justify-between">
<Link
  to="/"
  onClick={closeMenu}
  className="flex items-center gap-3 shrink-0"
>
  <TukTaxiLogo className="w-14 h-14 sm:w-16 sm:h-16" />

  <div>
    <div className="text-white font-black text-lg leading-none">
      TUK <span className="text-yellow-400">TAXI</span>
    </div>
    <div className="text-yellow-400 text-[10px] font-bold tracking-[0.25em]">
      JBEIL
    </div>
  </div>
</Link>


          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Home
            </Link>

            <Link
              to="/services"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Services
            </Link>

            <Link
              to="/about"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              About
            </Link>

            <Link
              to="/our-clients"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Reviews
            </Link>

           

            <Link
              to="/contact"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Contact
            </Link>

            <Link
              to="/services"
              className="bg-yellow-400 text-black px-5 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
            >
              BOOK NOW
            </Link>

          </div>


          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMobileMenu((prev) => !prev)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg border border-white/20 text-white hover:text-yellow-400 hover:border-yellow-400 transition"
            aria-label="Open menu"
          >

            {mobileMenu ? (

              /* X */
              <div className="relative w-6 h-6">
                <span className="absolute top-3 left-0 w-6 h-0.5 bg-current rotate-45"></span>

                <span className="absolute top-3 left-0 w-6 h-0.5 bg-current -rotate-45"></span>
              </div>

            ) : (

              /* HAMBURGER */
              <div className="flex flex-col gap-1.5">
                <span className="w-6 h-0.5 bg-current"></span>
                <span className="w-6 h-0.5 bg-current"></span>
                <span className="w-6 h-0.5 bg-current"></span>
              </div>

            )}

          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {mobileMenu && (
          <div className="md:hidden border-t border-white/10 py-4">

            <div className="flex flex-col">

              <Link
                to="/"
                onClick={closeMenu}
                className="px-4 py-4 text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition"
              >
                Home
              </Link>

              <Link
                to="/services"
                onClick={closeMenu}
                className="px-4 py-4 text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition"
              >
                Services
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="px-4 py-4 text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition"
              >
                About
              </Link>

              <Link
                to="/our-clients"
                onClick={closeMenu}
                className="px-4 py-4 text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition"
              >
                Reviews
              </Link>

              

              <Link
                to="/contact"
                onClick={closeMenu}
                className="px-4 py-4 text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition"
              >
                Contact
              </Link>

              <Link
                to="/services"
                onClick={closeMenu}
                className="mt-3 bg-yellow-400 text-black text-center py-4 rounded-lg font-black hover:bg-yellow-300 transition"
              >
                BOOK NOW
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navi;
