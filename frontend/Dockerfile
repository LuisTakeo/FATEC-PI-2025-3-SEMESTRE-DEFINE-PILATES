# Multi-stage Dockerfile for Next.js (production)

FROM node:24-alpine AS builder
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Install all dependencies (including dev deps needed for build)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

FROM node:24-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy only what's required to run the app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]

# For development: run locally with dev deps and `npm run dev`, or create a separate dev Dockerfile that mounts the source and runs the dev script.
