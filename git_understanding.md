# Git Concepts: Staging vs Committing

## Difference between staging and committing

Staging and committing are two separate steps in Git that control how changes are saved.

Staging (`git add`) is where I select which changes I want to include in the next commit. It doesn’t actually save anything permanently — it just prepares changes.

Committing (`git commit`) is when those staged changes are officially recorded in the repository history. This is the point where the changes become part of the project timeline.

**In simple terms:**
- Staging = selecting changes  
- Committing = saving those selected changes  

---

## Why Git separates these two steps

Git separates staging and committing to give more control over what goes into each commit.

When working on a file, I might make multiple changes that don’t all belong together. Instead of committing everything at once, staging lets me pick only the relevant parts for a clean, meaningful commit.

This is especially useful in real development workflows where commits should be small, clear, and focused rather than messy or unrelated.

---

## What I observed during the experiment

When I modified a file and staged it:
- Running `git status` showed the file under **"Changes to be committed"**

When I unstaged it:
- It moved back to **"Changes not staged for commit"**

When I committed:
- The changes were saved in the repo history and no longer showed up in `git status`

Since I use VS Code and Git integration (and sometimes Git Bash), I noticed this visually as well:
- Staged changes appear in a separate section before committing  
- After committing, everything resets to a clean state  

---

## When I would stage changes without committing

I’d stage changes without committing in situations like:

- When I’ve made multiple edits but want to commit them in smaller logical chunks  
- When I’m still working but want to prepare specific changes for a clean commit later  
- When reviewing my changes before committing (like a checkpoint)  
- When collaborating, to make sure each commit is meaningful and easy for others to understand  

---

## Personal reflection

Since I already use VS Code heavily for development, the staging area makes a lot of sense in practice. It gives me control to keep my commits clean, especially when working on frontend features where one file can have multiple unrelated changes.

It also fits well with team workflows, because clear commits make code reviews and debugging much easier.