import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export default function MiddleComponent() {
  const dummyTaskInfo = [
    {
      completedTasksAmount: 2,
    },
    {
      completedTasksAmount: 6,
    },
    {
      completedTasksAmount: 8,
    },
    {
      completedTasksAmount: 5,
    },
  ];

  return (
    <div className="bg-[#212020] rounded-md border border-[#393838] mt-4 px-3 py-2">
      <h2 className="text-xl font-bold text-[#7b7b7b]">Completed Tasks</h2>
      <BarChart
        style={{ width: "100%", aspectRatio: 1.70, maxWidth: 600 }}
        responsive
        data={dummyTaskInfo}
        className="mt-2"
      >
        <Bar dataKey="completedTasksAmount" fill="#6d6d6d" stroke="#5e5e5e" />
        <YAxis />
        <XAxis />
        <CartesianGrid stroke="#393838"/>
      </BarChart>
    </div>
  );
}
