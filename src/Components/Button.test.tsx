import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders the primary style by default", () => {
    render(
      <Button as="externalLink" href="https://example.org">
        Go to challenge
      </Button>,
    );

    const button = screen.getByText("Go to challenge");
    expect(button.className).toContain("bg-accent");
    expect(button.className).not.toContain("border-accent");
  });

  it("renders the secondary style when requested", () => {
    render(
      <Button as="externalLink" variant="secondary" href="https://example.org">
        Seaspiracy
      </Button>,
    );

    const button = screen.getByText("Seaspiracy");
    expect(button.className).toContain("border-accent");
    expect(button.className).not.toContain("bg-accent");
  });

  it("does not forward `variant` to the DOM", () => {
    render(
      <Button as="button" variant="secondary">
        Copy
      </Button>,
    );

    expect(screen.getByText("Copy").hasAttribute("variant")).toBe(false);
  });
});
