# travel-buddy backend (node/express/prisma)

Converted from your Laravel Travel Buddy API and structured like your `healthcare-service` template.

## quick start

1) Install
```bash
npm install
```

2) Setup env
```bash
cp .env.example .env
# edit DATABASE_URL, JWT_SECRET
```

3) Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4) Run
```bash
npm run dev
```

Base URL: `http://localhost:5000/api/v1`

## main endpoints

- Auth
  - POST `/api/v1/auth/register`
  - POST `/api/v1/auth/login`
  - POST `/api/v1/auth/logout`

- Interests
  - GET `/api/v1/interests`

- Users
  - GET `/api/v1/users?page=1&interests=1,2&location=Dhaka&min_age=18&max_age=30`
  - GET `/api/v1/users/:id`

- Travel plans
  - GET `/api/v1/travel-plans`
  - GET `/api/v1/travel-plans/:id`
  - GET `/api/v1/travel-plans/match?...`
  - GET `/api/v1/travel-plans/upcoming-trips`
  - POST `/api/v1/travel-plans` (auth)
  - POST `/api/v1/travel-plans/:id/join` (auth)
  - POST `/api/v1/travel-plans/:participantId/approve` (auth, host)
  - POST `/api/v1/travel-plans/:participantId/decline` (auth, host)

- Reviews
  - POST `/api/v1/reviews` (auth)
  - GET `/api/v1/reviews/user/:userId`
