"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const RedirectingInterface = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Show success message after a brief delay
    const timer = setTimeout(() => {
      setShowSuccess(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6 text-center">
        {/* Success Icon */}
        <div className="relative">
          <div
            className={`transition-all duration-500 ${
              showSuccess ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h1
            className={`text-2xl font-semibold text-foreground transition-all duration-500 ${
              showSuccess
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Login Successful!
          </h1>
          <p
            className={`text-muted-foreground transition-all duration-500 delay-200 ${
              showSuccess
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {"Welcome back! You're being redirected..."}
          </p>
        </div>

        {/* Spinner */}
        <div
          className={`flex items-center space-x-2 transition-all duration-500 delay-300 ${
            showSuccess
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Redirecting...</span>
        </div>
      </div>
    </div>
  );
};

export default RedirectingInterface;
