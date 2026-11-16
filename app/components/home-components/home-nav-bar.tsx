"use client";
import Link from "next/link";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import SettingsClient from "../settings/settings-client";

export default function HomeNavBar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav>
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed left-[95%] top-[1%] border border-[#3b3a3a] bg-[#2b2a2a] p-2 rounded-full text-2xl"
      >
        <IoSettingsOutline />
      </button>
      {isSettingsOpen && (
        <SettingsClient setIsSettingsOpen={setIsSettingsOpen} />
      )}
    </nav>
  );
}
