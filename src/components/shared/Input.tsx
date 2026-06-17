"use client"; // Required for client-side state handling and interactivity

import React, { useId } from "react";

// Extend native HTML input attributes to accept placeholders, disabled state, etc.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", type = "text", disabled = false, ...props }, ref) => {
    const generatedId = useId();
    const id = props.id || generatedId;

    return (
      <div className="flex flex-col gap-1.5 w-full rounded-full">
        {label && (
            <label htmlFor={id} className={`text-sm font-medium transition-colors ${
              disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
            }`}>
            {label}
            </label>
        )}
        
        <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled}
            className={`w-20 w-full px-3 py-0.5 px-2 border rounded-full transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"} 
            ${className}`}
            aria-invalid={error ? "true" : "false"}
            {...props}
        />

        {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";