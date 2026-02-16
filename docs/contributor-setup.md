# Contributor Setup

## 1. Local prerequisites
- Node.js 20+
- pnpm 10+
- Docker Desktop (for MongoDB)

## 2. Install packages
```bash
pnpm install
```

## 3. Start infrastructure
```bash
docker compose -f infra/docker-compose.yml up -d mongo
```

## 4. Start API and Web
```bash
pnpm dev:api
pnpm dev:web
```

## 5. Test with default login
- Email: `team.lead@capstonehub.dev`
- Role: `student`
