import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Stat from "./Stat";

const { animate, stop } = vi.hoisted(() => {
  const stop = vi.fn();
  const animate = vi.fn<
    (
      from: number,
      to: number,
      options: { duration: number; onUpdate: (latest: number) => void },
    ) => { stop: () => void }
  >(() => ({ stop }));
  return { animate, stop };
});

vi.mock("motion", () => ({ animate }));

let intersect: (isIntersecting: boolean) => void;

beforeEach(() => {
  animate.mockClear();
  stop.mockClear();

  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersect = (isIntersecting) =>
          callback(
            [{ isIntersecting } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          );
      }
      observe() {}
      disconnect() {}
    },
  );
});

describe("Stat", () => {
  it("renders the formatted value", () => {
    const { container } = render(<Stat value={2903377} />);
    expect(container.textContent).toBe("2,903,377");
  });

  it("only starts counting once visible", () => {
    render(<Stat value={100} />);
    expect(animate).not.toHaveBeenCalled();

    act(() => intersect(true));

    expect(animate).toHaveBeenCalledTimes(1);
    expect(animate).toHaveBeenCalledWith(
      0,
      100,
      expect.objectContaining({ onUpdate: expect.any(Function) }),
    );
  });

  it("writes formatted frames as the animation progresses", () => {
    const { container } = render(<Stat value={100000} />);
    act(() => intersect(true));

    const { onUpdate } = animate.mock.calls[0][2];
    onUpdate(4321.9);

    expect(container.textContent).toBe("4,321");
  });

  it("stops the animation on unmount", () => {
    const { unmount } = render(<Stat value={100} />);
    act(() => intersect(true));

    unmount();

    expect(stop).toHaveBeenCalled();
  });
});
