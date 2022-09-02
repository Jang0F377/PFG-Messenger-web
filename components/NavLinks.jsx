import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

function NavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {[
        ["Demo", "#demo"],
        ["Features", "#features"],
        ["Support", "#support"],
        ["Contact", "#contact"],
      ].map(([label, href], index) => (
        <Link
          key={label}
          href={href}
          className="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-xl text-neon-blue-700 transition-colors delay-150 hover:text-neon-blue-50 hover:delay-[0ms]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 rounded-lg bg-neon-blue-800"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{label}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

export default NavLinks;
