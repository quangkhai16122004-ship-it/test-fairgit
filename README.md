# CapstoneHub

CapstoneHub is a student capstone project management platform for teams, supervisors, and teaching assistants.

## Modules
- Authentication and role management
- Capstone project board
- Milestone tracking
- Auto project progress sync based on milestone completion
- Team member allocation and workload planning
- Submission and review workflow
- Dashboard insights
- Contributor leaderboard by reviewed submissions and score
- Shared contract package for API and Web type alignment

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB

## Getting Started
- Run contributor setup guide in `docs/contributor-setup.md`
- API health: `GET http://localhost:4300/health`
- Web app: `http://localhost:5174`

## Docker
```bash
docker compose -f infra/docker-compose.yml up --build
```

