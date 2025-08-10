## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## To start the application: Database

1. Start docker to run postgress

```bash
docker compose up -d
```

2. Generate Drizzle DB

```bash
npm run generate
```

3. Migrate the Database

```bash
npm run migrate:up
```

4. Seed the Database

```bash
npm run seed
```
then

```bash
curl -X POST http://localhost:3000/api/seed
```



## To start the application: FRONT-END

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```