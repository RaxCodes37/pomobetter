"use client";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";

export default function HomeNavBar() {
  return (
    <nav className="fixed left-[95%] top-[1%] border border-[#3b3a3a] bg-[#2b2a2a] p-2 rounded-full text-2xl">
      <Link href="/settings">
        <IoSettingsOutline />
      </Link>
    </nav>
  );
}
