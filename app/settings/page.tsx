import React from "react";
import SettingsClient from "../components/settings/settings-client";
export const instant = false;

export default async function Settings() {
  return (
    <div className="h-screen flex flex-col items-center">
      <SettingsClient />
    </div>
  );
}
