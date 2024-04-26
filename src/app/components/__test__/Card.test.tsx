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
  test("renders basic card structure with name, average, days, and download section", () => {
    render(<Card {...mockCardProps} />);

    const cardName = screen.getByText(mockCardProps.name);
    expect(cardName).toBeInTheDocument();

    const averageValue = screen.getByText(mockCardProps.average);
    expect(averageValue).toBeInTheDocument();

    const daysText = screen.getByText(mockCardProps.days);
    expect(daysText).toBeInTheDocument();

    const downloadSection = screen.getByText("Download Report");
    expect(downloadSection).toBeInTheDocument();
  });

  test("shows variation indicator for positive and negative values", () => {
    render(<Card {...mockCardProps} />);
    const variationBadge = screen.getByText("+10%");
    expect(variationBadge).toBeInTheDocument();
    expect(variationBadge.parentElement).toHaveClass("bg-green-200");

    const negativeProps = {
      ...mockCardProps,
      value: "5",
      variation: "negative",
    };
    render(<Card {...negativeProps} />);
    const negativeBadge = screen.getByText("-5%");
    expect(negativeBadge).toBeInTheDocument();
    expect(negativeBadge.parentElement).toHaveClass("bg-rose-200");
  });

  test("hides variation indicator when value is empty", () => {
    const emptyProps = { ...mockCardProps, value: "" };
    render(<Card {...emptyProps} />);

    const averageValue = screen.getByText(emptyProps.average);
    expect(averageValue.nextElementSibling).not.toBeInTheDocument();
  });
});
