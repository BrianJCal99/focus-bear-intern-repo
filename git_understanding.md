# Merge Conflicts & Conflict Resolution

What caused the conflict?

The merge conflict occurred because the same file was modified in two different branches. I created a feature branch and edited a specific section of a file. Then I switched back to the main branch and made a different change to the exact same part of that file. When trying to merge the feature branch back into main, Git was unable to automatically decide which change should be kept, since both branches had conflicting edits in the same lines.

How did you resolve it?

I used my Git desktop client to handle the conflict. The tool highlighted the conflicting sections and showed both versions of the code (from main and from my feature branch). I manually reviewed the differences and decided which changes to keep. In some cases, I combined both changes to preserve functionality.

After editing the file to resolve the conflict, I marked it as resolved in the client and completed the merge. Finally, I committed the resolved version and pushed the changes to GitHub.

What did you learn?

This exercise helped me understand that merge conflicts are a normal part of working with Git, especially when multiple changes happen in the same area of a file. I learned how important it is to frequently pull updates from the main branch to reduce the likelihood of large conflicts.

I also realized the value of making smaller, more focused commits and communicating with teammates when working on shared files. As someone working on frontend and mobile features, where UI components often overlap, resolving conflicts carefully is critical to avoid breaking functionality.

Overall, I now feel more confident identifying and resolving merge conflicts using both Git tools and manual review.