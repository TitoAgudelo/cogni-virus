// Import necessary components and functions
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./../Modal";

describe("Modal component", () => {
  // Test for rendering basic structure when open
  const children = <p>This is some content displayed inside the modal.</p>;
  test("renders basic structure when modal is open", () => {
    const mockTitle = "This is a modal";
    render(
      <Modal isOpen={true} title={mockTitle} onClose={() => {}}>
        {children}
      </Modal>
    );

    // Check for modal overlay
    const overlay = screen.getByRole("presentation");
    expect(overlay).toBeInTheDocument();

    // Check for modal content wrapper
    const modalContent = screen.getByRole("dialog");
    expect(modalContent).toBeInTheDocument();

    // Check for title
    const title = screen.getByText(mockTitle);
    expect(title).toBeInTheDocument();

    // Check for close button
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  // Test for not rendering when modal is closed
  test("does not render when modal is closed", () => {
    render(
      <Modal isOpen={false} title="Test" onClose={() => {}}>
        {children}
      </Modal>
    );
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument(); // No modal found
  });

  // Test for closing the modal on close button click
  test("calls onClose function on close button click", () => {
    const mockClose = jest.fn();
    render(
      <Modal isOpen={true} title="Test" onClose={mockClose}>
        {children}
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  // Test for rendering optional subTitle prop
  test("renders subTitle prop if provided", () => {
    const mockTitle = "Information Modal";
    const mockSubTitle = "Additional details about the modal content.";
    render(
      <Modal
        isOpen={true}
        title={mockTitle}
        subTitle={mockSubTitle}
        onClose={() => {}}
      >
        {children}
      </Modal>
    );

    const subTitle = screen.getByText(mockSubTitle);
    expect(subTitle).toBeInTheDocument();
  });

  // Test for rendering children within the modal content area
  test("renders children within the modal content area", () => {
    const mockTitle = "Custom Modal";
    render(
      <Modal isOpen={true} title={mockTitle} onClose={() => {}}>
        {children}
      </Modal>
    );

    const modalContent = screen.getByText(
      /This is some content displayed inside the modal/i
    );
    expect(modalContent).toBeInTheDocument();
  });
});
