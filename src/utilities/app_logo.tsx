"use client";
interface AppLogoProps {
  size?: number;
  className?: string;
}

export const AppLogo = ({ size = 32, className = "" }: AppLogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`transition-all duration-200 hover:scale-110 ${className}`}
  >
    {/* Background circle for better visual foundation */}
    {/* Main layers with enhanced styling */}
    <g
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Top layer */}
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        fill="currentColor"
        fillOpacity="0.8"
      />

      {/* Middle layer */}
      <path d="M2 12l10 5 10-5" fill="currentColor" fillOpacity="0.6" />

      {/* Bottom layer */}
      <path d="M2 17l10 5 10-5" fill="currentColor" fillOpacity="0.4" />
    </g>

    {/* Central highlight dot */}
    <circle cx="12" cy="7" r="1.5" fill="currentColor" opacity="0.9" />
  </svg>
);

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export const AnimatedLogo = ({
  size = 64,
  className = "",
}: AnimatedLogoProps) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className="relative animate-pulse"
        style={{ animationDuration: "4s" }}
      >
        <AppLogo size={size} className="text-slate-200 drop-shadow-lg" />

        {/* Floating ball 1 - top right with bounce */}
        <div
          className="absolute w-2 h-2 bg-blue-400/60 rounded-full animate-bounce shadow-lg"
          style={{
            top: "10%",
            right: "15%",
            animationDuration: "3s",
            animationDelay: "0s",
          }}
        />

        {/* Floating ball 2 - bottom left with pulse */}
        <div
          className="absolute w-1.5 h-1.5 bg-emerald-400/50 rounded-full animate-pulse shadow-md"
          style={{
            bottom: "20%",
            left: "10%",
            animationDuration: "2.5s",
            animationDelay: "1s",
          }}
        />

        {/* Floating ball 3 - middle right with ping */}
        <div
          className="absolute w-1 h-1 bg-purple-300/70 rounded-full animate-ping"
          style={{
            top: "50%",
            right: "5%",
            animationDuration: "3.5s",
            animationDelay: "2s",
          }}
        />

        {/* Floating ball 4 - top left */}
        <div
          className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce"
          style={{
            top: "25%",
            left: "8%",
            animationDuration: "4.5s",
            animationDelay: "0.5s",
          }}
        />

        {/* Floating ball 5 - bottom right */}
        <div
          className="absolute w-1 h-1 bg-rose-300/60 rounded-full animate-pulse"
          style={{
            bottom: "15%",
            right: "20%",
            animationDuration: "3.2s",
            animationDelay: "1.8s",
          }}
        />
      </div>
    </div>
  );
};
// Usage examples with different sizes:
export const AppLogoSmall = () => <AppLogo size={20} />;
export const AppLogoMedium = () => <AppLogo size={32} />;
export const AppLogoLarge = () => <AppLogo size={48} />;
export const AppLogoXL = () => <AppLogo size={64} />;
