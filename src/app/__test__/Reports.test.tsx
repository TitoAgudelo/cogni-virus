import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./../page";
import { useSurvivors } from "./../contexts/SurvivorsContext";

jest.mock("./../contexts/SurvivorsContext", () => ({
  useSurvivors: jest.fn(() => ({
    numberOfHealthySurvivors: 5,
    numberOfInfectedSurvivors: 12,
    averageResourceAllocation: "Food",
  })),
}));

describe("Home component", () => {
  test("renders basic structure with reports and cards", () => {
    render(<Home />);

    const reportsHeading = screen.getByText("Reports");
    expect(reportsHeading).toBeInTheDocument();

    const growthMessage = screen.getByText(/Your camp has grown/i);
    expect(growthMessage).toBeInTheDocument();

    const circleAlert = screen.getByRole("img", { name: /alert/i });
    expect(circleAlert).toBeInTheDocument();

    const cards = screen.getAllByRole("heading", { level: 2 });
    expect(cards.length).toBe(3);
  });

  test("displays data from useSurvivors hook in cards", () => {
    render(<Home />);

    const healthyCard = screen.getByText("Number of Healthy Survivors");
    expect(healthyCard).toBeInTheDocument();
    const healthyValue = screen.getByText("5");
    expect(healthyValue).toBeInTheDocument();

    const infectedCard = screen.getByText("Number of Infected Survivors");
    expect(infectedCard).toBeInTheDocument();
    const infectedValue = screen.getByText("12");
    expect(infectedValue).toBeInTheDocument();

    const resourceCard = screen.getByText("Average Resource Allocation");
    expect(resourceCard).toBeInTheDocument();
    const resourceAverage = screen.getByText("Food");
    expect(resourceAverage).toBeInTheDocument();
  });
});
