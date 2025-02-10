"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Dog from "@/app/types";

interface MatchModalProps {
  dogMatch: Dog | undefined;
  onClose: () => void;
  isOpen: boolean;
}

const MatchModal = ({ dogMatch, onClose, isOpen }: MatchModalProps) => {
  if (!dogMatch && !isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-black rounded-xl p-6 shadow-lg w-96 text-center"
      >
        <h2 className="text-2xl font-bold">You Got a Match! 🎉</h2>
        <Image
          src={dogMatch!.img}
          alt={dogMatch!.name}
          width={500}
          height={500}
          className="w-full rounded-lg my-4"
        />
        <p className="text-lg">
          {dogMatch!.name} - {dogMatch!.breed}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default MatchModal;
