import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Inventory from "../page";

describe("Inventory Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Inventory />);
    expect(getByText("List of Survivors Inventories")).toBeInTheDocument();
  });

  it("opens modal when 'Request Item' button is clicked", () => {
    const { getByText, getByLabelText } = render(<Inventory />);
    fireEvent.click(getByText("Request Item"));
    expect(getByLabelText("Status")).toBeInTheDocument();
  });

  it("closes modal when 'Cancel' button is clicked", () => {
    const { getByText, queryByLabelText } = render(<Inventory />);
    fireEvent.click(getByText("Request Item"));
    fireEvent.click(getByText("Cancel"));
    expect(queryByLabelText("Status")).toBeNull();
  });

  // Add more test cases as needed
});
