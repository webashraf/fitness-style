import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => (
  <button
    className={`rounded-md bg-green-700 text-white px-4 py-2 hover:bg-green-800 transition ${className}`}
    {...props}
  />
);
