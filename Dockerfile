
ARG NODE_VERSION=20.19.2

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

################################################################################
# Install dependencies
FROM base AS deps
# Copy only package files to leverage caching
COPY package*.json ./
RUN npm ci --omit=dev

################################################################################
# Build stage
FROM deps AS build
# Copy the rest of the source
COPY . .
# If your build requires dev deps, install them (optional)
RUN npm install
RUN npm run build

################################################################################
# Final runtime
FROM node:${NODE_VERSION}-alpine AS final
WORKDIR /usr/src/app

ENV NODE_ENV=production
USER node

# Copy package.json for reference
COPY package.json .

# Copy production deps + build artifacts
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/transports/remote.js"]
