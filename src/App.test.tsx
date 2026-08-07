import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("motion", () => ({ animate: vi.fn(() => ({ stop: vi.fn() })) }));

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});

const statsResponse = (body: unknown, ok = true) =>
  ({ ok, json: () => Promise.resolve(body) }) as Response;

describe("visitor stats", () => {
  it("renders the formatted count", async () => {
    fetchMock.mockResolvedValue(statsResponse({ visitors: 12345 }));
    render(<App />);

    expect(await screen.findByText("12,345")).toBeTruthy();
  });

  it("ignores a non-numeric count", async () => {
    fetchMock.mockResolvedValue(statsResponse({ visitors: "evil" }));
    render(<App />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(screen.getByText("...")).toBeTruthy();
  });

  it("survives a failed fetch", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    render(<App />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(screen.getByText("...")).toBeTruthy();
  });
});

describe("page metadata", () => {
  beforeEach(() => {
    fetchMock.mockResolvedValue(statsResponse({ visitors: 1 }));
  });

  it("names the film in the heading", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Dominion",
    );
  });

  it("marks the document language", () => {
    render(<App />);

    expect(document.documentElement.lang).toBe("en");
  });
});

describe("share", () => {
  const clickShare = () =>
    fireEvent.click(screen.getByText("Tap here to share!"));

  beforeEach(() => {
    fetchMock.mockImplementation((input) =>
      String(input).includes("/img/")
        ? Promise.resolve({
            ok: true,
            blob: () =>
              Promise.resolve(new Blob(["x"], { type: "image/jpeg" })),
          } as Response)
        : Promise.resolve(statsResponse({ visitors: 1 })),
    );
  });

  it("shares the image natively", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { canShare: () => true, share });
    render(<App />);

    clickShare();

    await waitFor(() => expect(share).toHaveBeenCalledTimes(1));
    const { files, url } = share.mock.calls[0][0];
    expect(url).toBe("https://watchdominion.org");
    expect(files[0].name).toBe("watchdominion.jpg");
  });

  it("stays put when the user cancels", async () => {
    const share = vi
      .fn()
      .mockRejectedValue(new DOMException("cancelled", "AbortError"));
    Object.assign(navigator, { canShare: () => true, share });
    render(<App />);

    clickShare();

    await waitFor(() => expect(share).toHaveBeenCalledTimes(1));
  });
});
