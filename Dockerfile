# ── Stage 1: Build ────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build args and pass to Vite at build time
ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET=production
ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID
ENV VITE_SANITY_DATASET=$VITE_SANITY_DATASET

# Install dependencies
# Using npm install (not npm ci) — no package-lock.json required
COPY package.json ./
RUN npm install --silent

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
