// Import necessary components and functions
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Inventory from "./../page";
import { useSurvivors } from "./../../contexts/SurvivorsContext";

// Mock the useSurvivors hook
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
          // ... other items
        ],
      },
      // ... other survivors
    ],
    updateRequestItem: jest.fn(),
  })),
}));

// Test suite for Inventory component
describe("Inventory component", () => {
  // Test for rendering table with survivor information
  test("renders table with survivor information", () => {
    render(<Inventory />);

    // Check for table headers
    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders.length).toBe(3);
    expect(tableHeaders[0].textContent).toBe("Name");
    expect(tableHeaders[1].textContent).toBe("Inventories");
    expect(tableHeaders[2].textContent).toBe("Action");

    // Check for survivor rows
    const survivorRows = screen.getAllByRole("row");
    expect(survivorRows.length).toBe(2);

    // Check for specific survivor information
    const ellieRow = screen.getByText("Ellie Williams");
    expect(ellieRow).toBeInTheDocument();
  });

  // Test for opening modal on clicking "Request Item" button
  test('opens modal on clicking "Request Item" button', () => {
    render(<Inventory />);

    // Find the first "Request Item" button
    const requestButton = screen.getByRole("button", { name: /Request Item/i });
    expect(requestButton).toBeInTheDocument();

    // Click the button
    userEvent.click(requestButton);

    // Expect modal to be open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // Test for selecting an item and submitting request
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

    // Open modal for Ellie
    const ellieRequestButton = screen.getByRole("button", {
      name: /Request Item.*Ellie Williams/i,
    });
    userEvent.click(ellieRequestButton);

    // Select "First Aid Kit" from dropdown
    const itemSelect = screen.getByRole("combobox");
    userEvent.select(itemSelect, { value: "First Aid Kit" });

    // Submit request form
    const submitButton = screen.getByRole("button", { name: /Request Item/i });
    userEvent.click(submitButton);

    // Expect updateRequestItem to be called with updated inventory
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
