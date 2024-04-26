import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./../Modal";

describe("Modal component", () => {
  const children = <p>This is some content displayed inside the modal.</p>;
  test("renders basic structure when modal is open", () => {
    const mockTitle = "This is a modal";
    render(
      <Modal isOpen={true} title={mockTitle} onClose={() => {}}>
        {children}
      </Modal>
    );

    const modalContent = screen.getByRole("dialog");
    expect(modalContent).toBeInTheDocument();

    const title = screen.getByText(mockTitle);
    expect(title).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  test("does not render when modal is closed", () => {
    render(
      <Modal isOpen={false} title="Test" onClose={() => {}}>
        {children}
      </Modal>
    );
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  test("calls onClose function on close button click", () => {
    const mockClose = jest.fn();
    render(
      <Modal isOpen={true} title="Test" onClose={mockClose}>
        {children}
      </Modal>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

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
