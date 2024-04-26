import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./../Header";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => (
    <a className="link" href={href}>
      {children}
    </a>
  ),
}));

describe("Header component", () => {
  test("renders logo, title, and navigation links", () => {
    render(<Header />);

    const logo = screen.getByRole("img", { name: /Home/i });
    expect(logo).toBeInTheDocument();

    const title = screen.getByText("Survival Nexus");
    expect(title).toBeInTheDocument();

    const navigationLinks = screen.getAllByRole("link");
    expect(navigationLinks.length).toBe(3);
    expect(navigationLinks[0].textContent).toBe("Report");
    expect(navigationLinks[1].textContent).toBe("Survivors");
    expect(navigationLinks[2].textContent).toBe("Inventory");
  });

  test("styles active link based on pathname prop", () => {
    render(<Header />);
    const reportLink = screen.getByText("Report");
    expect(reportLink.parentElement).toHaveClass("active");

    render(<Header />);
    expect(screen.getByText("Report").parentElement).not.toHaveClass("active");

    render(<Header />);
    const survivorsLink = screen.getByText("Survivors");
    expect(survivorsLink.parentElement).toHaveClass("active");
  });
});
