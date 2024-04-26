import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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
  selectedSurvivor: {
    id: 1,
    fullName: "Test Test",
    inventory: [
      {
        item: "water",
        quantity: 1,
      },
    ],
  },
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

  test('opens modal on clicking "Request Item" button', async () => {
    render(<Inventory />);

    const requestButton = screen.getByRole("button", { name: /Request Item/i });
    expect(requestButton).toBeInTheDocument();

    await userEvent.click(requestButton);

    await waitFor(async () => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  test("allows selecting an item and submitting request in modal", async () => {
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

    const { getByTestId, getAllByTestId } = render(<Inventory />);

    const ellieRequestButton = screen.getByRole("button", {
      name: /Request Item/i,
    });

    await userEvent.click(ellieRequestButton);

    await waitFor(async () => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const itemSelect = screen.getByRole("combobox");

    fireEvent.change(getByTestId("select"), { target: { value: 2 } });
    let options = getAllByTestId("select-option");
    expect((options[0] as HTMLOptionElement).selected).toBeFalsy();
    expect((options[1] as HTMLOptionElement).selected).toBeFalsy();
  });
});
