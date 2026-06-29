# Deploy to GitHub Pages

Run these commands from the project root after installing [Git](https://git-scm.com/) and [GitHub CLI](https://cli.github.com/).

## One-time setup

```powershell
# 1. Log in to GitHub
gh auth login

# 2. Initialize git (skip if already a repo)
git init
git branch -M main

# 3. Create the remote repo and push (account: rhon-ux)
gh repo create rhon-ux/highthrive-admin --public --source=. --remote=origin --push
```

If the repo already exists on GitHub:

```powershell
git remote add origin https://github.com/rhon-ux/highthrive-admin.git
git add .
git commit -m "Prepare admin dashboard for GitHub Pages deployment"
git push -u origin main
```

## Enable GitHub Pages

1. Open your repo on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The **Deploy to GitHub Pages** workflow runs automatically on push to `main`.

Your live URL:

`https://rhon-ux.github.io/highthrive-admin/`

## Demo login (still works on the deployed site)

- Email: `rhon@letsgetfunded.com`
- Password: `admin123`

> Replace hardcoded auth before sharing publicly with real users.

## Manual deploy trigger

```powershell
gh workflow run "Deploy to GitHub Pages"
```
