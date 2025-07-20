"use client";

import { useRef } from "react";

type OtpInputGroupProps = {
  length?: number;
};

export const OtpInputGroup = ({ length = 4 }: OtpInputGroupProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      if (inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    }

    if (value.length > 1) {
      const values = value.split("").slice(0, length);
      values.forEach((val, idx) => {
        if (inputsRef.current[index + idx]) {
          inputsRef.current[index + idx]!.value = val;
        }
      });

      if (inputsRef.current[index + values.length - 1]) {
        inputsRef.current[index + values.length - 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const currentInput = inputsRef.current[index];

      if (currentInput?.value === "") {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        currentInput!.value = "";
      }
    }
  };

  return (
    <div className="flex gap-5 items-center justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          placeholder="-"
          className="w-12 h-12 text-center border border-zinc-800 focus:outline-none focus:ring-green-800 text-xl text-zinc-950 rounded-xl placeholder:text-zinc-900 placeholder:text-2xl placeholder:text-center"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};
