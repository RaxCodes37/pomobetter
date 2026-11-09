import { getSession } from "@/lib/auth";
import HomeClient from "../components/home-components/home-client";
import { redirect } from "next/navigation";
export const instant = false;

export default async function Home() {
  const session = await getSession();

  if (!session) redirect("/sign-in");

  return (
    <div className="flex flex-col items-center h-screen">
      <HomeClient />
    </div>
  );
}
