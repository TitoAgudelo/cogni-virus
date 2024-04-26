// Import necessary components and functions
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Survivors from "./../page";
import { useSurvivors } from "./../../contexts/SurvivorsContext";
import { Infected, Gender } from "../../dataTypes";

// Mock the useSurvivors hook
jest.mock("./../../contexts/SurvivorsContext", () => ({
  useSurvivors: jest.fn(() => ({
    survivors: [
      {
        id: 1,
        fullName: "John Michael",
        infected: Infected.Healthy,
        createdDate: new Date("2023-05-14").toDateString(),
        age: "",
        lastLocation: "",
        gender: Gender.Male,
        resources: {
          water: 0,
          food: 0,
          medication: 0,
          cVirusVaccine: 0,
        },
      },
      // ... other survivors
    ],
    addSurvivor: jest.fn(),
  })),
}));

// Test suite for Survivors component
describe("Survivors component", () => {
  // Test for rendering table with survivor information
  test("renders table with survivor information", () => {
    render(<Survivors />);

    // Check for table headers
    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders.length).toBe(4);
    expect(tableHeaders[0].textContent).toBe("Name");
    expect(tableHeaders[1].textContent).toBe("Status");
    expect(tableHeaders[2].textContent).toBe("Date Added");
    expect(tableHeaders[3].textContent).toBe("");

    // Check for survivor rows
    const survivorRows = screen.getAllByRole("row");
    expect(survivorRows.length).toBe(2); // 2 mock survivors + 1 header row

    // Check for specific survivor information
    const johnRow = screen.getByText("John Michael");
    expect(johnRow).toBeInTheDocument();
    const healthyStatus = screen.getByText(Infected.Healthy);
    expect(healthyStatus).toBeInTheDocument();
  });

  // Test for opening modal on clicking "Add Survivor" button
  test('opens modal on clicking "Add Survivor" button', () => {
    render(<Survivors />);

    // Find the "Add Survivor" button
    const addSurvivorButton = screen.getByRole("button", {
      name: /Add Survivor/i,
    });
    expect(addSurvivorButton).toBeInTheDocument();

    // Click the button
    userEvent.click(addSurvivorButton);

    // Expect modal to be open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
