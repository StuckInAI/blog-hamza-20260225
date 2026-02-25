FROM node:20-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm i --legacy-peer-deps

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
