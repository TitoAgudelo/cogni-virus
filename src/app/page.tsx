"use client";

import { CircleAlert } from "lucide-react";
import Card from "./components/Card";
import { useSurvivors } from "./contexts/SurvivorsContext";

export default function Home() {
  const {
    numberOfHealthySurvivors,
    numberOfInfectedSurvivors,
    averageResourceAllocation,
  } = useSurvivors();

  return (
    <section className="container mx-auto">
      <div className="flex flex-col">
        <p className="text-xl text-indigo-950">Reports</p>
        <div className="flex items-center">
          <p className="text-sm text-gray-500 tracking-tighter">
            Your camp has grown <span className="text-green-400">+5%</span> this
            month
          </p>
          <CircleAlert className="ml-1" color="#5F5F61" size={16} />
        </div>
      </div>
      <div className="grid grid-cols-3 mt-6 gap-8">
        <Card
          name="Number of Healthy Survivors"
          average={numberOfHealthySurvivors.toString()}
          days="Last 30 days"
          value="5"
          variation="positive"
        />
        <Card
          name="Number of Infected Survivors"
          average={numberOfInfectedSurvivors.toString()}
          days="Last 30 days"
          value="12"
          variation="negative"
        />
        <Card
          name="Average Resource Allocation"
          average="Food"
          days="10 days worth"
          value=""
          variation=""
        />
      </div>
    </section>
  );
}
