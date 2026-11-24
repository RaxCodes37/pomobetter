"use client";

import MiddleComponent from "./mid-component";
import TopComponent from "./top-component";

export default function TrackerClientPage() {
  return (
    <div className="w-100">
      <TopComponent />
      <MiddleComponent />
    </div>
  );
}
