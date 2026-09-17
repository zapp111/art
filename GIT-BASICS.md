# Git & GitHub from the terminal — a beginner's guide

The whole thing boils down to **four commands** you'll use forever:

```
git add  →  git commit  →  git push
   ↑
git status   (check what's going on, any time)
```

---

## The mental model (read this once)

Think of it like mailing a package:

| Step | Command | What it really does |
| --- | --- | --- |
| 1. Choose what to pack | `git add <file>` | Puts changes into the **staging area** (a loading dock) |
| 2. Seal & label the box | `git commit -m "message"` | Saves a snapshot to your **local** history, on your machine |
| 3. Mail it | `git push` | Uploads your commits to **GitHub** (the cloud) |

Until you `push`, GitHub has **no idea** you did anything. Your work is only
on your laptop. That's the step most beginners forget.

---

## Part 0 — One-time setup (do this once per computer)

### Windows quick start (your setup)

1. Download **Git for Windows**: <https://git-scm.com/download/win>
   — the download starts automatically. If it doesn't, click the "64-bit Git for
   Windows Setup" link.
2. Run the installer and click **Next** through every screen. **Don't change
   any options** — the defaults are all correct, and they give you:
   - **Git Bash** (the terminal you'll use)
   - **Git Credential Manager** (handles login via a browser popup)
   - **Git Bash Here** in the right-click menu (very handy)
3. Open **Git Bash**: click Start, type `Git Bash`, press Enter.
4. Confirm it worked:

```bash
git --version
```

You should see `git version 2.x.x`.

### Is git installed? (Mac / Linux)

```bash
git --version
```

If you get `git version 2.x.x`, good. If you get "command not found":

- **Mac:** it may prompt you to install Xcode tools, or run `brew install git`
- **Linux:** `sudo apt install git`

### Log in (this is where most people get stuck)

**GitHub stopped accepting your account password in 2021.** If you typed your
normal password and it said "Authentication failed" or "Support for password
authentication was removed" — that's why. You need one of these instead:

**Option A — just push, and let Windows handle it (easiest on Windows):**

Git for Windows bundles **Git Credential Manager**. You don't have to set
anything up. The first time you run `git push`, a **GitHub login window pops
open in your browser**. Click **Authorize**, and you're done permanently.

If no window appears, you may be asked to log in inside the terminal itself —
choose "Sign in with your browser" if offered.

**Option A — GitHub CLI (easiest, recommended):**

```bash
gh auth login
```

Answer the questions: GitHub.com → HTTPS → Login with a web browser. It gives
you a code, you paste it in the browser, done. Works for years.

**Option B — Personal Access Token:**

1. GitHub website → your avatar (top right) → **Settings**
2. Scroll to **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)** → tick the **`repo`** checkbox → generate
4. **Copy it immediately** (you'll never see it again)
5. When git asks for a password, paste the **token** instead

**Option C — SSH keys:** more setup, but no password prompts ever again. Look
this up once you're comfortable with the basics.

---

## Part 1 — Getting your project into the terminal

You must be **inside** your project folder. `cd` means "change directory".

```bash
# Mac / Linux / Git Bash
cd Desktop/art

# Windows PowerShell
cd C:\Users\YourName\Desktop\art
```

**The easy way on Windows:** open File Explorer, go *into* your project
folder, then **right-click empty space → "Git Bash Here"**. The terminal opens
already in the right place. Skip `cd` entirely.

Tips:
- **Git Bash paths look different.** `C:\Users\You\Desktop\art` becomes
  `/c/Users/You/Desktop/art` — forward slashes, lowercase drive letter, no colon.
- Type `cd ` then **drag the folder onto the terminal window** — it fills in
  the path for you, correctly converted.
- Press **Tab** to auto-complete names. Type `cd De` then Tab → `cd Desktop/`.
- **Where am I?** → `pwd` (print working directory)
- **What's in here?** → `ls`
- **Go up one level** → `cd ..`

### ⚠️ Windows terminal gotchas

| Problem | Fix |
| --- | --- |
| `Ctrl+V` pastes nothing | Use **Shift+Insert**, or **right-click → Paste** |
| Nothing appears when typing a password | **Normal.** Git hides it completely — no dots, no asterisks. Type it and press Enter. |
| Command seems stuck / can't type | It may be waiting for input. Press **Ctrl+C** to cancel and start over. |
| Want to cancel a long output | Press **q** (if you see a `:` at the bottom) or **Ctrl+C** |
| Terminal is full of old text | Type `clear` and press Enter |

---

## Part 2 — The daily loop

### Step 1: See what changed

```bash
git status
```

This is your best friend. Run it constantly. It tells you:
- **Red** files = changed but not staged
- **Green** files = staged, ready to commit
- Which branch you're on

Read its output every time. It even reminds you of the next command.

### Step 2: Get the latest version from GitHub

```bash
git pull
```

Do this **before** you start working, especially if you edited files on the
GitHub website or on another computer. It downloads changes so you don't
conflict with yourself.

### Step 3: Stage your changes

```bash
git add index.html          # one specific file
git add arts/               # a whole folder and everything in it
git add .                   # EVERYTHING that changed
```

`git add .` is the common one. It's safe as long as you're in the project
folder.

### Step 4: Commit (save locally)

```bash
git commit -m "Add aurora sketch"
```

The message goes in quotes. Write it like a command: *"Add aurora sketch"*,
*"Fix blank screen on Aurora card"*. Future-you will thank present-you.

### Step 5: Push (upload to GitHub)

```bash
git push
```

Refresh the GitHub page. Your files are there. 🎉

**Full sequence:**

```bash
git pull
git status
git add .
git commit -m "Describe what you did"
git push
```

---

## Part 3 — Folders specifically (your question)

### Yes, folders work. Two rules:

**Rule 1 — A folder must contain at least one file.**

Git tracks *files*, not folders. It remembers a folder only because a file
inside it is tracked. An empty folder is invisible to git.

```bash
mkdir arts                  # create the folder
# put at least one real file inside it
git add arts/
git commit -m "Add arts folder"
git push
```

**Rule 2 — Want an empty placeholder folder? Add a `.gitkeep`.**

```bash
mkdir -p arts/sketches      # -p makes parent folders as needed
touch arts/sketches/.gitkeep   # empty file (Mac/Linux/Git Bash)
# Windows PowerShell instead:
# New-Item arts\sketches\.gitkeep -ItemType File

git add arts/sketches/.gitkeep
git commit -m "Reserve sketches folder"
git push
```

`.gitkeep` isn't magic — it's just a convention. Any file name works
(`README.md`, `placeholder.txt`). The dot makes it hidden-ish and pointless
otherwise, which is why everyone uses it.

Nested folders are fine to any depth: `arts/aurora/v2/sketch.js` — git stores
the whole path.

---

## Part 4 — Checking your work

```bash
git status              # what's changed right now?
git log --oneline       # history of commits, one line each
git ls-files            # every file git is currently tracking
git ls-files | grep arts   # just the ones in arts/ (Mac/Linux)
git diff                # show the exact lines you changed
```

That `git ls-files` is how you confirm a folder really got committed. If it's
not in that list, it's not on GitHub.

---

## Part 5 — When things go wrong

**"nothing to commit, working tree clean"**
→ You already committed, or git didn't notice a change. Run `git status`. If
it's clean, you probably just need `git push`.

**"failed to push some refs"**
→ GitHub has changes you don't have. Run `git pull` first, then `git push`.

**"Permission denied" / "Authentication failed"**
→ Your login expired or you used your account password. Redo Part 0.

**"src refspec main does not match any"**
→ Your branch is named `master`, not `main` (or vice versa). Check with
`git branch`, then `git push origin main` (or `master`).

**Committed something by mistake, before pushing:**
```bash
git reset --soft HEAD~1     # undo commit, keep your files
```

**Pushed something embarrassing:** just delete or edit the file, commit, push
again. History stays, but the current version is clean.

**Want to throw away ALL local changes and start fresh:**
```bash
git checkout .              # destructive! discards uncommitted edits
```

---

## Part 6 — Branches (the next level)

A branch is a parallel version of your project. `main` is the "real" one.

```bash
git branch                  # list branches, * marks current
git branch my-experiment    # create one
git checkout my-experiment  # switch to it
git checkout main           # switch back
```

Work on a branch, then merge it into `main` with a **Pull Request** on GitHub.
That's how teams work, and it's why this session runs on a branch called
`arena/01a0ae9a-art` instead of editing `main` directly.

---

## Practice exercise (10 minutes, no risk)

```bash
mkdir ~/git-practice && cd ~/git-practice
git init                                  # make this folder a git repo
echo "hello" > notes.txt                  # create a file
mkdir drawings && echo "art" > drawings/sketch.txt
touch drawings/.gitkeep
git add .
git commit -m "First commit"
git ls-files                              # see both files tracked
```

Then make a repo on GitHub (leave it empty — no README), and:

```bash
git remote add origin https://github.com/YOURNAME/git-practice.git
git branch -M main
git push -u origin main
```

The `-u` means "remember this, so next time I can just type `git push`".

---

## Quick reference card

| Command | Meaning |
| --- | --- |
| `pwd` | where am I |
| `ls` / `dir` | list files |
| `cd <folder>` | go into folder |
| `cd ..` | go up |
| `mkdir <name>` | make folder |
| `touch <file>` | make empty file |
| `git status` | what changed |
| `git pull` | download from GitHub |
| `git add .` | stage everything |
| `git add <path>` | stage one file/folder |
| `git commit -m "msg"` | save snapshot locally |
| `git push` | upload to GitHub |
| `git log --oneline` | see history |
| `git ls-files` | list tracked files |

**The golden rule:** commit often, push often. Small commits are easy to undo;
one giant commit at the end of a week is a nightmare.
