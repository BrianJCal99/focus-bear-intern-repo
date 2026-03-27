# Writing Meaningful Commit Messages

## What makes a good commit message?

From what I’ve learned, a good commit message is clear, short, and explains *why* the change was made, not just *what* was changed.

The best commit messages usually:
- Have a short summary (under 50 characters)
- Use present tense (e.g., "fix bug" instead of "fixed bug")
- Optionally include more details if needed

When I looked at open-source projects like React and Node.js, I noticed that good commit messages are very specific. Instead of saying “updated code”, they say things like “fix memory leak in event handler”, which makes it immediately clear what was changed.

## How does a clear commit message help in team collaboration?

Clear commit messages make it much easier to work in a team. Anyone looking at the repo can quickly understand what changes were made without needing to read all the code.

They help with:
- Reviewing pull requests
- Debugging issues later
- Understanding the history of a feature

Overall, they save time and reduce confusion because everything is explained upfront.

## How can poor commit messages cause issues later?

Bad commit messages like “fixed stuff” or “update” don’t give any useful information. This makes it harder to figure out what was changed, especially when looking back at older commits.

This becomes a problem when:
- Debugging using git log or git bisect
- Revisiting code after some time
- Working in a team where others rely on your commits

Poor messages force you to read the actual code to understand the change, which slows everything down.

## My takeaway

At first, writing good commit messages didn’t seem that important, but now I understand that they help keep the project organized and easier to maintain. It’s a simple habit that improves collaboration and makes debugging much easier later on.