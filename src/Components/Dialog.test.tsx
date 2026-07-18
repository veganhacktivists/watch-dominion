import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Dialog } from "./Dialog";

const writeText = vi.fn();

beforeEach(() => {
  writeText.mockReset();
  Object.assign(navigator, { clipboard: { writeText } });
  Element.prototype.scrollIntoView = vi.fn();
  window.scrollTo = vi.fn();
});

describe("Dialog", () => {
  it("copies the embed code and confirms", async () => {
    writeText.mockResolvedValue(undefined);
    render(<Dialog open onOpenChange={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    const copiedText = writeText.mock.calls[0][0];
    expect(copiedText).toContain("<iframe");
    expect(copiedText).toContain(
      "https://iframe.mediadelivery.net/embed/135301/89232d42-e290-40fc-917d-5669478ee73b",
    );

    expect(await screen.findByText("Copied!")).toBeTruthy();
  });

  it("does not confirm when copying fails", async () => {
    writeText.mockRejectedValue(new Error("denied"));
    render(<Dialog open onOpenChange={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await Promise.resolve();

    expect(screen.queryByText("Copied!")).toBeNull();
    expect(screen.getByRole("button", { name: "Copy" })).toBeTruthy();
  });

  it("labels the player and the close control", () => {
    writeText.mockResolvedValue(undefined);
    render(<Dialog open onOpenChange={() => {}} />);

    expect(screen.getByRole("button", { name: "Close dialog" })).toBeTruthy();
    expect(screen.getByRole("textbox")).toHaveProperty(
      "value",
      expect.stringContaining('title="Dominion documentary player"'),
    );
  });
});
