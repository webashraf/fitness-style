"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const DynamicModal: FC<Props> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-gray-500 hover:!text-red-500 !text-2xl"
            >
              &times;
            </button>

            {title && (
              <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
                {title}
              </h2>
            )}

            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicModal;
