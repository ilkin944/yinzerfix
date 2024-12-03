FROM node:20-alpine  AS builder
WORKDIR /app
COPY package.json package-lock.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile 
RUN pnpm ci && pnpm cache clean --force
COPY . .
RUN pnpm run build

FROM node:20-alpine  AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm", "start"]
