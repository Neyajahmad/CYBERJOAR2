# GitHub Cleanup & Security Guide

## 🔒 Files to Remove from GitHub

Run these commands to remove unwanted files from your repository:

```bash
# Remove documentation files from git
git rm CLEAR_AND_RESTART.md
git rm DEBUG_STEPS.md
git rm FIX_MONGODB.md
git rm INDIA_SETUP.md
git rm QUICK_FIX.md
git rm SAMPLE_AREAS_TO_ADD.md
git rm SETUP_GUIDE.md
git rm START_APP.md
git rm TESTING_GUIDE.md
git rm WINDOWS_FIX.md

# Commit the removal
git commit -m "Remove extra documentation files"

# Push to GitHub
git push origin main
```

## 🔐 Protecting Secret Keys

### ✅ What's Already Protected:

1. **`.env` file is in `.gitignore`** - Your MongoDB credentials are safe
2. **`.env.example` created** - Template for other developers
3. **Updated `.gitignore`** - Prevents future accidental commits

### ⚠️ If You Already Committed .env:

If you accidentally committed `.env` with secrets, run:

```bash
# Remove .env from git history (keeps local file)
git rm --cached server/.env

# Commit the change
git commit -m "Remove .env from version control"

# Push to GitHub
git push origin main
```

### 🔄 If Secrets Were Exposed:

If your `.env` was already pushed to GitHub:

1. **Change your MongoDB password** (if using MongoDB Atlas)
2. **Rotate any API keys** that were exposed
3. **Remove from git history:**

```bash
# Install BFG Repo Cleaner (optional, for complete removal)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Or use git filter-branch (built-in)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch server/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history)
git push origin --force --all
```

## 📋 Clean Repository Checklist

Before pushing to GitHub:

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists (without real credentials)
- [ ] No `node_modules/` folders
- [ ] No `mongodb-data/` folder
- [ ] Only essential documentation (README.md)
- [ ] No sensitive data in code

## 🚀 Recommended Git Workflow

```bash
# 1. Check what will be committed
git status

# 2. Add only necessary files
git add .

# 3. Commit with meaningful message
git commit -m "Initial commit: Urban Growth Dashboard"

# 4. Push to GitHub
git push origin main
```

## 📁 Final Repository Structure

```
predictive-urban-growth/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
├── server/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── data/
│   ├── .env.example          ✅ (Template)
│   ├── .env                  ❌ (Not in git)
│   ├── server.js
│   └── package.json
├── .gitignore                ✅ (Updated)
├── README.md                 ✅ (Main docs)
└── package.json
```

## 🔍 Verify Before Pushing

```bash
# Check what files will be pushed
git ls-files

# Make sure .env is NOT in the list
git ls-files | grep .env

# Should only show .env.example, not .env
```

## ✅ Safe to Commit

These files are safe to commit:
- ✅ All source code (.js, .jsx files)
- ✅ Configuration files (package.json, tailwind.config.js)
- ✅ .env.example (template without real credentials)
- ✅ README.md
- ✅ .gitignore

## ❌ Never Commit

- ❌ .env (contains secrets)
- ❌ node_modules/
- ❌ mongodb-data/
- ❌ API keys, passwords, tokens
- ❌ Personal data

## 🛡️ GitHub Security Features

Enable these on GitHub:

1. **Secret Scanning** - Detects accidentally committed secrets
2. **Dependabot** - Alerts for vulnerable dependencies
3. **Branch Protection** - Prevents force pushes to main

## 📝 .env.example Template

Your `.env.example` should look like:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/urban-growth

# Server Port
PORT=5000
```

## 🎯 Quick Commands

```bash
# Remove all extra .md files
git rm *.md
git add README.md
git commit -m "Keep only README.md"

# Check if .env is tracked
git ls-files | grep .env

# Remove .env if tracked
git rm --cached server/.env
git commit -m "Remove .env from tracking"

# Push changes
git push origin main
```

---

Your repository is now clean and secure! 🎉
