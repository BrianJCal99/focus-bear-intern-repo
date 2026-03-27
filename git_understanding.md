# Branching & Team Collaboration

## Reflection

### Why is pushing directly to main problematic?

Pushing directly to the main branch is risky because it can affect the stability of the entire project. Main is usually meant to contain working, production-ready code, so any untested or incomplete changes can break things for everyone else. It also removes the opportunity for code review, which means mistakes or bad practices might go unnoticed. In a team setting, this can slow people down and create unnecessary issues.

### How do branches help with reviewing code?

Branches make it easier to work on changes without affecting the main codebase. I can create a separate branch for a feature or fix, and once it's done, open a pull request. This allows others to review my code, give feedback, and suggest improvements before it gets merged into main. It adds an extra layer of quality control and helps with collaboration because everyone can see and understand the changes being made.

### What happens if two people edit the same file on different branches?

If two people edit the same file on different branches, Git will try to merge the changes automatically. If the edits overlap or conflict, a merge conflict happens. This means Git cannot decide which version to keep, so it has to be resolved manually. From what I understand, this is a normal part of working in teams, and it just requires communication and careful handling to make sure the final code works correctly.

### Personal reflection

When I created a branch and made changes, then switched back to main, I noticed that none of my changes were there. That made it clear how branches keep work isolated. It felt much safer working this way instead of directly on main. Since I am already using tools like VS Code and Git integrations, this workflow fits naturally into how I work and makes collaboration more manageable.