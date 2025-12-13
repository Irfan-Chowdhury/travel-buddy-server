# 🧳 Travel Buddy & Meetup Platform

A modern social-travel web platform that helps travelers connect with compatible companions, plan shared trips, and build meaningful travel experiences together.

---

## 📌 Project Overview

**Travel Buddy & Meetup** is a subscription-based social travel platform designed to connect travelers who are planning trips to similar destinations. The platform enables users to create travel plans, discover matching companions based on interests and schedules, and interact through profiles, reviews, and ratings.

By blending social networking with travel planning, the platform transforms solo journeys into shared adventures and fosters a trusted community of explorers.

---

## 🎯 Project Objectives

* Build a full-stack social travel platform.
* Enable users to create and manage travel plans.
* Match travelers based on destination, date, and interests.
* Provide secure authentication and role-based access.
* Offer a clean, modern, and user-friendly experience.
* Support premium subscriptions and verified user features.

---

<br>

## 📽️ Demo & Submission

* 🔗 **Server Repository** : https://github.com/Irfan-Chowdhury/travel-buddy-server
* 🌐 **Server Live Demo** : http://travelbuddy.irfandev.xyz/api/

<br>

* 🔗 **Client Repository** : https://github.com/Irfan-Chowdhury/travel-buddy-client
* 🌐 **Client Live Link** : https://travel-buddy-nextjs.vercel.app/

<br>

#### Admin Credentials:
Email: admin@gmail.com <br>
Password: admin@gmail.com

#### User Credentials
Email: promi@gmail.com <br>
Password : promi@gmail.com

---


## 🚀 Core Features

### 🔐 User Authentication & Roles

* Email & password-based authentication.
* JWT-based secure login system.
* Role management:

  * **User**: Create travel plans, explore and match with others.
  * **Admin**: Manage users, travel plans, and platform data.
* Secure password hashing and protected routes.

---

### 👤 User Profile Management (CRUD)

* Create and update user profiles.
* Profile details include:

  * Full name
  * Profile image (Cloudinary / ImgBB)
  * Bio / About section
  * Travel interests
  * Visited countries
  * Current location
* Public profile view for other users.

---

### 🧳 Travel Plan Management (CRUD)

* Users can create, edit, and delete travel plans.
* Travel plan details:

  * Destination (country/city)
  * Start and end dates
  * Budget range
  * Travel type (Solo, Family, Friends)
  * Short description or itinerary
* Plans are visible for discovery and matching.

---

### 🔍 Search & Matching System

* Find potential travel buddies based on:

  * Destination
  * Date range
  * Interests
* Dynamic search results for better discovery.

---

### ⭐ Review & Rating System

* Users can review each other **after a trip is completed**.
* Features:

  * 1–5 star rating
  * Written review
  * Edit or delete own reviews
* Display average ratings and recent reviews on profiles to build trust.

---

### 💳 Payment & Subscription System

* Premium subscription plans (Monthly / Yearly).
* Verified badge available after subscription.
* Payment gateway support:

  * Stripe
  * SSLCommerz
  * (Extensible for other providers)

---

## 🧭 Pages & Navigation

### 🔗 Navbar

**Logged Out**

* Home
* Explore Travelers
* Find Travel Buddy
* Login
* Register

**Logged In (User)**

* Home
* Explore Travelers
* My Travel Plans
* Profile
* Logout

**Logged In (Admin)**

* Admin Dashboard
* Manage Users
* Manage Travel Plans
* Profile
* Logout

---

### 📄 Main Pages

* `/` – Landing page with featured destinations, how-it-works section, testimonials, and CTAs.
* `/register` – User registration.
* `/login` – Secure login page.
* `/profile/[id]` – Public user profile.
* `/dashboard` – User/Admin dashboard.
* `/travel-plans` – Manage personal travel plans.
* `/travel-plans/[id]` – Travel plan details with “Request to Join”.
* `/explore` – Search and match travelers.

---

## 🧩 Optional & Advanced Features

* 📍 Google Maps integration for nearby travelers.
* 📨 Notifications (in-app / push).
* 📸 Media sharing for trip photos.

---
## 🌐 API Endpoints (Sample)

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST   | `/api/auth/register`          | Register new user        |
| POST   | `/api/auth/login`             | Login user               |
| GET    | `/api/users/:id`              | Get user profile         |
| PATCH  | `/api/users/:id`              | Update user profile      |
| POST   | `/api/travel-plans`           | Create travel plan       |
| GET    | `/api/travel-plans`           | Get all travel plans     |
| GET    | `/api/travel-plans/match`     | Search & match travelers |
| POST   | `/api/reviews`                | Add review               |
<!-- | POST   | `/api/payments/create-intent` | Create payment intent    | -->

---

## 🛠️ Technologies Used

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* TypeScript

### Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication

### Tools & Services

* Cloudinary / ImgBB
* Stripe / SSLCommerz
* Vercel (Frontend Deployment)
* cPanel / VPS (Backend Deployment)

---

## ✅ Project Status

✔ Fully implemented
✔ Production-ready
✔ Secure authentication
✔ Modular backend architecture
✔ Scalable and extensible design

---

## 📌 Conclusion

**Travel Buddy & Meetup** demonstrates a complete, real-world full-stack application with modern technologies, clean architecture, and practical features. The platform focuses on usability, security, and scalability while solving a real problem for travelers worldwide.

---

