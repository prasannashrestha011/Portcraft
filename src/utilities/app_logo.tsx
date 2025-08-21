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
    className={`transition-all 
duration-200 hover:scale-110 ${className}`}
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
        className="absolute inset-0 rounded-full opacity-40 animate-glow-breathe-1"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 rounded-full opacity-50 animate-glow-breathe-2"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.7) 0%, rgba(147, 51, 234, 0.3) 30%, transparent 60%)",
        }}
      />

      <div
        className="absolute inset-0 rounded-full opacity-60 animate-glow-breathe-3"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, rgba(34, 197, 94, 0.4) 20%, transparent 50%)",
        }}
      />

      <AppLogo size={size} className="text-slate-200 relative z-10" />

      <style jsx>{`
        @keyframes glow-breathe-1 {
          0%,
          100% {
            transform: scale(1.5);
            opacity: 0.2;
          }
          50% {
            transform: scale(2.5);
            opacity: 0.4;
          }
        }

        @keyframes glow-breathe-2 {
          0%,
          100% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          50% {
            transform: scale(2);
            opacity: 0.5;
          }
        }

        @keyframes glow-breathe-3 {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.6);
            opacity: 0.6;
          }
        }

        .animate-glow-breathe-1 {
          animation: glow-breathe-1 3s ease-in-out infinite;
        }

        .animate-glow-breathe-2 {
          animation: glow-breathe-2 2.5s ease-in-out infinite 0.5s;
        }

        .animate-glow-breathe-3 {
          animation: glow-breathe-3 2s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  );
};
// Usage examples with different sizes:
export const AppLogoSmall = () => <AppLogo size={20} />;
export const AppLogoMedium = () => <AppLogo size={32} />;
export const AppLogoLarge = () => <AppLogo size={48} />;
export const AppLogoXL = () => <AppLogo size={64} />;
