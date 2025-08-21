import { Inter } from "next/font/google";
import { FadeLoader } from "react-spinners";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-48 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};
export function FullPageLoadingSpinner() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
const customFont = Inter({
  subsets: ["latin"],
});
export function LoadingSpinnerTransparent({ text }: { text?: string }) {
  return (
    <div className="z-30 fixed inset-0 bg-black/40 flex items-center justify-center ">
      <FadeLoader color="#ffffff" />
      <p className={customFont.className}>{text}</p>
    </div>
  );
}
export function MiniSpinner() {
  return (
    <div className="flex items-center justify-center ">
      <FadeLoader
        color="#ffffff"
        height={10}
        width={1}
        radius={0.5}
        margin={0.5}
        style={{ display: "inline-block", transform: "scale(0.5)" }} // scale down entire loader
      />
    </div>
  );
}
export const LogoSpinner = ({
  size = 48,
  className = "",
  text = "",
}: {
  size: number;
  className?: string;
  text?: string;
}) => {
  return (
    <div className="z-30 fixed inset-0 bg-black/40 flex items-center justify-center gap-3 ">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
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
        {/* Main layers with staggered appear/disappear animations */}
        <g
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Bottom layer - appears first */}
          <path
            d="M2 17l10 5 10-5"
            fill="currentColor"
            fillOpacity="0.4"
            style={{
              animation: "layerAppear 2s ease-in-out infinite",
            }}
          />
          {/* Middle layer - appears second */}
          <path
            d="M2 12l10 5 10-5"
            fill="currentColor"
            fillOpacity="0.6"
            style={{
              animation: "layerAppear 2s ease-in-out infinite 0.3s",
            }}
          />
          {/* Top layer - appears last */}
          <path
            d="M12 2L2 7l10 5 10-5-10-5z"
            fill="currentColor"
            fillOpacity="0.8"
            style={{
              animation: "layerAppear 2s ease-in-out infinite 0.6s",
            }}
          />
        </g>
        {/* Central highlight dot with pulsing */}
        <circle
          cx="12"
          cy="7"
          r="1.5"
          fill="currentColor"
          opacity="0.9"
          style={{
            animation: "dotPulse 2s ease-in-out infinite 0.9s",
          }}
        />
      </svg>
      {text && (
        <p className={`text-white text-lg mt-4 ${customFont.className}`}>
          {text}
        </p>
      )}
      <style jsx>{`
        @keyframes layerAppear {
          0% {
            opacity: 0;
            transform: translateY(3px) scale(0.8);
          }
          30% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          70% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-3px) scale(0.8);
          }
        }

        @keyframes dotPulse {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};
export default LoadingSpinner;
