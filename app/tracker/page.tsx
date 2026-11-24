import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import TrackerClientPage from "../components/tracker-components/tracker-client";
export const instant = false;

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  return (
    <div className="flex flex-col items-center">
      <TrackerClientPage />
    </div>
  );
}
