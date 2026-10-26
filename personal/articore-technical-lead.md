# Technical Lead – Articore (Lead Fullstack Engineer, Artist team)

Private prep notes. This folder is git-ignored: never commit it.

- [1. The job description](#1-the-job-description)
- [2. Honest fit check: where you are strong, where you will be probed](#2-honest-fit-check)
- [3. The 30-minute general / resume round: how it runs](#3-the-30-minute-general--resume-round)
- [4. Your introduction (60 seconds and 2 minutes)](#4-your-introduction)
- [5. Questions and answers](#5-questions-and-answers)
- [6. Questions to ask them](#6-questions-to-ask-them)
- [7. Stories to prepare (fill in before the call)](#7-stories-to-prepare)
- [8. Fix these on the resume before you send it again](#8-fix-these-on-the-resume)
- [9. What to revise in the question bank](#9-what-to-revise-in-the-question-bank)

Lines marked **[fill]** need a real fact from you. Never invent a number in the interview: an interviewer who asks "how did you measure that?" will find out in one follow-up.

---

## 1. The job description

**Role:** Lead Fullstack Engineer (Team Lead – Fullstack Engineer), Artist team
**Company:** Articore (Redbubble, TeePublic, Dashery, Frankly Wearing)
**Location:** Gurugram, with IST overlap with U.S. time zones

**About the company (from the recruiter):** Articore, founded in 2006, is a global ecommerce / marketplace company that owns Redbubble and TeePublic, platforms where independent artists sell their designs on apparel, accessories and home décor. Redbubble alone has a catalogue of more than 40 billion SKUs. Articore is expanding engineering in Gurugram. Frankly Wearing is part of the Articore Group and combines startup speed and ownership with the resources of an international creator-commerce business.

- Articore – https://articore.com/
- Redbubble – http://www.redbubble.com
- TeePublic – https://www.teepublic.com/

**The team:** The Artist team owns the artist-facing experience across Redbubble and TeePublic: onboarding, product uploads, artist websites, self-service tools, communications, and tax and royalty systems.

**Stack:** Ruby on Rails / Go, React, TypeScript.

**Key responsibilities**
- **Technical leadership:** lead engineering initiatives, guide technical design and implementation, keep work aligned with engineering standards and best practices.
- **Fullstack development:** design, develop, test and deploy scalable applications using Ruby on Rails/Go, React and TypeScript.
- **Architecture and system design:** contribute to architectural decisions, system improvements, and the migration of components between monolithic and microservices architectures.
- **Team mentorship:** mentor and support engineers, do code reviews, encourage knowledge sharing, promote engineering best practices.
- **Project ownership:** own technical initiatives from requirement gathering and solution design through development, testing and deployment.
- **Cross-functional collaboration:** work with Product, Engineering, Legal and other stakeholders to turn business requirements into technical solutions.
- **Platform maintenance:** performance, reliability, monitoring, documentation and continuous improvement of existing systems.
- **Innovation:** explore AI-powered development tools, modern engineering practices and new technologies to improve productivity and quality.

**Required skills and experience**
- Strong backend experience with Ruby on Rails and/or Go.
- Hands-on React and TypeScript, component-driven front-end development.
- Experience across Rails controllers, ERB templates and modern React components.
- Proven technical leadership, mentoring and driving initiatives.
- Strong understanding of microservices and monolithic architectures.
- System design, architecture discussions and technical decision-making.
- Independently owning and delivering complex features end to end.
- Strong testing, debugging, code quality and engineering practice.
- Collaboration with global teams across time zones.
- Excellent communication, problem-solving and stakeholder management.
- Hands-on use of AI-assisted development tools.

**Reading between the lines (what they actually need)**

| JD phrase | What it really means | Your evidence |
| --- | --- | --- |
| "Rails controllers, ERB templates **and** modern React" | A Rails monolith with server-rendered pages, gradually moving parts to React. Strangler-fig migration is daily life. | Xceedance: .NET MVC with server-rendered views plus jQuery, then Angular. BOLD: .NET MVC/Web API plus React. Same pattern, different framework. |
| "migration between monolith and microservices" (both directions!) | They have probably pulled things out *and* pulled some back in. They want judgement, not microservices fandom. | BOLD (Zety, My Perfect Resume): microservices with .NET Core. Thales: Go services on Kubernetes. Say when you would *not* split. |
| "tax and royalty systems", "Legal" | Money, compliance, audit trails, correctness over speed, idempotency, reconciliation. | Xceedance insurance domain (accounts receivable, underwriting workflow): regulated, money-related, audit-heavy. |
| "artist onboarding, product uploads" | Large image uploads, async processing pipelines, background jobs, retries, S3-style storage, moderation. | [fill: any upload / file-processing / background job work at BOLD or Thales] |
| "IST overlap with U.S. time zones" | Late evenings several days a week. They will ask if you are OK with it. | Have a clear, honest answer (see 5.10). |
| "AI-assisted development tools" | They want a practical, measured user, not hype. | You actually built this interview-prep app with AI agents: real example with real lessons (see 5.9). |

---

## 2. Honest fit check

Hiring managers decide in the first ten minutes whether your story is coherent. Know your weak spots better than they do.

### Strong matches (lead with these)
1. **Go + React + TypeScript in production** at Thales (FlytEDGE), on Kubernetes and Azure. That is two thirds of their stack.
2. **Consumer web products at scale before**: Zety and My Perfect Resume at BOLD are high-traffic, conversion-driven consumer products. Articore is also consumer marketplace e-commerce. This is your most underrated card: use it.
3. **Lead experience since 2022-03** (about 4.5 years by now) with mentoring, code review and standards.
4. **Quality and testing**: unit tests, Selenium with JavaScript, BrowserStack Automate and Percy (visual regression). Very relevant for a marketplace with many page variants.
5. **Observability**: Datadog. "Platform maintenance: performance, reliability, monitoring" is literally in the JD.
6. **Product analytics**: Google Analytics (with the Individual Qualification) and MS Clarity. Rare for a backend-leaning lead; it shows you think about users and business outcomes.
7. **Monolith-to-services and server-rendered-to-SPA experience**: .NET MVC + jQuery to Angular/React. The same migration they are running from ERB to React.
8. **Side product**: MyLiveCV (NestJS, Docker, React, Tailwind, Browserless, Cypress). Proof that you build and ship end to end on your own.

### Gaps they will probe (prepare, do not hide)
| Gap | Risk | How to handle it |
| --- | --- | --- |
| **No Ruby on Rails** | High. Rails is listed first. | Do not pretend. Say: "I have not shipped Rails in production. I have shipped the same architecture: MVC with server-rendered views (ASP.NET MVC with Razor at Xceedance and BOLD), ORMs, migrations, background jobs. Rails is convention over configuration, which makes it faster to learn than to master. I have started [fill: what you did, e.g. built a small Rails app with a controller, ERB view, ActiveRecord model and a Sidekiq job]." **Do that small project before the interview** (2 evenings). It turns a gap into a story. |
| **Resume reads like a skills list**, no outcomes or numbers | Medium. The Thales section is a list of tools, not achievements. The interviewer will ask "what did *you* do?" | Prepare 5 to 6 STAR stories with real numbers (section 7). |
| **"English: Limited Working"** on the resume | High for a role that works daily with U.S. and Australian teams. Some screeners stop reading here. | Change it to the level you actually have (if you can run this interview in English, that is "Professional Working" at least). In the call, be calm and structured; that is the real proof. |
| **Team size and scope of the lead role are not stated** | Medium. "Technical Lead" means very different things. | Know your numbers: team size, who reported to you, what you decided alone vs with the architect/manager. [fill] |
| **Domain switch: avionics IFE to creator e-commerce** | Low to medium. "Why leave aerospace?" | You have done e-commerce/consumer before (BOLD). Frame it as returning to consumer products with what you learned about reliability in a regulated domain. |
| **Started at Xceedance 2017-01, degree to 2017** | Low. A sharp interviewer may ask if you joined before finishing. | Have a one-line answer ready: [fill: e.g. "joined in the final semester, degree completed in 2017"]. |
| **Only Azure, they may be on AWS** | Low. | Concepts transfer: "I have run AKS, container registries, managed databases and monitoring on Azure; the AWS equivalents map one to one, and I'd learn the naming." Do not claim AWS experience. |

---

## 3. The 30-minute general / resume round

Usually a hiring manager, an engineering manager or a senior engineer. It is a **screen of story, motivation, depth and communication**, not a coding round. Typical shape:

| Minutes | What happens | What they are scoring |
| --- | --- | --- |
| 0 to 3 | Small talk, intro of the role | Are you calm and clear? |
| 3 to 6 | "Tell me about yourself" | Is the story coherent? Does it point at this role? |
| 6 to 20 | Resume deep-dive: current project, your role, one or two technical decisions, a leadership situation | Depth: can you go two levels below a buzzword? Ownership: "I" vs "we". |
| 20 to 25 | Motivation, fit, logistics (US overlap, location, notice period, compensation) | Real interest, no red flags |
| 25 to 30 | Your questions | Curiosity and seniority |

**Rules for this round**
- Answers of **60 to 90 seconds**, then stop. Let them pull more. Long monologues are the most common failure in this round.
- Structure every story: **situation in one sentence, what you did, the result with a number, what you learned.**
- Say **"I"** for your decisions and **"we"** for team delivery. Leads who only say "we" sound like passengers; leads who only say "I" sound like bad leads.
- Every technology you name, be ready for "why that and not X?" and "what went wrong with it?".
- It is fine to say "I don't know, here is how I'd find out". It is not fine to bluff: in a 30-minute call a single bluff is the thing they remember.

---

## 4. Your introduction

### 60-second version
> "I'm Anubhav, a Technical Lead with about [fill: 9.5] years in full-stack engineering. For the last four and a half years I've led a team at Thales on FlytEDGE, a connected, cloud-based in-flight entertainment platform. We build it with React and TypeScript in an Nx monorepo, Go and Python services on Kubernetes in Azure, GitLab CI/CD and Datadog. I own [fill: design reviews, code quality standards, test automation with Selenium and BrowserStack, mentoring N engineers].
> Before that I spent almost three years at BOLD on Zety and My Perfect Resume, consumer products with large traffic, built with .NET Core microservices and React, and before that insurance software at Xceedance.
> What draws me to Articore is that it brings together the consumer e-commerce side I enjoyed at BOLD and the Go, React and TypeScript stack I lead today, and the Artist team's work on onboarding, uploads, and royalties is exactly the kind of end-to-end ownership I like."

### 2-minute version (if they say "take your time")
Add one concrete achievement per company, with a number:
- **Thales:** [fill: e.g. "introduced visual regression with Percy and cross-browser runs on BrowserStack; release regressions in the UI dropped from X to Y" or "brought Datadog APM and alerts in; we cut incident detection time from X to Y"].
- **BOLD:** [fill: e.g. "improved page performance / fixed a conversion-impacting bug / migrated a module to .NET Core"].
- **Xceedance:** [fill: e.g. "built the accounts receivable module; worked directly with business analysts on requirements"].
End with: "I'm now looking for a role where I lead a team on a product with real users at large scale, and where the stack is the one I'm strongest in."

**Do not** read the skills list aloud. Nobody remembers a list of 20 tools; they remember one story.

---

## 5. Questions and answers

The answers are **frameworks in your voice**. Replace every [fill] with your truth and rehearse aloud until they take about 60 to 90 seconds.

### 5.1 About you and motivation

**Q1. Tell me about yourself.**
Use section 4. End with why this role.

**Q2. Why are you looking for a change after four years at Thales?**
> "I've learned a lot at Thales: reliability, working in a regulated domain, leading a team through [fill]. The product cycle there is tied to aircraft and airline programmes, so releases are slower and heavily gated. I want to get back to a consumer product where I can see the effect of a change on real users within days, and where scale is measured in users and transactions. Articore gives me that with a stack I already lead."
Never criticise the current employer, the manager or the pay.

**Q3. Why Articore? What do you know about us?**
> "Articore runs creator marketplaces: Redbubble and TeePublic, where independent artists upload designs and sell them on physical products, made on demand. What interests me is the two-sided nature: buyers on one side, and on the other side artists who depend on you for income. The Artist team is the side that runs their business: onboarding, uploading designs, their shop pages, and getting paid correctly through tax and royalties. That's a product where correctness and trust matter as much as speed. And the stack, Go, React and TypeScript with a Rails core, is close to what I lead today."
Before the call: open Redbubble and TeePublic, create an artist account if possible, and try the upload flow. Mention one concrete observation ([fill]). It is the single cheapest way to stand out.

**Q4. Why this role and not a pure engineering manager role or an architect role?**
> "I want to stay hands-on. I'm at my best when I design with the team, write some of the critical code, review most of it, and grow the people around me. A role with 30 to 50 percent coding and the rest design, reviews and mentoring is the right balance for me."

**Q5. Where do you see yourself in 3 to 5 years?**
> "Leading a larger area, either as a principal-level engineer setting technical direction across teams, or as an engineering manager for a few teams. I'd decide based on where I add more value here. In both cases I want to be the person who can take a fuzzy business problem, such as 'artists in a new country need to get paid correctly', and turn it into a working system."

**Q6. What do you know about the business model, and how does engineering affect it?**
Print-on-demand marketplace: artists upload once, the platform lists the design on many products, third-party fulfillers print and ship, the artist earns a margin or royalty. Engineering levers: catalogue scale and search, page speed and conversion, upload and listing quality, fraud and IP moderation, payout correctness, tax compliance. Tie in: "At BOLD I saw how page performance and funnel analytics drive conversion; I'd bring the same measurement habit."

### 5.2 Current role: Thales and FlytEDGE (expect 8 to 12 minutes here)

**Q7. Walk me through FlytEDGE. What is the architecture?**
Prepare a 90-second whiteboard version you can say without a whiteboard:
> "FlytEDGE is a connected in-flight entertainment platform. Passengers use the cabin system or their own devices to browse and stream content. There are two halves: the onboard side, which has to work with intermittent or no connectivity, and the cloud side on Azure, where airlines manage content and configuration and where telemetry comes back. The front end is React and TypeScript in an Nx monorepo [fill: number of apps and libs]. Services are written in Go and Python, packaged with Docker, deployed on Kubernetes with GitLab CI/CD. We monitor with Datadog."
[fill: what exactly your team owns; draw the 4 to 6 boxes on paper the night before.]
Expected follow-ups: how data syncs between aircraft and cloud (store-and-forward, retries, idempotency), how you deploy to aircraft safely, what happens when the connection drops. The WebSockets & Real-time topic in this repo has answers on intermittent links.

**Q8. What exactly do you do as Technical Lead? How big is the team?**
> "I lead a team of [fill: N] engineers [fill: front-end and back-end, plus QA]. I own the technical design for our area, I break features into deliverable pieces with the product owner, I review [fill: most] pull requests, I set standards for testing and code quality, and I still write code, mainly [fill]. I also handle the escalations: production issues, cross-team dependencies."
They want: scope, size, and the split between people, design and code.

**Q9. Tell me about a technical decision you made and its trade-offs.**
Pick a real one. Good candidates from your resume:
- Moving to an **Nx monorepo** (shared libs, affected builds, module boundaries) vs separate repos.
- Choosing **Go** for a service over Node or Python.
- Introducing **BrowserStack Percy** visual tests vs only functional Selenium tests.
Structure: context, options considered (at least two), criteria, decision, the downside you accepted, how it turned out with a number, what you'd change.
Example skeleton for Nx:
> "We had [fill: N] front-end apps sharing components by copy-paste. Releasing a shared change meant N PRs. I proposed an Nx monorepo with shared UI and data-access libraries and module-boundary lint rules. The cost was a migration and a slower CI at first; we solved that with affected-only builds and caching. Result: [fill: shared change now one PR, CI time X]. What I'd do differently: [fill]."

**Q10. Why Go for your services? Where would you not use it?**
> "Go gives us small static binaries, fast start-up, low memory on Kubernetes, simple concurrency with goroutines and a standard library that covers HTTP well. It's easy for new engineers to read. I wouldn't pick it for heavy data science or ML work, where Python's ecosystem wins, or for a CRUD admin app where a framework like Rails or Django gives you forms, ORM and admin for free. That's actually why I respect Rails for a product like yours: it's very productive for CRUD-heavy, form-heavy domains like artist self-service tools."
This answer bridges to the Rails gap without being asked.

**Q11. How do you test? Tell me about your automation setup.**
> "Unit tests for logic in Go and in the React code, component tests for UI, and end-to-end tests with Selenium in JavaScript for the critical journeys, running on BrowserStack Automate across browsers and devices. Percy compares screenshots against approved baselines, so layout regressions are caught in review instead of by users. The pipeline in GitLab runs fast tests on every merge request and the slower cross-browser suite [fill: nightly or before release]."
Follow-ups to expect: flaky tests (quarantine, root causes: waits, test data, animations), the test pyramid, what you do *not* automate, contract tests between services. All in the Software Testing topic.

**Q12. How do you use Datadog? Tell me about an incident.**
Prepare one real incident story: detection (alert or user report), investigation (dashboards, APM trace, logs, the deploy marker), root cause, fix, follow-up (alert added, runbook, test). [fill]
> "The most useful thing I pushed was unified tagging, env, service and version, so a latency spike could be tied to a deploy in one click."
Then: "And I'd add SLO-based alerts on user-facing journeys instead of CPU alerts." The Datadog topic covers all of this.

**Q13. What is the hardest bug you have fixed recently?**
[fill] Structure: symptom, why it was hard (intermittent, only in production, only on one browser, only on the aircraft network), how you narrowed it down, the fix, the prevention.

**Q14. What would your team say is your biggest strength and your biggest weakness as a lead?**
Strength: [fill: e.g. "I unblock people fast and explain the why behind decisions"].
Weakness, real but managed: e.g. "I used to take the hard tickets myself instead of delegating; it made me a bottleneck during [fill]. Now I pair on them with someone more junior, which is slower that week and much faster after." Avoid fake weaknesses ("I work too hard").

**Q15. What did you get the Certificate of Recognition for in 2022?**
It is on your resume, so expect the question. [fill: one sentence: what, impact]

### 5.3 BOLD: Zety and My Perfect Resume

**Q16. What did you build at BOLD?**
> "I worked on Zety and My Perfect Resume, online resume and portfolio builders used by [fill: scale, if you can share] users. Stack: .NET Core microservices, React with TypeScript, MS SQL. I [fill: owned the builder editor / template rendering / PDF export / account and payment flows], fixed production issues raised by customers, and improved performance on [fill]."

**Q17. That was consumer e-commerce with conversions. What did you learn that applies here?**
> "That small front-end details move money: page speed, a confusing step in a funnel, a broken button on one browser. We used analytics to find drop-offs and fixed them with data, not opinion. A marketplace like Redbubble has the same dynamics, both on the buyer side and in the artist upload funnel."
Ties to your Google Analytics and Clarity skills.

**Q18. Microservices at BOLD: what worked and what didn't?**
Be honest and balanced. What worked: independent deploys, team ownership. What hurt: [fill: e.g. distributed debugging, shared database coupling, too many small services, versioning APIs]. Lesson: "Split by business capability and data ownership, not by technical layer, and only when a team or scaling need justifies it."

### 5.4 Xceedance and early career

**Q19. Tell me about your first job and what it taught you.**
> "At Xceedance I built insurance software, an underwriting workflow system and an accounts receivable system, with .NET MVC, Angular and MS SQL. I learned two things that still shape me: working directly with business analysts to get requirements right before coding, and that money-related systems need audit trails, reconciliation and careful data handling."
This directly maps to their **tax and royalty** systems. Say so.

**Q20. Your career went .NET to Go and React. Why the change?**
> "I followed the problems, not the language. At Thales the platform runs on Kubernetes with small services, and Go fit that. I see languages as tools; the fundamentals, HTTP, data modelling, testing, observability, carry over. That's how I'll approach Rails too."

### 5.5 Architecture and the monolith / microservices question

**Q21. When would you split a monolith into services, and when would you merge services back?**
> "Split when there is a clear business boundary with its own data, a team that can own it, and a concrete reason: independent scaling, a different release cadence, or isolation of a risky area like payments. Merge back when services are always deployed together, share a database, or a single user request hops through five of them. A well-structured modular monolith is often the best default. For a Rails monolith I'd first draw module boundaries inside it, then extract only where the data and team boundary are already clean, using the strangler-fig pattern: route a slice of traffic to the new service, compare, then cut over."

**Q22. How would you move pages from ERB templates to React without a big-bang rewrite?**
> "Page by page or component by component. Start by mounting React components inside existing ERB pages (islands), with props passed from the controller as JSON. Share a design system so old and new pages look the same. Move the high-value, high-interaction pages first, such as the upload flow, and leave static pages server-rendered. Measure each step: performance, errors, conversion. Keep SEO-critical pages server-rendered or use SSR."

**Q23. How would you design the artist upload flow at their scale?**
Short version for this round (they may save the deep version for system design):
> "The browser uploads the image directly to object storage with a pre-signed URL, so large files never pass through the app servers. The app records an upload with a status. A background worker validates the file, generates previews and product mock-ups, runs moderation and IP checks, then publishes listings. Each step is idempotent and retried, and the artist sees progress. Failures go to a dead-letter queue with alerts. That keeps the web tier fast and makes the heavy part horizontally scalable."

**Q24. Royalties and tax: what matters technically?**
> "Correctness and auditability first. Money as integers in minor units or decimal types, never floats. Every payout traceable to the orders that produced it. Idempotent payment jobs so a retry never pays twice. Reconciliation reports against the payment provider. Tax rules change by country, so keep them configurable and versioned, and involve Legal and Finance in acceptance criteria. Test with real-world edge cases: refunds, partial refunds, currency conversion, chargebacks."

### 5.6 Leadership and mentoring

**Q25. How do you mentor engineers? Give an example.**
STAR: [fill: a junior or mid engineer, what they struggled with, what you did (pairing, design review, giving them ownership of a feature with a safety net), the result (promotion, owned X)].

**Q26. How do you run code reviews?**
> "Small PRs, reviewed within a day. I look first at design and correctness, then tests, then readability; formatting is the linter's job. I ask questions instead of giving orders, and I separate must-fix from suggestions. I also rotate reviewers so knowledge spreads and I'm not the bottleneck."

**Q27. Tell me about a conflict in your team or with another team.**
[fill] Shape: a technical disagreement, you made it about data and criteria rather than people, you agreed on an experiment or a time-boxed spike, you disagreed-and-committed if the decision went the other way.

**Q28. How do you handle an underperforming engineer?**
> "First find out why: skills, unclear expectations, or something personal. I make expectations explicit and written, agree on small goals with frequent feedback, pair with them, and involve my manager early if there is no improvement. I've done this once with [fill: outcome]."

**Q29. How do you balance delivery pressure against technical debt?**
> "I make debt visible: a short list with the cost of each item in business terms, for example 'this flaky test suite costs us a day per release'. Then I negotiate a steady share of capacity, around 15 to 20 percent, plus fixing debt in the area we're already changing. I don't ask for a big rewrite sprint; those rarely get approved and rarely finish."

### 5.7 Quality, reliability, observability

**Q30. How do you make sure what your team ships is reliable?**
> "Layers: tests in the pipeline, feature flags so new code can be switched off, gradual rollout, dashboards and alerts on user-facing symptoms like error rate and latency, and a short post-incident review with action items, without blame."

**Q31. A page on the artist dashboard is slow. How do you investigate?**
> "Measure first: is it the server response or the browser? On the server, APM traces show which span takes the time; usually N+1 database queries, a missing index or a slow external call. In the browser, check bundle size, waterfalls and Core Web Vitals in real-user data. Fix the biggest contributor, measure again, add a guardrail such as a performance budget or an alert."
In Rails terms, N+1 is fixed with `includes` (eager loading). Knowing that one detail is good evidence you've started on Rails.

### 5.8 Front end

**Q32. How do you structure a large React and TypeScript code base?**
> "Feature-based folders, a shared design system, data fetching through one layer (React Query or RTK Query) instead of ad hoc effects, strict TypeScript, and lint rules for module boundaries. In an Nx monorepo: apps are thin, features and UI live in libraries with tags, and CI runs only affected projects."

**Q33. Redux, MUI and Tailwind are on your resume. When would you use each?**
Redux Toolkit for complex shared client state; server state belongs in a cache library. MUI for fast, accessible components in internal tools; Tailwind for custom-branded consumer UI. Mixing both needs care with CSS order and specificity. Covered in the Frontend Tooling & UI topic.

### 5.9 AI-assisted development

**Q34. How do you use AI tools in your work, and how would you bring them to a team?**
> "Daily. I use [fill: Claude Code / Copilot / Cursor] for scaffolding, tests, refactors and explaining unfamiliar code. As a side project I built an interview-prep application largely with AI coding agents: I wrote a rulebook for the agents, ran several in parallel on separate files, and verified their output with validators, tests and by running every code example. The lesson: AI multiplies output, so review and verification become the bottleneck. In a team I'd start with clear guidelines (no secrets in prompts, human review of every change, tests required), pick a few use cases with measurable gains such as test generation and migrations, and measure cycle time and defect rates before and after."
This is a strong, concrete, honest story. Keep it.

### 5.10 Logistics and collaboration across time zones

**Q35. The role needs overlap with U.S. time zones. Are you comfortable with that?**
Decide your real answer before the call. A good answer is specific:
> "Yes. I can overlap [fill: e.g. until 11 pm IST on most days, and occasionally later for incidents or planning]. I'd protect a few overlap hours for meetings and decisions, and push everything else to written, asynchronous communication: design docs, recorded demos, clear PR descriptions."
Ask them about the expected overlap hours and on-call. Do not agree to something you cannot sustain.

**Q36. Have you worked with global teams?**
[fill: Thales teams in France / other countries? BOLD with U.S. product teams?] Mention concrete habits: written decisions, handover notes, overlap windows.

**Q37. You live in Noida; the role is in Gurugram. Is the commute or relocation fine?**
[fill: your answer, and whether the role is hybrid.]

**Q38. Notice period? Current and expected compensation?**
[fill: notice period, buy-out possibility.] For compensation: give a researched range for lead roles in Gurugram at a global product company, anchored on your total compensation, or ask for their band first: "I'd like to understand the band for this role; based on my experience and the market I'm looking at [fill] total." Never give your current number as your target.

### 5.11 Curveballs

**Q39. You have no Rails experience. Why should we hire you over someone who has?**
> "Because the hard part of this role isn't Rails syntax; it's leading a team, designing systems that handle money and scale, migrating a monolith safely, and shipping React and Go, which I do today. Rails is a framework built for productivity and convention; I've already [fill: built X with it], and I learned Go to production level in [fill: months]. I'd rather be hired for judgement and leadership and learn a framework in weeks than the reverse."

**Q40. What's something on your resume that you would explain differently?**
Opportunity to fix the tool list: "My resume lists a lot of tools. What I'm actually proud of is [fill: one outcome]."

**Q41. What would you do in your first 90 days?**
> "First 30 days: learn the product as an artist would, read the architecture and incident history, pair with every engineer, ship a small change to production in week two. Days 30 to 60: own a meaningful feature end to end, and find the top two pain points of the team with data: build times, flaky tests, incident sources. Days 60 to 90: propose and start one improvement with a measurable target, and set up a regular rhythm with Product and the U.S. counterparts."

**Q42. Tell me about a failure.**
[fill] A real one, where you owned the mistake, fixed it and changed a process afterwards. Interviewers distrust candidates without a failure story.

---

## 6. Questions to ask them

Pick 3 or 4. Good questions show you're already thinking like the lead.

1. "What does the Artist team's architecture look like today: how much is still in the Rails monolith, and what has moved to Go services?"
2. "What's the biggest problem the Artist team needs to solve in the next six months?"
3. "How big is the team I'd lead, how is it split between India and the U.S. or Australia, and who are my main counterparts?"
4. "How do tax and royalty changes reach engineering, and how do you test them before they affect artists' payouts?"
5. "How are you using AI-assisted development today, and what would you like the team to do differently?"
6. "What does success look like for this role after six and twelve months?"
7. "How much hands-on coding do you expect from the lead?"
8. "What are the expected overlap hours with the U.S., and how does on-call work?"

Avoid asking about leave or perks in this round.

---

## 7. Stories to prepare

Write each one in 5 lines (situation, task, action, result with a number, lesson). Rehearse aloud. One story can answer several questions.

| # | Story | Use it for | Notes [fill] |
| --- | --- | --- | --- |
| 1 | A technical decision with trade-offs (Nx monorepo, Go service, Percy) | Q9, Q10, Q21 | |
| 2 | A production incident you led | Q12, Q13, Q30 | |
| 3 | Mentoring someone to a clear outcome | Q25, Q28 | |
| 4 | A disagreement or conflict you resolved | Q27 | |
| 5 | A failure and what you changed | Q42 | |
| 6 | A performance or conversion improvement (BOLD or Thales) | Q17, Q31 | |
| 7 | Delivering a complex feature end to end with Product and other teams | Ownership, Q8 | |
| 8 | AI-assisted development in practice (this prep app) | Q34 | Already strong |
| 9 | What the 2022 Certificate of Recognition was for | Q15 | |

Numbers to know cold: team size, years of experience, traffic or users (where shareable), pipeline time, test counts, incident metrics, anything you improved by a percentage.

---

## 8. Fix these on the resume

Blunt, because these will cost you interviews:
1. **"English: Limited Working"** is self-sabotage for a global, U.S.-overlap lead role. If you work in English daily, write "Professional Working" or "Full Professional".
2. **The Thales section lists tools, not results.** Replace with 4 or 5 bullets, each with an action and an outcome: "Led a team of N to …", "Introduced visual regression testing with Percy, cutting UI regressions from X to Y", "Set up Datadog APM and alerts, reducing time to detect incidents from X to Y".
3. **The summary says "Cloud & Frontend Expert"** and leaves out Go, which is your strongest match for this role. Lead with "Full-stack Technical Lead (Go, React/TypeScript, Kubernetes)".
4. **Add team size and scope** for the lead role.
5. **Add one line of Rails** only once you have actually built something (for example "Learning: Ruby on Rails, sample app with ActiveRecord, ERB and background jobs"). Do not list it as a skill before that.
6. **Remove the quote** at the end of the summary; it takes space a result could use.
7. Remove the phone number and photo from any version that goes into a shared repository or public site (keep this file private as well).

---

## 9. What to revise in the question bank

In this app, run *Interview prep* with this job description (paste it) to get a study set, and revise:

| Area | Topic and modules |
| --- | --- |
| Story and behavioural | Leadership & Behavioral (all [Tech Lead] questions), SDLC & Agile |
| Monolith vs microservices, migrations | Microservices, System Design, Design Principles |
| Go depth | Golang (concurrency, HTTP, testing, Tech Lead section) |
| React and TypeScript | React, TypeScript, Frontend Tooling & UI (Nx, Redux Toolkit, MUI, Tailwind, design systems) |
| Testing | Software Testing (strategy, E2E with Selenium and BrowserStack, Percy, flaky tests) |
| Reliability and monitoring | Datadog (incident investigation, SLOs, alerting) |
| Product and conversion | Web Analytics (funnels, A/B testing, GA4, Clarity) |
| Money and correctness | Databases (transactions, isolation, idempotency), System Design (payments) |
| AI tools | AI Engineering (Tech Lead section) |
| Ruby on Rails | Not in the bank yet. Learn: MVC and conventions, ActiveRecord (associations, migrations, N+1 and `includes`), ERB and partials, strong parameters, background jobs (Active Job, Sidekiq), testing (RSpec), and how React is mounted in a Rails page. |
