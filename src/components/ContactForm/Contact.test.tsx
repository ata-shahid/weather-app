import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Contact from "./Contact";

// Mocking the useRouter hook from next/router
const mockBack = vi.fn();

vi.mock("next/router", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe("Contact", () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it("renders contact form", () => {
    render(<Contact />);

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByLabelText("Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Email *")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone *")).toBeInTheDocument();
    expect(screen.getByLabelText("Feedback *")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("validates form and displays error messages", () => {
    render(<Contact />);

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required")).toBeInTheDocument();
    expect(screen.getByText("Feedback is required")).toBeInTheDocument();
  });

  // test the name format

  it("validates the name", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "Shahid123" },
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Name can only contain alphabetic characters")).toBeInTheDocument();
  });
  
  //test the email format


  it("validates phone number format", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Phone *"), {
      target: { value: "invalid-phone" },
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Phone number is invalid")).toBeInTheDocument();
  });

  it("validates character count for feedback", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Feedback *"), {
      target: { value: "a".repeat(301) },
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(
      screen.getByText("Feedback must be 300 characters or less")
    ).toBeInTheDocument();
  });

  it("submits form when valid and displays submitted information", () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone *"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Feedback *"), {
      target: { value: "Great service!" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Submitted Information")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("Great service!")).toBeInTheDocument();
  });

  it("resets form fields when reset button is clicked", () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone *"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Feedback *"), {
      target: { value: "Great service!" },
    });

    fireEvent.click(screen.getByText("Reset"));

    expect((screen.getByLabelText("Name *") as HTMLInputElement).value).toBe(
      ""
    );
    expect((screen.getByLabelText("Email *") as HTMLInputElement).value).toBe(
      ""
    );
    expect((screen.getByLabelText("Phone *") as HTMLInputElement).value).toBe(
      ""
    );
    expect(
      (screen.getByLabelText("Feedback *") as HTMLTextAreaElement).value
    ).toBe("");
  });

  it("goes back to the previous page when back button is clicked", () => {
    render(<Contact />);

    fireEvent.click(screen.getByText("Back"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("goes back to the form when edit button is clicked", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Name *"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone *"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Feedback *"), {
      target: { value: "Great service!" },
    });
    fireEvent.click(screen.getByText("Submit"));
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByLabelText("Name *")).toBeInTheDocument();
    expect((screen.getByLabelText("Name *") as HTMLInputElement).value).toBe(
      "John Doe"
    );
    expect(screen.getByLabelText("Email *")).toBeInTheDocument();
    expect((screen.getByLabelText("Email *") as HTMLInputElement).value).toBe(
      "john@example.com"
    );
    expect(screen.getByLabelText("Phone *")).toBeInTheDocument();
    expect((screen.getByLabelText("Phone *") as HTMLInputElement).value).toBe(
      "1234567890"
    );
    expect(screen.getByLabelText("Feedback *")).toBeInTheDocument();
    expect(
      (screen.getByLabelText("Feedback *") as HTMLTextAreaElement).value
    ).toBe("Great service!");
  });
});
