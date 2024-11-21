# Stage 1: Build Stage
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY api.yaml ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm install typescript
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine

LABEL maintainer="Harshil Patel"

WORKDIR /app

COPY package*.json ./
COPY api.yaml ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD ["node", "./dist/app.js"]