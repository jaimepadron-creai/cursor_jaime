# frontend/Dockerfile (Módulo 6 - DevOps)
# Multi-stage: builder (Node + pnpm) → production (nginx)

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./

RUN corepack enable pnpm \
    && pnpm install --frozen-lockfile || pnpm install

COPY . .

RUN pnpm run build

# Stage 2: Production
FROM nginx:alpine AS production

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
