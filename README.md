# 💸 Expense Tracker API

A personal finance tracking REST API built with **TypeScript**, **Node.js**, **Express**, and **MongoDB**. Deployed and live.

 **Live API Docs:** YOUR_RENDER_URL/docs
 **GitHub:** <https://github.com/1-dara/expense-tracker-api>

-----

## Features

- **JWT Authentication** — Secure register and login with access tokens
- **Expense CRUD** — Create, read, update and delete expenses
- **Category Validation** — Expenses must belong to a defined category
- **Filters** — Filter expenses by category and date range
- **Spending Summary** — Aggregated totals grouped by category using MongoDB aggregation pipeline
- **User Isolation** — Users can only access their own expenses
- **TypeScript** — Fully typed codebase with interfaces and strict mode

-----

## Tech Stack

|Technology   |Purpose                     |
|-------------|----------------------------|
|TypeScript   |Language                    |
|Node.js      |Runtime                     |
|Express      |Web framework               |
|MongoDB      |Database                    |
|Mongoose     |ODM (Object Document Mapper)|
|JWT          |Authentication              |
|bcryptjs     |Password hashing            |
|Render       |Deployment                  |
|MongoDB Atlas|Cloud database              |

-----

## API Endpoints

### Auth

|Method|Endpoint            |Description            |Auth|
|------|--------------------|-----------------------|----|
|POST  |`/api/auth/register`|Register a new user    |❌   |
|POST  |`/api/auth/login`   |Login and get JWT token|❌   |

### Expenses

|Method|Endpoint               |Description                               |Auth|
|------|-----------------------|------------------------------------------|----|
|GET   |`/api/expenses`        |Get all expenses (filter by category/date)|✅   |
|POST  |`/api/expenses`        |Create a new expense                      |✅   |
|GET   |`/api/expenses/summary`|Get spending summary by category          |✅   |
|GET   |`/api/expenses/:id`    |Get a single expense                      |✅   |
|PUT   |`/api/expenses/:id`    |Update an expense                         |✅   |
|DELETE|`/api/expenses/:id`    |Delete an expense                         |✅   |

-----

## Expense Categories

```
food | transport | housing | health | entertainment | shopping | other
```

-----

## Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/1-dara/expense-tracker-api.git
cd expense-tracker-api
```

1. **Install dependencies**

```bash
npm install
```

1. **Create a `.env` file**

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-secret-key
PORT=3000
```

1. **Start the development server**

```bash
npm run dev
```

1. **Visit the docs**

```
http://localhost:3000/docs
```

-----

## Example Requests

### Register

```json
POST /api/auth/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

### Create Expense

```json
POST /api/expenses
Authorization: Bearer <token>

{
  "title": "Lunch",
  "amount": 2500,
  "category": "food",
  "description": "Rice and stew",
  "date": "2026-06-16"
}
```

### Get Summary Response

```json
GET /api/expenses/summary
Authorization: Bearer <token>

[
  { "_id": "entertainment", "total": 3000, "count": 1 },
  { "_id": "food", "total": 2500, "count": 1 },
  { "_id": "transport", "total": 500, "count": 1 }
]
```

-----

## Author

**Irene Peter-Okon Idara**
Backend Engineer
 1ireneokon@gmail.com
 github.com/1-dara