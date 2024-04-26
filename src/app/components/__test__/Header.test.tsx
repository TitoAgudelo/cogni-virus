// Import necessary components
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./../Header";

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => (
    <a className="link" href={href}>
      {children}
    </a>
  ),
}));

describe("Header component", () => {
  // Test for rendering basic structure
  test("renders logo, title, and navigation links", () => {
    render(<Header />);

    // Check for logo image
    const logo = screen.getByRole("img", { name: /Home/i });
    expect(logo).toBeInTheDocument();

    // Check for header title
    const title = screen.getByText("Survival Nexus");
    expect(title).toBeInTheDocument();

    // Check for navigation links
    const navigationLinks = screen.getAllByRole("link");
    expect(navigationLinks.length).toBe(3);
    expect(navigationLinks[0].textContent).toBe("Report");
    expect(navigationLinks[1].textContent).toBe("Survivors");
    expect(navigationLinks[2].textContent).toBe("Inventory");
  });

  // Test for active link styling based on pathname
  test("styles active link based on pathname prop", () => {
    // Test active "/" link
    render(<Header />);
    const reportLink = screen.getByText("Report");
    expect(reportLink.parentElement).toHaveClass("active");

    // Test inactive "/" link
    render(<Header />);
    expect(screen.getByText("Report").parentElement).not.toHaveClass("active");

    // Test active "/survivors" link
    render(<Header />);
    const survivorsLink = screen.getByText("Survivors");
    expect(survivorsLink.parentElement).toHaveClass("active");
  });
});
