import { describe, expect, it } from "vitest";
import { isFinalReviewStatus, normalizeRole } from "./status.js";

describe("status helpers", () => {
  it("marks approved and changes_requested as final", () => {
    expect(isFinalReviewStatus("approved")).toBe(true);
    expect(isFinalReviewStatus("changes_requested")).toBe(true);
    expect(isFinalReviewStatus("pending")).toBe(false);
  });

  it("normalizes unknown roles to student", () => {
    expect(normalizeRole("admin")).toBe("admin");
    expect(normalizeRole("mentor")).toBe("student");
  });
});
