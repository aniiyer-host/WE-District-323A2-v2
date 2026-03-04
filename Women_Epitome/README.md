# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Development setup

This repo contains a React frontend (this folder) and a simple Express/Mongo backend under `../Backend`.

1. **Backend configuration**
   - Copy `Backend/.env.example` to `Backend/.env` and fill in `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` (usually `http://localhost:5173`).
   - Start the backend from workspace root:
     ```bash
     cd Backend
     npm install
     npm start
     ```
   - Ensure the server logs `Server is running on port 5000` and `API is running...` when you hit `http://localhost:5000`.

2. **Frontend configuration**
   - The API base URL is controlled by `VITE_API_URL`. Create a `.env` file in the `Women_Epitome` folder if you want to override the default (`http://localhost:5000/api`).
     Example `.env`:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - Install deps and start dev server:
     ```bash
     cd Women_Epitome
     npm install
     npm run dev
     ```

With both servers running you should be able to log in locally and add events; the app will talk to your local backend instead of the deployed render.com URL.  

> **Deployment note:** the production build now defaults to `https://we-district-323a2-v2.onrender.com/api` when no `VITE_API_URL` is supplied. If you deploy somewhere else or need to override, set `VITE_API_URL` in your deployment environment so the frontend uses the correct API endpoint.  

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
