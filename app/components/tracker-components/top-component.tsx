"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function TopComponent() {
  const router = useRouter();

  return (
    <div
      id="top"
      className="flex justify-between text-2xl font-bold bg-[#212020] rounded-md border border-[#393838] mt-4"
    >
      <h2 className="px-3 py-2">Tracking</h2>
      <button
        onClick={router.back}
        className="duration-400 hover:bg-[#3a3a3a] rounded px-3 py-2"
      >
        <FaArrowLeft />
      </button>
    </div>
  );
}
