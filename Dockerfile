# ============================================
# Backend Dockerfile - Node.js + Express
# ============================================
FROM node:20-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json ./

# Install production dependencies (omit dev for smaller image)
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Expose backend port
EXPOSE 3000

# Run in production mode (env vars from docker-compose)
CMD ["node", "server.js"]
