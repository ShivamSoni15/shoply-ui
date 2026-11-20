
import React from "react";
import { ShoppingBag } from "lucide-react";

const ShoplyLogo = ({
  size = "md",
  showTagline = false,
  showIcon = true,
  variant = "dark",
  className = "",
}) => {
  const sizes = {
    sm: {
      icon: "w-8 h-8",
      iconSize: 17,
      title: "text-xl",
      tagline: "text-[9px]",
    },
    md: {
      icon: "w-10 h-10",
      iconSize: 21,
      title: "text-2xl",
      tagline: "text-[10px]",
    },
    lg: {
      icon: "w-12 h-12",
      iconSize: 25,
      title: "text-3xl",
      tagline: "text-xs",
    },
  };

  const themes = {
    dark: {
      text: "text-slate-900",
      tagline: "text-slate-500",
      iconBg: "bg-slate-900",
      iconColor: "text-white",
      accent: "text-indigo-600",
    },
    light: {
      text: "text-white",
      tagline: "text-slate-300",
      iconBg: "bg-white",
      iconColor: "text-slate-900",
      accent: "text-indigo-400",
    },
    brand: {
      text: "text-indigo-700",
      tagline: "text-slate-500",
      iconBg: "bg-indigo-600",
      iconColor: "text-white",
      accent: "text-indigo-600",
    },
  };

  const currentSize = sizes[size] || sizes.md;
  const currentTheme = themes[variant] || themes.dark;

  return (
    <div
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label="Shoply brand"
    >
      {showIcon && (
        <div
          className={`${currentSize.icon} ${currentTheme.iconBg}
          ${currentTheme.iconColor} flex items-center justify-center
          rounded-xl shadow-md`}
        >
          <ShoppingBag size={currentSize.iconSize} strokeWidth={2.2} />
        </div>
      )}

      <div className="flex flex-col">
        <span
          className={`${currentSize.title} ${currentTheme.text}
          font-extrabold tracking-tight leading-none`}
        >
          Shop<span className={currentTheme.accent}>ly</span>
        </span>

        {showTagline && (
          <span
            className={`${currentSize.tagline} ${currentTheme.tagline}
            mt-1 font-medium tracking-[0.15em] uppercase`}
          >
            Shop smart. Live better.
          </span>
        )}
      </div>
    </div>
  );
};

export default ShoplyLogo;
