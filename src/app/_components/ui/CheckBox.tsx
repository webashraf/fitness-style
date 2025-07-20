// components/ui/checkbox.tsx
import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={`w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${className}`}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";
