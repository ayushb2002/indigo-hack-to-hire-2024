import React from "react";
import CardSettings from "components/CardSettings.js";

export default function Settings() {
  return (
    <>
      <div className="flex justify-center items-center content-center h-full">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}
