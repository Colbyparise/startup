# ASAKA PHOTOS

[My Notes](notes.md)

A full-featured photography website for Asaka Photos (Destination Wedding & Editorial Photography).
Specialty: Destination wedding and editorial photography
Based: Utah, available worldwide
Style: Documentary-style moments captured on film + digital


## Specification Deliverable

### Elevator pitch

Asaka Photos is a destination wedding and editorial photography brand capturing authentic, documentary-style moments in both film and digital. This project creates a custom website that eliminates reliance on third-party booking platforms (like Pixieset, which takes a 5% cut). By managing our own booking, payments, and gallery delivery, we save costs, streamline the client experience, and give couples a beautiful, seamless way to book and relive their special day.

### Design
The website will list package deals, have options for payments, give quotes, and allow a user to login in and book a photoshoot. 
![Design image](startup.png)


```mermaid
sequenceDiagram
    actor Client
    actor Photographer
    actor Admin
    participant Website

    Client->>Website: Book session request
    Website-->>Client: Confirm request received
    Website-->>Photographer: New booking notification
    Website-->>Admin: Update booking calendar
    Photographer->>Website: Accept/confirm session
    Website-->>Client: Session confirmed email
    Website-->>Admin: Mark as confirmed
    Client->>Website: Payment submitted
    Website-->>Client: Payment receipt
    Website-->>Photographer: Payment confirmed
    Website-->>Admin: Update financial records

```

### Key features

Portfolio Showcase – Display curated galleries of wedding & editorial work (film + digital).

Booking System – Clients can check real-time availability and reserve dates.

Payment Integration – Secure transactions using PayPal and Venmo.

Client Login & Galleries – Private client accounts for viewing and downloading delivered photos.

Responsive Design – Optimized for mobile and desktop so clients can book from anywhere.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** – Structure for portfolio, booking pages, and client galleries.

- **CSS** – Clean, elegant styling that matches the Asaka Photos brand (minimal, modern aesthetic).

- **React** – Dynamic components for portfolio navigation, calendar availability, and gallery viewing.

- **Service** (Node/Express) – Backend service to handle bookings, payments, and gallery delivery.

- **DB/Login** (PostgreSQL + JWT Auth) – Secure login for clients, store bookings, user data, and delivered gallery links.

- **WebSocket** – Real-time booking updates (e.g., calendar instantly updates when a date is reserved).

## Deployment instructions

1. Clone this repository to your development environment.  
```sh
   git clone https://github.com/yourusername/asaka-photos.git
   cd asaka-photos
   ```

3. Create a `.env` file in the root of the project with the following values (replace with your own).  
   ```sh
   PORT=4000
   DATABASE_URL=postgres://username:password@hostname:5432/asakaphotos
   JWT_SECRET=your_secret_key
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_SECRET=your_paypal_secret
   ```

5. NPM install both the frontend and backend dependencies.  
```sh
   # Backend
   npm install
   # Frontend
   cd ui
   npm install
   cd ..
```

5. Database setup (make sure PostgreSQL is running, create database, run migrations).  
```sh
   createdb asakaphotos
   npm run migrate
```
6. Run the application locally.  
```sh
   # Start backend
   npm run dev
   # In another terminal, start frontend
   cd ui
   npm start
```
7. Deploy to production (optional) using the deploy script.  
```sh
   ./deploy.sh -k ~/keys/yourkey.pem -h yourdomainnamehere.com
```
8. Verify that the application is running on the domain.  
```sh
   curl https://yourdomainnamehere.com
```
## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.


- [ ] **Practice** 
"hello world" 
