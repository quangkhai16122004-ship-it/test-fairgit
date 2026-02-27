export function isFinalReviewStatus(status: string) {
  return status === "approved" || status === "changes_requested";
}

export function normalizeRole(role: string) {
  if (role === "admin" || role === "supervisor" || role === "student") {
    return role;
  }
  return "student";
}
