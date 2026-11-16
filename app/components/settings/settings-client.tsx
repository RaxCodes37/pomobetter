"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function SettingsClient() {
  const router = useRouter();

  return (
    <div className="w-100 max-w-3xl p-4">
      <section className="flex justify-between text-2xl">
        <h2 className="font-bold">Settings</h2>

        <button onClick={router.back}>
          <FaArrowLeft />
        </button>
      </section>
      <section className="mt-5 w-full bg-[#2B2A2A] border border-[#393838] rounded-md py-3">
        
      </section>
    </div>
  );
}
