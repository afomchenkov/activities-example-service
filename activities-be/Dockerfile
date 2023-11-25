# Stage 1: Build the project
FROM node:20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Run the project
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npm", "run", "start:prod"]
EXPOSE 8080
