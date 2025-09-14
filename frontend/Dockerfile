# Use Node.js 18 LTS
FROM node:18-alpine

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package files (will be created when project exists)
COPY package*.json ./

# Install dependencies (skip if no package.json exists yet)
RUN npm install || echo "No package.json found, skipping npm install"

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
