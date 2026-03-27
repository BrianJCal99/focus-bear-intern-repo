## Debugging with git bisect

### What does `git bisect` do?

`git bisect` is a debugging tool that helps identify the exact commit where a bug was introduced. It works by using a binary search approach across the commit history. Instead of checking every commit one by one, Git automatically narrows down the range by repeatedly asking whether a given commit is “good” (no bug) or “bad” (bug present). This makes the process much faster, especially in projects with a large number of commits.

---

### My Test Scenario

To understand how it works, I created a simple test repository and made a series of commits. At some point, I intentionally introduced a bug into the code. After that, I continued making a few more commits so the bug was not immediately obvious from the latest changes.

I then ran `git bisect` and marked:
- The current commit as **bad**
- An earlier commit (before the bug existed) as **good**

From there, Git automatically checked out commits in between. For each one, I tested the code and marked it as good or bad. After a few steps, Git identified the exact commit where the bug was introduced.

What stood out to me was how efficient the process was. Even with multiple commits, it only took a few iterations to find the issue.

---

### When would I use it in a real-world situation?

I would use `git bisect` when:
- A bug appears and I’m not sure when it was introduced
- The project has a long commit history, making manual checking impractical
- The issue isn’t obvious just by looking at recent changes
- I need a reliable and systematic way to track down regressions

This would be especially useful in team environments where multiple people are committing changes, and the source of a bug isn’t immediately clear.

---

### How does it compare to manually reviewing commits?

Compared to manually reviewing commits, `git bisect` is significantly more efficient and less error-prone.

Manually:
- Requires checking commits one by one
- Can take a long time if there are many commits
- Depends heavily on memory and assumptions about where the bug might be

With `git bisect`:
- Uses a binary search approach, reducing the number of checks needed
- Provides a structured and logical workflow
- Removes guesswork and speeds up debugging

Overall, `git bisect` feels like a much smarter and more scalable approach. Instead of randomly searching for the problem, it systematically narrows it down, which makes debugging more controlled and less frustrating.