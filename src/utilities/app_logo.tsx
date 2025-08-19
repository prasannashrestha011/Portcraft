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
    className={`transition-all duration-200 hover:scale-105 ${className}`}
  >
    {/* Background circle for better visual foundation */}
    <circle
      cx="12"
      cy="12"
      r="11"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.2"
    />

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

// Usage examples with different sizes:
export const AppLogoSmall = () => <AppLogo size={20} />;
export const AppLogoMedium = () => <AppLogo size={32} />;
export const AppLogoLarge = () => <AppLogo size={48} />;
export const AppLogoXL = () => <AppLogo size={64} />;
