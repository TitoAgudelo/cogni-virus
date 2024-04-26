// Import necessary components and functions
import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./../Card";

const mockCardProps = {
  name: "Number of Healthy Survivors",
  average: "5",
  days: "Last 30 days",
  value: "10",
  variation: "positive",
};

describe("Card component", () => {
  // Test for rendering basic card structure
  test("renders basic card structure with name, average, days, and download section", () => {
    render(<Card {...mockCardProps} />);

    // Check for card name
    const cardName = screen.getByText(mockCardProps.name);
    expect(cardName).toBeInTheDocument();

    // Check for average value
    const averageValue = screen.getByText(mockCardProps.average);
    expect(averageValue).toBeInTheDocument();

    // Check for days text
    const daysText = screen.getByText(mockCardProps.days);
    expect(daysText).toBeInTheDocument();

    // Check for "Download Report" section
    const downloadSection = screen.getByText("Download Report");
    expect(downloadSection).toBeInTheDocument();
  });

  // Test for displaying variation indicator
  test("shows variation indicator for positive and negative values", () => {
    // Positive variation
    render(<Card {...mockCardProps} />);
    const variationBadge = screen.getByText("+10%");
    expect(variationBadge).toBeInTheDocument();
    expect(variationBadge.parentElement).toHaveClass("bg-green-200");

    // Negative variation (change mock data)
    const negativeProps = {
      ...mockCardProps,
      value: "-5",
      variation: "negative",
    };
    render(<Card {...negativeProps} />);
    const negativeBadge = screen.getByText("-5%");
    expect(negativeBadge).toBeInTheDocument();
    expect(negativeBadge.parentElement).toHaveClass("bg-rose-200");
  });

  // Test for conditional rendering of variation indicator
  test("hides variation indicator when value is empty", () => {
    const emptyProps = { ...mockCardProps, value: "" };
    render(<Card {...emptyProps} />);

    const averageValue = screen.getByText(emptyProps.average);
    expect(averageValue.nextElementSibling).not.toBeInTheDocument(); // No variation element
  });
});
