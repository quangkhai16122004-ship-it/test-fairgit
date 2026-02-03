# Architecture Notes

## Context
CapstoneHub supports capstone teams from registration to milestone review.

## Main modules
- Projects
- Milestones
- Submissions and review
- Dashboard aggregation

## Data model highlights
- projectCode is used as tenant boundary for simple simulation
- submission is linked to milestoneId and reviewer state
