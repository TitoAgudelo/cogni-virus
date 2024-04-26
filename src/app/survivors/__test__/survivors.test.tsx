import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Survivors from "./../page";
import { useSurvivors } from "./../../contexts/SurvivorsContext";
import { Infected, Gender } from "../../dataTypes";

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
    ],
    addSurvivor: jest.fn(),
  })),
}));

describe("Survivors component", () => {
  test("renders table with survivor information", () => {
    render(<Survivors />);

    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders.length).toBe(4);
    expect(tableHeaders[0].textContent).toBe("Name");
    expect(tableHeaders[1].textContent).toBe("Status");
    expect(tableHeaders[2].textContent).toBe("Date Added");
    expect(tableHeaders[3].textContent).toBe("");

    const survivorRows = screen.getAllByRole("row");
    expect(survivorRows.length).toBe(2);

    const johnRow = screen.getByText("John Michael");
    expect(johnRow).toBeInTheDocument();
    const healthyStatus = screen.getByText(Infected.Healthy);
    expect(healthyStatus).toBeInTheDocument();
  });

  test('opens modal on clicking "Add Survivor" button', () => {
    render(<Survivors />);

    const addSurvivorButton = screen.getByRole("button", {
      name: /Add Survivor/i,
    });
    expect(addSurvivorButton).toBeInTheDocument();

    userEvent.click(addSurvivorButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
