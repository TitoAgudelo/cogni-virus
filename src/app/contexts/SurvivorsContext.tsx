"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Survivor, Gender, Infected, SurvivorsInventories } from "../dataTypes";

interface SurvivorsContextType {
  survivors: Survivor[];
  addSurvivor: (survivor: Survivor) => void;
  updateRequestItem: (inventory: SurvivorsInventories) => void;
  numberOfHealthySurvivors: number;
  numberOfInfectedSurvivors: number;
  averageResourceAllocation: {
    water: number;
    food: number;
    medication: number;
    cVirusVaccine: number;
  };
  survivorsInventories: SurvivorsInventories[];
}

const survivorList = [
  {
    id: 1,
    fullName: "Ellie Williams",
    age: "32",
    gender: Gender.Male,
    lastLocation: "Latitud: , Longitud: ",
    infected: Infected.Infected,
    resources: {
      water: 1,
      food: 0,
      medication: 1,
      cVirusVaccine: 1,
    },
    createdDate: new Date().toDateString(),
  },
  {
    id: 2,
    fullName: "Joel Miller",
    age: "32",
    gender: Gender.Male,
    lastLocation: "Latitud: , Longitud: ",
    infected: Infected.Healthy,
    resources: {
      water: 1,
      food: 2,
      medication: 1,
      cVirusVaccine: 1,
    },
    createdDate: new Date().toDateString(),
  },
  {
    id: 3,
    fullName: "Tommy Miller",
    age: "32",
    gender: Gender.Male,
    lastLocation: "Latitud: , Longitud: ",
    infected: Infected.Healthy,
    resources: {
      water: 1,
      food: 1,
      medication: 1,
      cVirusVaccine: 1,
    },
    createdDate: new Date().toDateString(),
  },
  {
    id: 4,
    fullName: "Abby Anderson",
    age: "32",
    gender: Gender.Male,
    lastLocation: "Latitud: , Longitud: ",
    infected: Infected.Healthy,
    resources: {
      water: 1,
      food: 2,
      medication: 1,
      cVirusVaccine: 1,
    },
    createdDate: new Date().toDateString(),
  },
  {
    id: 5,
    fullName: "Lev Cheng",
    age: "32",
    gender: Gender.Male,
    lastLocation: "Latitud: , Longitud: ",
    infected: Infected.Healthy,
    resources: {
      water: 1,
      food: 3,
      medication: 2,
      cVirusVaccine: 4,
    },
    createdDate: new Date().toDateString(),
  },
];

const SurvivorsContext = createContext<SurvivorsContextType>({
  survivors: [],
  addSurvivor: () => {},
  updateRequestItem: () => {},
  numberOfHealthySurvivors: 0,
  numberOfInfectedSurvivors: 0,
  averageResourceAllocation: {
    water: 0,
    food: 0,
    medication: 0,
    cVirusVaccine: 0,
  },
  survivorsInventories: [],
});

export const useSurvivors = () => useContext(SurvivorsContext);

export const SurvivorsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [survivors, setSurvivors] = useState<Survivor[]>(survivorList);
  const [survivorsInventories, setSurvivorsInventories] = useState<
    SurvivorsInventories[] | []
  >([]);

  useEffect(() => {
    updateSurvivorsInventories(survivorList);
  }, []);

  const addSurvivor = (survivor: Survivor) => {
    setSurvivors([...survivors, survivor]);
    updateSurvivorsInventories([...survivors, survivor]);
  };

  const updateSurvivorsInventories = (updatedSurvivors: Survivor[]) => {
    const updatedInventories = updatedSurvivors.map((survivor) => ({
      id: survivor.id,
      fullName: survivor.fullName,
      inventory: Object.entries(survivor.resources).map(([item, quantity]) => ({
        item,
        quantity,
      })),
    }));
    setSurvivorsInventories(updatedInventories);
  };

  const updateRequestItem = (inventory: SurvivorsInventories) => {
    const updatedInventories = survivorsInventories.map((item) =>
      item.id === inventory.id ? inventory : item
    );

    setSurvivorsInventories(updatedInventories);
  };

  const numberOfHealthySurvivors = survivors.filter(
    (survivor) => survivor.infected === "healthy"
  ).length;
  const numberOfInfectedSurvivors = survivors.filter(
    (survivor) => survivor.infected === "infected"
  ).length;

  const sumResources = survivors.reduce((acc, survivor) => {
    Object.entries(survivor.resources).forEach(([item, quantity]) => {
      acc[item] = (acc[item] || 0) + quantity;
    });
    return acc;
  }, {} as { [key: string]: number });

  const averageResourceAllocation = {
    water: sumResources.water / survivors.length,
    food: sumResources.food / survivors.length,
    medication: sumResources.medication / survivors.length,
    cVirusVaccine: sumResources.cVirusVaccine / survivors.length,
  };

  return (
    <SurvivorsContext.Provider
      value={{
        survivors,
        addSurvivor,
        updateRequestItem,
        numberOfHealthySurvivors,
        numberOfInfectedSurvivors,
        averageResourceAllocation,
        survivorsInventories,
      }}
    >
      {children}
    </SurvivorsContext.Provider>
  );
};
