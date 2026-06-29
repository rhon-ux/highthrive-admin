# HighThrive Admin

Admin dashboard for **Let's Get Funded** — members, DM sequences, bulk DMs, and event reminders.

Built with React 19 + Vite 8.

## Features

- **Dashboard** — member stats overview
- **Members** — browse, filter, add, edit, and view member details
- **DM Sequences** — per-community automated message sequences
- **Bulk DMs** — filter members and send bulk messages
- **Event Reminders** — configure per-community event reminder settings

> **Note:** This is a frontend prototype. Auth and data are demo/mock for now (`localStorage` + hardcoded login). Replace before production use.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Demo login (development only)

- Email: `rhon@letsgetfunded.com`
- Password: `admin123`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Oxlint on `src/` |

## Deployment (GitHub Pages)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys to **GitHub Pages** on every push to `main`.

### First-time setup

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).

Your site will be available at:

`https://<username>.github.io/<repo-name>/`

For this project:

`https://rhon-ux.github.io/highthrive-admin/`

### Manual build for GitHub Pages

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=your-user/highthrive-admin npm run build
```

## Project structure

```
src/
  components/admin/   # Admin UI pages and data modules
  assets/             # Logo and static assets
```

## License

Private — Let's Get Funded.
