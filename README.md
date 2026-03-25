<h1 align="center">✈️ Flowmatic — Frontend</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/MUI-v7-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Hook_Form-7-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
</p>

---

## 📖 About the Project

**Flowmatic** is a B2B web application that lets travel agencies create, manage and send professional, branded travel quotes. Employees can upload a PDF itinerary, let AI extract the data, review it in a dynamic form, and generate a polished quote preview — all in one flow.

The project was developed as a final bootcamp project following a professional workflow with **React**, **MUI (Material UI)**, **React Hook Form**, and **JWT authentication with role-based access control**.

The app communicates with a Spring Boot backend ([see Backend repository](./readme_back.md)) that manages authentication, quotes, employees and agency settings.

### 🎯 Project Goals

- Build a complete SPA with React 19 and React Router 7
- Consume a REST API with Axios and centralized JWT interceptors
- Implement JWT authentication with persistent auth context
- Manage role-based UI (ADMIN vs EMPLOYEE) with protected routes
- Build a dynamic multi-section quote form with React Hook Form
- Integrate Claude AI PDF extraction into the creation flow
- Apply a consistent design system using MUI with a custom theme

---

## ✨ Main Features

- 🔐 **JWT Authentication** — login, register, persistent session via localStorage
- 👥 **Role-based access** — ADMIN sees employee management, EMPLOYEE sees their quotes
- 📊 **Dashboard** — quote stats by status + recent quotes with status change actions
- 📝 **Quote creation** — multi-step form with PDF upload + AI extraction prefill
- ✏️ **Quote editor** — edit all quote sections (days, inclusions, payments, supplements, accommodations)
- 👀 **Quote preview** — branded, client-ready quote page using agency colors and logo
- 📄 **PDF export** — "Télécharger PDF" button with full `@media print` styling for a clean export
- 🤖 **PDF-to-quote AI flow** — upload a PDF, Claude extracts the data, user validates before saving
- 🖼️ **Cover image picker** — search Unsplash via backend or upload a custom image to Cloudinary
- 🏢 **Agency settings** — logo upload, brand colors (color pickers), terms & conditions (ADMIN only)
- 👤 **Employee management** — create, edit, delete employees (ADMIN only)
- 🛡️ **Protected routes** — public / authenticated / role-gated pages

---

## 🛠️ Technologies

| Technology               | Use                                          |
| ------------------------ | -------------------------------------------- |
| React 19                 | UI library, functional components and hooks  |
| React Router DOM 7       | SPA routing with public and protected routes |
| MUI v7                   | Component library with custom theme          |
| React Hook Form 7        | Form state management and validation         |
| react-colorful           | Color picker for agency brand colors         |
| Axios                    | HTTP client with JWT interceptors            |
| Vite 8                   | Dev server and production bundler            |
| Vitest + Testing Library | Unit and component tests                     |
| CSS Modules              | Scoped component-level styles                |
| ESLint                   | Code quality and consistency                 |

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand full structure</strong></summary>

```
src/
│
├── components/
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── StatCard.jsx           → Stats card (quote counts by status)
│   │   ├── RecentQuoteList.jsx    → Recent quotes table
│   │   ├── StatusChangeDialog.jsx → Change quote status dialog
│   │   └── DeleteQuoteDialog.jsx  → Delete quote confirmation
│   │
│   ├── employees/               # Employee management components
│   │   ├── EmployeeTable.jsx      → List employees
│   │   ├── EmployeeFormDialog.jsx → Create / edit employee dialog
│   │   └── DeleteEmployeeDialog.jsx
│   │
│   ├── layout/                  # App-level layout
│   │   └── Navbar.jsx             → Sidebar nav (role-based menu items)
│   │
│   ├── quote/                   # Quote form components
│   │   ├── QuoteFormBody.jsx      → Main form container
│   │   ├── GeneralInfo.jsx        → Client info, destination, dates
│   │   ├── CoverImage.jsx         → Image selector (Unsplash / Cloudinary upload)
│   │   ├── PdfUploadZone.jsx      → PDF drop zone + extraction trigger
│   │   ├── DayTabs.jsx            → Tab UI for each day
│   │   ├── DaySection.jsx         → Single day (itinerary, transport, accommodation)
│   │   ├── InclusionList.jsx      → Included / excluded items
│   │   ├── PaymentConditionList.jsx → Payment terms
│   │   ├── SupplementList.jsx     → Optional extras
│   │   ├── AccommodationList.jsx  → Hotel showcase
│   │   └── preview/             # Quote preview sub-components
│   │       ├── PreviewTopBar.jsx    → Top bar with "Télécharger PDF" button
│   │       ├── PreviewCoverImage.jsx
│   │       ├── PreviewInfoGrid.jsx
│   │       ├── PreviewDayProgram.jsx
│   │       ├── PreviewInclusions.jsx
│   │       ├── PreviewPaymentConditions.jsx
│   │       ├── PreviewSupplements.jsx
│   │       ├── PreviewAccommodations.jsx
│   │       ├── PreviewTermsConditions.jsx
│   │       └── SectionTitle.jsx
│   │
│   ├── settings/                # Agency settings components
│   │   ├── AgencyLogo.jsx         → Logo upload (Cloudinary)
│   │   ├── BrandColors.jsx        → Primary / secondary color pickers
│   │   └── TermsConditions.jsx    → T&C textarea
│   │
│   └── shared/                  # Shared reusable components
│       ├── StatusChip.jsx         → Color-coded status badge
│       └── FormLabel.jsx          → Custom MUI form label
│
├── context/                     # Auth state management
│   ├── authContext.js             → createContext definition
│   ├── AuthContext.jsx            → Provider (token, user, login, logout)
│   └── useAuth.js                 → Hook to access auth context
│
├── hooks/                       # Custom hooks
│   ├── useQuoteForm.js            → Quote form state (React Hook Form)
│   └── useSnackbar.jsx            → Toast notifications (MUI Snackbar)
│
├── pages/                       # Page-level components (one per route)
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx           → Register agency + admin account
│   ├── DashboardPage.jsx          → Stats + recent quotes
│   ├── QuoteCreatePage.jsx        → Create quote (with PDF upload)
│   ├── QuoteEditPage.jsx          → Edit existing quote
│   ├── QuotePreviewPage.jsx       → Branded client-facing preview + PDF export
│   ├── SettingsPage.jsx           → Agency settings (ADMIN)
│   └── EmployeesPage.jsx          → Employee management (ADMIN)
│
├── routes/                      # Routing configuration
│   ├── router.jsx                 → All route definitions
│   ├── ProtectedRoute.jsx         → Requires authentication
│   ├── ProtectedLayout.jsx        → Layout wrapper for authenticated pages
│   └── RoleRoute.jsx              → Requires specific role (ADMIN)
│
├── services/                    # API communication layer
│   ├── api.js                     → Axios instance + JWT interceptors + 401 handling
│   ├── authService.js             → POST /auth/register, /auth/login
│   ├── quoteService.js            → Quote CRUD + extract
│   ├── userService.js             → Employee CRUD
│   ├── agencyService.js           → Agency settings GET/PUT
│   ├── uploadService.js           → Image upload to Cloudinary
│   └── unsplashService.js         → Unsplash image search
│
├── styles/                      # Global styling
│   └── theme.js                   → MUI theme (colors, typography, spacing)
│
├── utils/                       # Utility functions
│   ├── formatData.js              → Data formatting helpers
│   └── statusConfig.js            → Quote status labels and colors
│
├── App.jsx                      # Root component (RouterProvider)
├── main.jsx                     # Entry point (providers + render)
└── index.html                   # HTML template
```

> Components are organized **by feature** (quote, dashboard, employees, settings) to keep related code co-located and easy to navigate.

</details>

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js 18** or higher
- **npm 9** or higher
- The **Backend** running at `http://localhost:8080` ([see Backend readme](./readme_back.md))

### Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd flowmatic-front
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```env
# .env
VITE_API_URL=http://localhost:8080/api
```

4. **Start the development server**

```bash
npm run dev
```

App available at `http://localhost:5173`.

---

## 📜 Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start dev server with hot reload |
| `npm run build`   | Compile for production           |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Check code quality with ESLint   |

---

## 🗺️ Application Routes

| Route                 | Page                | Access        |
| --------------------- | ------------------- | ------------- |
| `/login`              | Login               | 🌐 Public     |
| `/register`           | Register            | 🌐 Public     |
| `/dashboard`          | Dashboard           | 🔒 Auth       |
| `/quotes/new`         | Create Quote        | 🔒 Auth       |
| `/quotes/:id/edit`    | Edit Quote          | 🔒 Auth       |
| `/quotes/:id/preview` | Quote Preview + PDF | 🔒 Auth       |
| `/settings`           | Agency Settings     | 👑 ADMIN only |
| `/employees`          | Employees           | 👑 ADMIN only |

---

## 🔗 Connection with the Backend

<details>
<summary><strong>Axios setup & services</strong></summary>

The frontend communicates with the REST API via **Axios**. The base URL is configured via `VITE_API_URL`.

JWT tokens are automatically injected into every request via an Axios **request interceptor** in `api.js`. On a `401` response, the interceptor logs the user out and redirects to `/login`.

| Service              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `authService.js`     | Register new agency, login                         |
| `quoteService.js`    | Full quote CRUD + PDF extraction endpoint          |
| `userService.js`     | Create, list, update, delete employees             |
| `agencyService.js`   | Get and update agency settings (logo, colors, T&C) |
| `uploadService.js`   | Upload images to Cloudinary via backend            |
| `unsplashService.js` | Search cover images via Unsplash                   |

</details>

---

## 🔐 Authentication & Authorization

Auth state is managed with a **React Context** (`AuthContext`):

- On login, the JWT token and user info (`userId`, `agencyId`, `firstName`, `roles`) are stored in `localStorage` and the context.
- `ProtectedRoute` redirects unauthenticated users to `/login`.
- `RoleRoute` restricts access to ADMIN-only pages (Settings, Employees).
- The `Navbar` adapts its menu items based on the user's role.

---

## 🤖 AI PDF Extraction Flow

1. User opens the **Create Quote** page
2. User drops a PDF into the **PdfUploadZone** component
3. Frontend calls `POST /api/quotes/extract` (multipart)
4. Backend sends the PDF to the **Claude API** (Sonnet 4.6) and returns structured JSON
5. The extracted data prefills the quote form via React Hook Form's `reset()`
6. User reviews, adjusts, and saves the quote

---

## 📄 PDF Export

The **QuotePreviewPage** includes a **"Télécharger PDF"** button (in `PreviewTopBar`) that triggers `window.print()`. All preview components include `@media print` CSS rules to hide navigation, adjust layout and page breaks — producing a clean, agency-branded PDF directly from the browser.

---

## 👩‍💻 Team

| Developer                   | GitHub                                                   | LinkedIn                                                        |
| --------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| **Marie-Charlotte Doulcet** | [@Charlottedoulcet](https://github.com/Charlottedoulcet) | [LinkedIn](https://www.linkedin.com/in/marie-charlottedoulcet/) |

> 💙 Project developed during the **FemCoders Bootcamp P8 — March 2026**

---

## 🌱 Possible Future Improvements

- 👥 **CRUD Clients** — contact book per agency (name, email, history)
- 📧 **Send quote by email** — send the quote preview directly to the client from the app
- 🌍 **Internationalization (i18n)** — French / English support
- 🌗 **Dark / light theme toggle**
- 🔗 **Client-facing public quote link** — shareable read-only link for clients to view and accept a quote
- 🗂️ **Drag-and-drop day reordering** in the quote editor
- 🍪 **Secure token storage** — move from localStorage to HTTP-only cookies
