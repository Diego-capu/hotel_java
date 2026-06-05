# Luxury Hotel Reservation System - SPA

Internal Single Page Application (SPA) designed to manage hotel room availability, handle client bookings, and compute live occupancy analytics. Built with Vanilla JavaScript, structured as an enterprise-grade modular system, and bundled via Vite.

## 🛠️ Tech Stack & Architecture
* **Frontend Core:** Vanilla JavaScript (ES6 Modules)
* **Build Tool & Bundler:** Vite
* **Styling Framework:** Tailwind CSS (CDN Integration)
* **Mock Database / REST API:** JSON Server
* **Navigation:** Virtual Routing via History API (`pushState` and `popstate` events)

---

## 📂 Project Structure
```text
hotel_java/
├── index.html                  # Single entry point container (#app)
├── db.json                     # Mock relational storage (users & rooms)
├── package.json                # Dependency registry & execution scripts
└── src/
    ├── main.js                 # Application bootstrap & router initialization
    ├── api.js                  # Centralized HTTP Client (Fetch API with try/catch)
    ├── router.js               # Route guard interceptor & dynamic view switcher
    └── views/
        ├── loginView.js        # Authentication UI layer & local session binding
        └── dashboardView.js    # Multi-role CRUD panel & business metrics layout

🔧 Fixed Issues During Development
ReferenceError: userProjects is not defined: Corrected the data binding inside dashboardView.js to map over userRooms instead of the legacy userProjects variable, ensuring the inventory renders flawlessly.

favicon.ico - Failed to load resource: net::ERR_HTTP_RESPONSE_CODE_FAILURE: Injected an explicit empty data-URI favicon inside index.html (<link rel="icon" href="data:,">) to stop the browser from throwing annoying 404 red errors in the dev console.

🛠️ Tech Stack & Configuration (package.json)
Build Tool: Vite ⚡ (Handles hot reloading and bundles the modern frontend environment).

Language: Vanilla JavaScript (ES6+ with "type": "module" enabled to support native imports).

Styling Framework: Tailwind CSS (Responsive Design Layout via CDN development injection).

Backend Engine: JSON Server (REST API simulator tracking room states asynchronously).

🚀 Installation & Running Guide (Windows Local Environment)
Follow these terminal setup instructions within your project root folder (C:\Users\diego\OneDrive\Documentos\hotel_java):

1. Download Local Packages
Restore the dependency tree, Vite binaries, and backend packages inside your local ecosystem:

Bash
npm install
(This command will generate the node_modules folder. Vital if Windows throws a "vite" no se reconoce como un comando interno o externo error).

2. Boot up the Frontend Engine (Vite)
Launch the rapid local web compilation pipeline:

Bash
npm run dev
Vite will instantly map a dynamic port (e.g., http://localhost:5173). Click the terminal link to launch the app.

3. Open the Mock REST Backend Engine (JSON-Server)
Open a new separate terminal window inside VS Code and execute the database watcher:

Bash
npm run api
This binds your relational storage on port 3000 (http://localhost:3000).