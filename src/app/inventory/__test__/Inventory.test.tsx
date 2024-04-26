import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Inventory from "./../page";
import { useSurvivors } from "./../../contexts/SurvivorsContext";

jest.mock("./../../contexts/SurvivorsContext", () => ({
  useSurvivors: jest.fn(() => ({
    survivorsInventories: [
      {
        id: 1,
        fullName: "Ellie Williams",
        inventory: [
          { item: "water", quantity: 1 },
          { item: "food", quantity: 1 },
          { item: "medication", quantity: 2 },
          { item: "cVirusVaccine", quantity: 3 },
        ],
      },
    ],
    updateRequestItem: jest.fn(),
  })),
}));

describe("Inventory component", () => {
  test("renders table with survivor information", () => {
    render(<Inventory />);

    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders.length).toBe(3);
    expect(tableHeaders[0].textContent).toBe("Name");
    expect(tableHeaders[1].textContent).toBe("Inventories");
    expect(tableHeaders[2].textContent).toBe("Action");

    const survivorRows = screen.getAllByRole("row");
    expect(survivorRows.length).toBe(2);

    const ellieRow = screen.getByText("Ellie Williams");
    expect(ellieRow).toBeInTheDocument();
  });

  test('opens modal on clicking "Request Item" button', () => {
    render(<Inventory />);

    const requestButton = screen.getByRole("button", { name: /Request Item/i });
    expect(requestButton).toBeInTheDocument();

    userEvent.click(requestButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("allows selecting an item and submitting request in modal", () => {
    const mockUpdateRequestItem = jest.fn();
    useSurvivors.mockReturnValueOnce({
      survivorsInventories: [
        {
          id: 1,
          fullName: "Ellie Williams",
          inventory: [
            { item: "water", quantity: 1 },
            { item: "food", quantity: 1 },
            { item: "medication", quantity: 2 },
            { item: "cVirusVaccine", quantity: 3 },
          ],
        },
      ],
      updateRequestItem: mockUpdateRequestItem,
    });

    render(<Inventory />);

    const ellieRequestButton = screen.getByRole("button", {
      name: /Request Item.*Ellie Williams/i,
    });
    userEvent.click(ellieRequestButton);

    const itemSelect = screen.getByRole("combobox");
    userEvent.select(itemSelect, { value: "First Aid Kit" });

    const submitButton = screen.getByRole("button", { name: /Request Item/i });
    userEvent.click(submitButton);

    expect(mockUpdateRequestItem).toHaveBeenCalledWith({
      id: 1,
      fullName: "Ellie Williams",
      inventory: [
        { item: "water", quantity: 1 },
        { item: "food", quantity: 1 },
        { item: "medication", quantity: 2 },
        { item: "cVirusVaccine", quantity: 3 },
      ],
    });
  });
});
