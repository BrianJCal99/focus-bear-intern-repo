# Advanced Git Commands & When to Use Them

## Reflection

### git checkout main -- <file>

This command lets me restore a specific file from the `main` branch without touching anything else in my working directory. When I tested it, I modified a file and instead of undoing everything, I was able to just bring back that one file to its original state.

In a real project, I can see this being useful when I accidentally mess up a file or go too far with changes and just want to discard it without affecting the rest of my work. Especially in larger projects, this feels safer than doing a full reset.

What surprised me was how precise it is. I always thought reverting changes meant losing everything, but this showed me I can be very selective.


### git cherry-pick <commit>

This command applies a specific commit from another branch onto the current branch without merging everything. When I tried it, I created a branch, made a couple of commits, and then picked just one of them to bring into `main`.

In real projects, this feels really useful when there’s a bug fix or small feature that needs to go into production quickly without bringing in unfinished work from a branch. It’s like copying just the exact change you need.

What surprised me here was that it can sometimes cause conflicts, which makes sense but I didn’t expect it at first. It’s not just a simple copy-paste — Git still has to reconcile differences.


### git log

This command shows the commit history of the repository. When I used it, I could see all my previous commits, their messages, and how the project evolved over time.

In a real project, this is important for understanding what changes were made, when they happened, and why. It would also help when debugging, especially if something breaks and I need to trace back to a specific change.

What stood out to me is how much context good commit messages provide. Without them, the log isn’t nearly as useful.


### git blame <file>

This command shows who last modified each line in a file and when. When I tested it, I could see exactly which commit changed each line and who made that change.

In a team environment, this would be really helpful for tracking down why something was written a certain way or figuring out who to ask about a specific piece of code. It’s not really about blaming someone, but more about understanding the history behind the code.

What surprised me was how detailed it is. It literally breaks down the file line by line, which makes it powerful but also a bit overwhelming at first.


## Overall Thoughts

These commands made Git feel a lot more flexible than I originally thought. Before this, I mostly saw Git as just committing and pushing changes, but now it feels more like a tool for managing and navigating history in a really controlled way.

The biggest takeaway for me is that in real-world projects, especially with multiple developers, you don’t always want to take big actions like merging entire branches. Sometimes you just need small, precise changes, and these commands make that possible.