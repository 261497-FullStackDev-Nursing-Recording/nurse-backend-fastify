# Technology Stack

    Framework -> Fastify
    Language -> Typescript
    Database -> Prisma , Postgresql
    Docker

# Getting started

Make sure you have node version 18

## Prep

-   `npm install -g yarn`
-   Copy `env.example` to `.env`
-   `yarn`

## Database

-   `docker-compose up -d`
-   `npx prisma generate`
-   `npx prisma db push`
-   `npx prisma studio`

## mockdata

-   `yarn seed`

## Start

-   `yarn run dev`
