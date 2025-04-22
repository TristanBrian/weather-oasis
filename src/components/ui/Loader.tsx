
import React from "react";

/**
 * A minimal, modern spinner loader.
 */
const Loader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center justify-center ${className || ""}`}>
    <svg className="animate-spin h-6 w-6 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-70"
        fill="currentColor"
        d="M20 12A8 8 0 1 1 4 12h3a5 5 0 1 0 10 0h3z"
      />
    </svg>
  </div>
);

export default Loader;
