# 🧹 GitSweep

> **Bulk-delete GitHub repositories from your terminal — safely, quickly, and with full control.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org)
[![GitHub API](https://img.shields.io/badge/GitHub-REST%20API-blue.svg)](https://docs.github.com/en/rest)

---

## Why GitSweep?

GitHub's UI forces you to delete repositories **one at a time**, navigating through multiple confirmation dialogs for each one. If you've ever wanted to clean up old experiments, test repos, or abandoned projects, that process is painfully slow.

**GitSweep fixes that.** Run the CLI, pick the repos you want gone, type `y` to confirm — done.

---

## Features

- 🔐 Authenticate with a GitHub Personal Access Token
- 📋 Fetch **all** repositories from your account
- ☑️ Interactive multi-select via terminal UI
- 🗑️ Bulk delete in a single command
- ✅ Safety confirmation before any deletion
- 📊 Live progress output per repository

---

## Demo

```
$ gitsweep

  GitSweep
  ──────────────────────────────────────────
  Enter your GitHub Personal Access Token: ••••••••••••••••

  Fetching your repositories...

  Select repositories to delete (space to select, enter to confirm):

   ○ my-portfolio
   ● old-project          ← selected
   ● test-repo-2023       ← selected
   ○ dotfiles
   ● abandoned-hackathon  ← selected

  You are about to permanently delete:
    • old-project
    • test-repo-2023
    • abandoned-hackathon

  Are you absolutely sure? (y/N): y

  Deleting...
    ✔  Deleted: old-project
    ✔  Deleted: test-repo-2023
    ✔  Deleted: abandoned-hackathon

  Done. 3 repositories removed.
```

---

## Installation

**Clone and install:**

```bash
git clone https://github.com/YOUR_USERNAME/gitsweep.git
cd gitsweep
npm install
```

**Run directly:**

```bash
node index.js
```

**Or install globally:**

```bash
npm link
gitsweep
```

---

## Requirements

| Requirement | Version |
|---|---|
| Node.js | 16 or higher |
| GitHub Personal Access Token | Classic token with `repo` + `delete_repo` scopes |

---

## Creating a GitHub Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token → Classic**
3. Give it a name (e.g. `gitsweep`)
4. Select these scopes:

   ```
   ✅ repo
   ✅ delete_repo
   ```

5. Click **Generate token** and copy it — you'll paste it when prompted by the CLI

> These scopes allow GitSweep to list your repositories and delete the ones you select. No other permissions are requested.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| HTTP client | Axios |
| CLI prompts | Inquirer.js |
| API | GitHub REST API v3 |

---

## ⚠️ Warning

Deleting repositories is **permanent and irreversible.** GitHub does not provide a recovery option.

- Double-check your selections before confirming
- Consider [archiving](https://docs.github.com/en/repositories/archiving-a-github-repository) instead of deleting if you're unsure
- The tool will never delete anything without an explicit `y` confirmation

---

## Roadmap

Planned and community-requested features:

- [ ] `--dry-run` mode — preview what would be deleted without deleting
- [ ] Filter by language, topic, or last-updated date
- [ ] Support for organization repositories
- [ ] Pagination for accounts with 100+ repositories
- [ ] Colored terminal output
- [ ] Progress bars for large deletions
- [ ] `.env` file support for token storage
- [ ] Export deletion log to file

Have a feature request? [Open an issue](https://github.com/YOUR_USERNAME/gitsweep/issues).

---

## License

[MIT](./LICENSE) — free to use, modify, and distribute.
