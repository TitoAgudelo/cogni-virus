// Import necessary components and functions
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./../page";
import { useSurvivors } from "./../contexts/SurvivorsContext";

// Mock the useSurvivors hook
jest.mock("./../contexts/SurvivorsContext", () => ({
  useSurvivors: jest.fn(() => ({
    numberOfHealthySurvivors: 5,
    numberOfInfectedSurvivors: 12,
    averageResourceAllocation: "Food",
  })),
}));

describe("Home component", () => {
  // Test for rendering basic structure
  test("renders basic structure with reports and cards", () => {
    render(<Home />);

    // Check "Reports" heading
    const reportsHeading = screen.getByText("Reports");
    expect(reportsHeading).toBeInTheDocument();

    // Check growth message
    const growthMessage = screen.getByText(/Your camp has grown/i);
    expect(growthMessage).toBeInTheDocument();

    // Check for CircleAlert component
    const circleAlert = screen.getByRole("img", { name: /alert/i });
    expect(circleAlert).toBeInTheDocument();

    // Check for Cards
    const cards = screen.getAllByRole("heading", { level: 2 });
    expect(cards.length).toBe(3);
  });

  // Test for displaying data from useSurvivors hook
  test("displays data from useSurvivors hook in cards", () => {
    render(<Home />);

    // Check "Number of Healthy Survivors" card data
    const healthyCard = screen.getByText("Number of Healthy Survivors");
    expect(healthyCard).toBeInTheDocument();
    const healthyValue = screen.getByText("5");
    expect(healthyValue).toBeInTheDocument();

    // Check "Number of Infected Survivors" card data
    const infectedCard = screen.getByText("Number of Infected Survivors");
    expect(infectedCard).toBeInTheDocument();
    const infectedValue = screen.getByText("12");
    expect(infectedValue).toBeInTheDocument();

    // Check "Average Resource Allocation" card data
    const resourceCard = screen.getByText("Average Resource Allocation");
    expect(resourceCard).toBeInTheDocument();
    const resourceAverage = screen.getByText("Food");
    expect(resourceAverage).toBeInTheDocument();
  });
});
