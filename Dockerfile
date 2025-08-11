# Multi-stage build for KR-STUDIO CompleteAI
FROM node:20.18.0-slim AS base

# Install system dependencies
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    pkg-config \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Create production stage
FROM node:20.18.0-slim AS production

# Install runtime dependencies
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
    ffmpeg \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built application
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/server.js ./
COPY --from=base /app/demucs-worker.js ./
COPY --from=base /app/package.json ./

# Install Python dependencies if needed
RUN if [ -f requirements.txt ]; then pip3 install -r requirements.txt; fi

# Create necessary directories
RUN mkdir -p uploads separated

# Expose port
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:10000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
