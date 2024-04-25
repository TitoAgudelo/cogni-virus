export enum Gender {
  Female = "female",
  Male = "male",
}

export enum Infected {
  Infected = "infected",
  Healthy = "healthy",
}

export interface Survivor {
  id: number;
  fullName: string;
  age: string;
  gender: Gender;
  lastLocation: string;
  infected: Infected;
  resources: {
    water: number;
    food: number;
    medication: number;
    cVirusVaccine: number;
  };
  createdDate: string;
}

type InventoryType = {
  item: string;
  quantity: number;
};
export interface SurvivorsInventories {
  id: number;
  fullName: string;
  inventory: InventoryType[];
}
