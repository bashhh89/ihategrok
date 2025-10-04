# EasyPanel Deployment Guide: Lessons Learned from SOW Workbench Setup

## Overview
This guide documents the complete process of deploying a complex Node.js monorepo application to EasyPanel, based on our experience setting up the SOW Workbench (Next.js + Express + Prisma + SQLite analytics). It covers what works, what doesn't, and how to avoid the pitfalls we encountered.

## Project Structure Assumptions
- **Monorepo** with pnpm workspaces
- **Multiple services**: Web app (Next.js), API (Express), Analytics (Express with SQLite), Database (PostgreSQL)
- **TypeScript** throughout
- **Prisma** for database ORM
- **Native dependencies** (sqlite3, etc.)

## ✅ What to Do: Best Practices

### 1. Repository Setup
- **Use a clean git repo** without `node_modules` committed
- **Always include `.gitignore`** with:
  ```
  node_modules
  **/node_modules
  .next
  *.log
  .env
  dist
  build
  ```
- **Include `.dockerignore`** mirroring `.gitignore` to prevent build conflicts
- **Commit all Dockerfiles** and config files

### 2. TypeScript Configuration
- **Set `"noEmit": false`** in all `tsconfig.json` files for production builds
- **Include proper `outDir`** (usually `"./dist"`)
- **Ensure `rootDir`** is set correctly (usually `"./src"` or `"./"`)
- **Test builds locally** before deploying

### 3. Database Setup
- **Run `prisma generate`** before building if using Prisma
- **Ensure DATABASE_URL** is properly configured
- **For PostgreSQL**, use official `postgres:15` image
- **Set POSTGRES_PASSWORD** explicitly (no environment variable substitution in some contexts)

### 4. Docker Configuration
- **Use multi-stage builds** if possible to reduce image size
- **Install build dependencies** for native modules:
  ```dockerfile
  RUN apk add --no-cache python3 make g++
  ```
- **Copy package files first**, install dependencies, then copy source
- **Generate Prisma client** before TypeScript compilation
- **Use PM2** for running multiple processes in a single container

### 5. EasyPanel Specifics
- **Use single Dockerfile** for simple deployments (easier than compose)
- **Set environment variables** in EasyPanel UI, not just in Docker
- **Configure domains** in Traefik labels for HTTPS
- **Test builds locally** before pushing to EasyPanel
- **Use official Docker images** where possible

### 6. Native Modules
- **Ensure build tools** are available in Docker for modules like sqlite3
- **Test native modules** in the target environment (Alpine Linux)
- **Consider alternatives** to native modules if possible (e.g., better-sqlite3 instead of sqlite3)

## ❌ What NOT to Do: Common Mistakes

### 1. Git Repository Issues
- **Don't commit `node_modules`** - causes huge repo sizes and GitHub rejections
- **Don't push without `.gitignore`** - leads to accidental commits
- **Don't ignore `.dockerignore`** - causes COPY conflicts in builds

### 2. TypeScript Build Failures
- **Don't leave `"noEmit": true`** in production tsconfig
- **Don't forget `outDir`** in tsconfig
- **Don't build without generating Prisma client** first

### 3. Docker Build Problems
- **Don't COPY source before installing dependencies** - breaks layer caching
- **Don't forget native module build tools** - sqlite3, canvas, etc. will fail
- **Don't use host node_modules in container** - causes version conflicts

### 4. Environment Variables
- **Don't rely on complex env var substitution** in Docker (like `${VAR:-default}`)
- **Don't hardcode secrets** in Dockerfiles
- **Don't forget to set env vars** in EasyPanel UI

### 5. Database Configuration
- **Don't skip Prisma migrations** in production
- **Don't use SQLite for multi-container** setups (use PostgreSQL)
- **Don't forget database connection** environment variables

### 6. EasyPanel Pitfalls
- **Don't use complex compose files** unless necessary - single Dockerfile is simpler
- **Don't forget to commit changes** before redeploying
- **Don't ignore build logs** - they contain the error details

## Step-by-Step Deployment Process

### Phase 1: Local Preparation
1. Ensure all `tsconfig.json` have `"noEmit": false`
2. Test local builds: `pnpm build` for all packages
3. Generate Prisma client: `pnpm --filter db generate`
4. Create `.dockerignore` and `.gitignore`
5. Test Docker build locally: `docker build -t test .`

### Phase 2: Repository Setup
1. Create new GitHub repo (avoid large existing repos)
2. Copy source code (exclude `node_modules`)
3. Commit with proper `.gitignore` and `.dockerignore`
4. Push to GitHub

### Phase 3: EasyPanel Configuration
1. Create new EasyPanel project
2. Connect to GitHub repo
3. Set environment variables in EasyPanel UI
4. Configure domain if needed
5. Deploy and monitor logs

### Phase 4: Troubleshooting
1. Check EasyPanel build logs for errors
2. Common fixes:
   - Add missing build dependencies
   - Fix TypeScript configs
   - Generate Prisma client
   - Clean node_modules conflicts

## Tools and Dependencies Checklist

### Required in Dockerfile
- `node:18-alpine` base image
- `pm2` for process management
- Build tools: `python3 make g++` (for Alpine)
- All runtime dependencies from `package.json`

### Environment Variables
- `NODE_ENV=production`
- `DATABASE_URL` (PostgreSQL connection string)
- `OPENROUTER_API_KEY` (or your AI service key)
- Service-specific ports and configs

### Database Setup
- PostgreSQL container with proper password
- Prisma schema with correct provider
- Migration files committed

## Monitoring and Maintenance

### Logs
- Use PM2 logs: `pm2 logs` in container
- Check EasyPanel logs for build/deploy issues
- Monitor database connections

### Updates
- Test builds locally before pushing
- Update dependencies carefully
- Backup database before schema changes

### Scaling
- Consider separate containers for high-traffic services
- Use Redis for session/cache if needed
- Monitor resource usage in EasyPanel

## Alternative Approaches

If EasyPanel proves too complex:
- **Vercel + Railway**: Next.js on Vercel, API/database on Railway
- **Render**: Full-stack deployments with managed databases
- **Fly.io**: Docker-based with global deployment
- **Manual VPS**: Docker Compose on your own server

## Key Takeaways

1. **Test everything locally first** - don't rely on deployment platforms to catch basic errors
2. **Keep repositories clean** - proper `.gitignore` and no `node_modules`
3. **Understand your dependencies** - native modules need special handling
4. **Use official Docker images** when possible
5. **Document your setup** - future you will thank present you
6. **Start simple, add complexity gradually** - get basic deployment working before advanced features

This guide should prevent most of the issues we encountered. For future projects, follow this checklist and you'll have much smoother deployments.