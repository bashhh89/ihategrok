# Simple Dockerfile for SOW Workbench - runs all services in one container
FROM node:18-alpine

WORKDIR /app

# Install pm2 globally for process management
RUN npm install -g pm2 pnpm

# Install build dependencies for native modules (sqlite3)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/analytics/package.json ./packages/analytics/
COPY packages/db/package.json ./packages/db/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Generate Prisma client
RUN pnpm --filter @sow-workbench/db generate

# Build everything
RUN pnpm --filter @sow-workbench/db build
RUN pnpm --filter @sow-workbench/analytics build
RUN pnpm --filter @sow-workbench/api build
RUN pnpm --filter sow-workbench build

# Create pm2 ecosystem file for running multiple services
RUN echo '{ \
  "apps": [ \
    { \
      "name": "api", \
      "script": "pnpm --filter api start", \
      "env": { \
        "NODE_ENV": "production", \
        "DATABASE_URL": "postgresql://sow_user:changeme123@db:5432/sow_workbench", \
        "OPENROUTER_API_KEY": "YOUR_OPENROUTER_API_KEY_HERE", \
        "PORT": "5578" \
      } \
    }, \
    { \
      "name": "web", \
      "script": "pnpm --filter sow-workbench start", \
      "env": { \
        "NODE_ENV": "production", \
        "NEXT_PUBLIC_API_URL": "http://localhost:5578", \
        "PORT": "3009" \
      } \
    }, \
    { \
      "name": "analytics", \
      "script": "pnpm --filter analytics start", \
      "env": { \
        "NODE_ENV": "production" \
      } \
    } \
  ] \
}' > ecosystem.config.json

# Expose ports
EXPOSE 3009 5578 3010

# Start all services with pm2
CMD ["pm2-runtime", "ecosystem.config.json"]