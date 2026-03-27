# Agile Ceremonies & Team Collaboration

## Research & Learn

### Main Agile Ceremonies and Their Purpose

**Daily Stand-ups**  
Daily stand-ups are short meetings (usually 10–15 minutes) where team members share what they worked on yesterday, what they’re working on today, and any blockers. The goal is to keep everyone aligned and quickly identify issues without going into deep discussions.

**Sprint Planning (Scrum) vs. Continuous Prioritization (Kanban)**  
In Scrum, sprint planning happens at the start of a sprint where the team commits to a set of tasks to complete within a fixed timeframe. It provides structure and clear goals.  
In Kanban, there is no fixed sprint. Instead, tasks are continuously prioritized and pulled into work as capacity allows. This offers more flexibility and is better suited for ongoing or unpredictable work.

**Retrospectives**  
Retrospectives are held at the end of a sprint (or periodically in Kanban) to reflect on what went well, what didn’t, and how the team can improve. The focus is on continuous improvement and team health.

**Backlog Refinement**  
Backlog refinement (or grooming) is when the team reviews upcoming tasks, clarifies requirements, and ensures items are ready for development. This helps reduce ambiguity and improves efficiency during execution.

---

### Asynchronous Collaboration & Time Zones

Agile teams working across time zones rely heavily on asynchronous communication. This includes tools like Slack, Jira, GitHub, and documentation to share updates without requiring everyone to be online at the same time.

Key practices include:
- Writing clear and detailed task descriptions
- Recording updates instead of relying only on meetings
- Using comments and threads to track decisions
- Keeping documentation up to date

This allows team members to pick up work and stay informed regardless of their working hours.

---

## 📝 Reflection

### How Agile Ceremonies Help with Communication and Alignment

Agile ceremonies create structured opportunities for the team to stay aligned. Stand-ups ensure daily visibility, planning sessions set expectations, and retrospectives encourage continuous improvement. Without these, communication can become fragmented, especially in remote teams.

They also help surface blockers early, clarify priorities, and ensure everyone is working toward the same goals.

---

### Most Important Ceremony for My Role

As a frontend and mobile developer working with React and React Native, the **daily stand-up** is the most important ceremony for me.

Since I frequently collaborate with UI/UX and QA, the stand-up helps me:
- Stay updated on design changes and testing feedback
- Communicate blockers early (e.g., API issues, unclear requirements)
- Align my work with what others are doing

It ensures I don’t work in isolation and helps keep development moving smoothly.

---

## Task

### Stand-up Observation (Focus Bear Mobile Team)

From the stand-up notes, updates were shared in a concise and structured way, focusing on progress, blockers, and next steps.

Key observations:
- Team members reported **progress on onboarding milestones**, showing steady ramp-up for new developers.
- Updates highlighted **real issues from testing**, such as bugs in geofencing and iOS soft blocking.
- There was clear visibility into **cross-team dependencies**, especially backend delays affecting frontend/mobile work.
- Discussions stayed high-level, while deeper technical issues were implied to be handled outside the stand-up.

This reflects a well-run stand-up where the goal is alignment, not problem-solving.

---

### Retrospective Insights (Inferred from Notes)

Although this was a stand-up, several retrospective-style insights can be drawn:

- **Early testing is valuable**: Initial testing uncovered critical bugs, reinforcing the importance of testing early in development.
- **Real device testing is necessary**: Limitations in iOS testing due to lack of physical devices created gaps in validation.
- **Backend dependencies are a recurring bottleneck**: Feature delays were caused by incomplete backend work.
- **Shift-left testing approach**: Moving testing to the develop branch helps catch integration issues earlier.

These insights suggest the team is actively improving quality and adapting processes.

---

### One Change to Improve Collaboration

One change I can make is to **proactively communicate blockers and dependencies earlier, especially backend-related ones**.

For example:
- If a feature depends on backend APIs, I will confirm readiness earlier instead of discovering issues during implementation.
- I will document assumptions clearly in tickets when backend behavior is unclear.
- I will flag risks during stand-up instead of waiting until they become blockers.

This will help reduce delays, improve coordination with backend developers, and keep progress smoother across the team.