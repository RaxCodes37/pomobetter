"use client";

interface Props {
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsClient({ setIsSettingsOpen }: Props) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50 ">
      <div className=" p-4 rounded-md w-90">
        <section className="flex justify-between text-2xl">
          <h2 className="font-bold">Settings</h2>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="text-3xl duration-400 hover:text-red-400"
          >
            &times;
          </button>
        </section>
        <section className="mt-5 w-full bg-[#2B2A2A] border border-[#393838] rounded-md p-3">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label>Work Duration (minutes)</label>
              <input
                type="number"
                className="w-17 p-2 rounded-md bg-[#3b3a3a] border border-[#393838]"
              />
            </div>
            <div className="flex justify-between items-center">
              <label>Break Duration (minutes)</label>
              <input
                type="number"
                className="w-17 p-2 rounded-md bg-[#3b3a3a] border border-[#393838]"
              />
            </div>
            <div className="flex justify-between items-center">
              <label>Long Break Duration (minutes)</label>
              <input
                type="number"
                className="w-17 p-2 rounded-md bg-[#3b3a3a] border border-[#393838]"
              />
            </div>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="bg-[#3b3a3a] duration-400 hover:bg-[#4a4949] text-white py-2 px-4 rounded-md"
            >
              Save Settings
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
