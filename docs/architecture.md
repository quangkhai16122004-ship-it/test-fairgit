# Architecture Notes

## Context
CapstoneHub supports capstone teams from registration to milestone review.

## Main modules
- Projects
- Milestones
- Submissions and review
- Dashboard aggregation
- Review queue filtering by reviewer and status
- Pagination support on project listing APIs

## Data model highlights
- `projectCode` is used as tenant boundary for this simulation setup.
- Submission is linked to `milestoneId` and reviewer state.

## Runtime notes
- Centralized error middleware standardizes API error payloads.
