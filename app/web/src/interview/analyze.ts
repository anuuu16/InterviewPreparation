import type { Level, Question, Topic } from '../types';
import { SKILLS, type Skill } from './skills';

/**
 * Rule-based interview planner. It reads a resume and a job description in the browser, compares the skills,
 * and builds questions per interview round plus a ranked list of matching questions from the bank.
 * It does not use an AI model: it is a skills dictionary plus templates, so it is predictable and private.
 */

export interface SkillHit {
  skill: Skill;
  mentions: number;
  required: boolean; // false when the job description only lists it as preferred
}

export interface PlanItem {
  text: string; // the question, or the title of a bank question
  why?: string; // why it is asked / how to approach it
  qid?: string; // a question in the bank to study
  group?: string; // sub-heading inside a round (a skill, a module)
}

export interface Round {
  id: string;
  title: string;
  blurb: string;
  items: PlanItem[];
}

export interface Ranked {
  skill: Skill;
  gap: boolean;
  questions: Question[]; // best first
}

export interface Plan {
  roleTitle: string;
  resumeYears: number | null;
  jdYears: number | null;
  matchPercent: number | null;
  matched: SkillHit[];
  gaps: SkillHit[];
  extras: SkillHit[];
  flags: string[]; // timeline gaps and short stints, in plain words
  rounds: Round[];
  ranked: Ranked[];
}

export interface SetOptions {
  perSkill: number;
  levels: Level[];
  techLead: boolean;
  gapBoost: boolean;
  behavioral: boolean;
}

const isTechLead = (q: Question) => q.tags.includes('tech-lead') || q.question.startsWith('[Tech Lead]');
const lines = (t: string) => t.split(/\r?\n/).map((l) => l.replace(/^[\s•\-*–·▪●◦]+/, '').trim()).filter(Boolean);
const clip = (s: string, n = 200) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

// ---- skills ------------------------------------------------------------------------------------

function detect(text: string, optionalOnly = false): SkillHit[] {
  const out: SkillHit[] = [];
  const ls = lines(text);
  for (const skill of SKILLS) {
    const re = new RegExp(skill.re.source, skill.re.flags.replace('g', '') + 'g');
    let mentions = 0;
    let anyRequired = false;
    for (const l of ls) {
      const n = (l.match(re) ?? []).length;
      if (!n) continue;
      mentions += n;
      if (!/preferred|nice to have|good to have|bonus|desirable|a plus\b|is a plus/i.test(l)) anyRequired = true;
    }
    if (mentions) out.push({ skill, mentions, required: optionalOnly ? false : anyRequired });
  }
  return out.sort((a, b) => b.mentions - a.mentions);
}

// ---- dates and timeline ---------------------------------------------------------------------------

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const EDU = /university|college|school|bachelor|master|degree|b\.?tech|m\.?tech|b\.?sc|b\.?e\b|diploma|graduat|class|10th|12th|cgpa|gpa|%/i;

interface Range { start: number; end: number; present: boolean; line: string }

const monthIndex = (y: number, m: number) => y * 12 + (m - 1);
function toMonth(tok: string, isEnd: boolean): number | null {
  const t = tok.trim();
  let m = t.match(/^(\d{4})[-/](\d{1,2})$/);
  if (m) return monthIndex(+m[1], +m[2]);
  m = t.match(/^([A-Za-z]{3,9})\.?\s+(\d{4})$/);
  if (m) { const i = MONTHS.indexOf(m[1].slice(0, 3).toLowerCase()); return i < 0 ? null : monthIndex(+m[2], i + 1); }
  m = t.match(/^(\d{4})$/);
  if (m) return monthIndex(+m[1], isEnd ? 12 : 1);
  return null;
}

function parseRanges(text: string): Range[] {
  const tok = '(?:\\d{4}[-/]\\d{1,2}|[A-Za-z]{3,9}\\.?\\s+\\d{4}|\\d{4})';
  const re = new RegExp(`(${tok})\\s*(?:-|–|—|to)\\s*(present|current|now|till date|${tok})`, 'gi');
  const now = new Date();
  const nowIdx = monthIndex(now.getFullYear(), now.getMonth() + 1);
  const out: Range[] = [];
  for (const l of lines(text)) {
    if (EDU.test(l)) continue;
    for (const m of l.matchAll(re)) {
      const start = toMonth(m[1], false);
      const present = /present|current|now|till date/i.test(m[2]);
      const end = present ? nowIdx : toMonth(m[2], true);
      if (start == null || end == null || end < start) continue;
      out.push({ start, end, present, line: l });
    }
  }
  return out;
}

const fmt = (i: number) => `${MONTHS[i % 12][0].toUpperCase()}${MONTHS[i % 12].slice(1)} ${Math.floor(i / 12)}`;

function timeline(resume: string): { years: number | null; flags: string[]; questions: PlanItem[] } {
  const ranges = parseRanges(resume).sort((a, b) => a.start - b.start);
  const flags: string[] = [];
  const questions: PlanItem[] = [];
  if (!ranges.length) {
    const y = resume.match(/(\d{1,2})\+?\s*(?:years|yrs)/i);
    return { years: y ? Math.min(40, +y[1]) : null, flags, questions };
  }
  // merge overlapping stints, then look for holes
  const merged: { start: number; end: number }[] = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end + 1) last.end = Math.max(last.end, r.end);
    else merged.push({ start: r.start, end: r.end });
  }
  for (let i = 1; i < merged.length; i += 1) {
    const gap = merged[i].start - merged[i - 1].end - 1;
    if (gap >= 4) {
      const text = `A gap of about ${gap} months between ${fmt(merged[i - 1].end)} and ${fmt(merged[i].start)}.`;
      flags.push(text);
      questions.push({ text: `Your resume shows a gap of about ${gap} months (${fmt(merged[i - 1].end)} to ${fmt(merged[i].start)}). What were you doing, and what did you learn?`, why: 'Interviewers notice gaps. Answer calmly and briefly: what happened, what you did (learning, family, freelance, health), and why you are ready now.' });
    }
  }
  for (const r of ranges) {
    const months = r.end - r.start + 1;
    if (!r.present && months <= 9 && months >= 1) {
      flags.push(`A short stint of about ${months} months (${fmt(r.start)} to ${fmt(r.end)}).`);
      questions.push({ text: `You stayed about ${months} months in the role listed as “${clip(r.line, 80)}”. Why did you leave?`, why: 'Short stints raise “will they stay?” and “was there a problem?”. Give a positive, factual reason and what you looked for next.' });
    }
  }
  const total = (merged[merged.length - 1].end - merged[0].start + 1) / 12;
  return { years: Math.round(total * 10) / 10, flags, questions };
}

// ---- resume highlights ----------------------------------------------------------------------------

const VERBS = /\b(built|led|lead|designed|developed|implemented|migrated|reduced|improved|increased|optimi[sz]ed|launched|architected|owned|mentored|automated|delivered|scaled|integrated|created|managed|introduced|refactored|deployed|maintained|collaborated|resolved|established)\b/i;
const METRIC = /(?<![\d.])(?!(?:19|20)\d{2}\b)\d+(?:[.,]\d+)?\s*(?:%|x\b|k\b|ms\b|seconds?|minutes?|hours?|users?|customers?|requests?|rps|tb\b|gb\b|engineers?|developers?|people|services?|teams?|clients?)/i;

function highlights(resume: string): string[] {
  const scored = lines(resume)
    .filter((l) => l.length >= 35 && l.length <= 260 && !EDU.test(l))
    .map((l) => ({ l, score: (METRIC.test(l) ? 3 : 0) + (VERBS.test(l) ? 2 : 0) + detect(l).length }))
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const { l } of scored) {
    const key = l.toLowerCase().slice(0, 40);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(l);
    if (out.length === 6) break;
  }
  return out;
}

// ---- the bank ------------------------------------------------------------------------------------

/** Questions of a skill's topic, best first: right module, keyword hits, Tech Lead a little higher. */
export function rankBank(skill: Skill, topics: Topic[]): Question[] {
  const topic = topics.find((t) => t.slug === skill.topic);
  if (!topic) return [];
  const kws = (skill.keywords ?? []).map((k) => k.toLowerCase());
  return topic.questions
    .map((q, i) => {
      const hay = `${q.question} ${q.tags.join(' ')}`.toLowerCase();
      const kw = kws.reduce((n, k) => n + (hay.includes(k) ? 1 : 0), 0);
      const inModule = skill.modules ? skill.modules.includes(q.module ?? '') : false;
      return { q, i, score: (inModule ? 3 : 0) + kw * 2 + (isTechLead(q) ? 0.5 : 0) };
    })
    .filter((x) => !skill.modules || x.score >= 2)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, 24)
    .map((x) => x.q);
}

/** Choose n questions with a mix of levels (basic, intermediate, advanced in turn). */
function mix(qs: Question[], n: number, levels: Level[], techLead: boolean): Question[] {
  const pool = qs.filter((q) => levels.includes(q.level) && (techLead || !isTechLead(q)));
  const buckets: Record<Level, Question[]> = { basic: [], intermediate: [], advanced: [] };
  pool.forEach((q) => buckets[q.level].push(q));
  const out: Question[] = [];
  const order: Level[] = ['basic', 'intermediate', 'intermediate', 'advanced'];
  let guard = 0;
  while (out.length < n && guard < 200) {
    for (const l of order) {
      const next = buckets[l].shift();
      if (next && out.length < n) out.push(next);
    }
    guard += 1;
    if (!buckets.basic.length && !buckets.intermediate.length && !buckets.advanced.length) break;
  }
  return out;
}

/** The study set for the chosen options: ids in reading order, skill by skill. */
export function buildSet(plan: Plan, topics: Topic[], opts: SetOptions): string[] {
  const ids: string[] = [];
  const add = (qs: Question[]) => qs.forEach((q) => { if (!ids.includes(q.id)) ids.push(q.id); });
  if (opts.behavioral) {
    const lead = topics.find((t) => t.slug === 'leadership-behavioral');
    if (lead) add(mix(lead.questions.filter((q) => q.module === 'Interview Approach'), 4, opts.levels, true));
  }
  for (const r of plan.ranked) {
    const n = opts.perSkill + (r.gap && opts.gapBoost ? 2 : 0);
    add(mix(r.questions, n, opts.levels, opts.techLead));
  }
  return ids;
}

// ---- the plan ------------------------------------------------------------------------------------

function find(topics: Topic[], slug: string, re: RegExp): string | undefined {
  return topics.find((t) => t.slug === slug)?.questions.find((q) => re.test(q.question))?.id;
}

export function buildPlan(resume: string, jd: string, topics: Topic[]): Plan {
  const haveResume = resume.trim().length > 0;
  const haveJd = jd.trim().length > 0;
  const resumeHits = haveResume ? detect(resume) : [];
  const jdHits = haveJd ? detect(jd) : [];
  const inResume = new Set(resumeHits.map((h) => h.skill.id));
  const inJd = new Set(jdHits.map((h) => h.skill.id));

  const matched = haveJd ? jdHits.filter((h) => inResume.has(h.skill.id)) : resumeHits;
  const gaps = haveJd && haveResume ? jdHits.filter((h) => !inResume.has(h.skill.id)) : [];
  const extras = haveJd ? resumeHits.filter((h) => !inJd.has(h.skill.id)) : [];
  const weight = (h: SkillHit) => (h.required ? 2 : 1);
  const denom = jdHits.reduce((n, h) => n + weight(h), 0);
  const matchPercent = haveJd && haveResume && denom ? Math.round((matched.reduce((n, h) => n + weight(h), 0) / denom) * 100) : null;

  const tl = haveResume ? timeline(resume) : { years: null, flags: [], questions: [] };
  const jdYearsMatch = jd.match(/(\d{1,2})\s*\+?\s*(?:years|yrs)/i);
  const jdYears = jdYearsMatch ? Math.min(25, +jdYearsMatch[1]) : null;
  const roleTitle = clip((lines(jd)[0] ?? '').replace(/^(job title|role|position)\s*[:\-]\s*/i, ''), 70);
  const role = roleTitle && roleTitle.length < 70 ? `“${roleTitle}”` : 'this role';
  const top = (matched.length ? matched : resumeHits).slice(0, 3).map((h) => h.skill.name);

  const ranked: Ranked[] = [
    ...matched.map((h) => ({ skill: h.skill, gap: false, questions: rankBank(h.skill, topics) })),
    ...gaps.map((h) => ({ skill: h.skill, gap: true, questions: rankBank(h.skill, topics) })),
  ].filter((r, i, all) => r.skill.topic && all.findIndex((x) => x.skill.id === r.skill.id) === i);
  const bankItems = (r: Ranked, n: number): PlanItem[] =>
    mix(r.questions, n, ['basic', 'intermediate', 'advanced'], true).map((q) => ({ text: q.question, why: q.module ?? '', qid: q.id, group: r.skill.name }));

  const rounds: Round[] = [];

  // 1. recruiter / HR
  const hr: PlanItem[] = [
    { text: `Tell me about yourself and why you are a good fit for ${role}.`, why: `Use present, then past, then future. Lead with ${top.length ? top.join(', ') : 'your strongest skills'} and one result you are proud of.`, qid: find(topics, 'leadership-behavioral', /tell me about yourself/i) },
    { text: `Why do you want ${role}, and why now?`, why: 'Connect what the role needs to what you want next. Be specific about the product or the problem, not only the stack.', qid: find(topics, 'leadership-behavioral', /why this role|why you are leaving/i) },
    { text: 'What do you know about our company and product?', why: 'Read their website, blog and recent news the day before. Prepare two sharp observations or questions.' },
    { text: 'What are your expectations for compensation, notice period and location or working model?', why: 'Know your range, your notice period and your must-haves before the call.' },
  ];
  if (tl.years != null && jdYears != null && tl.years < jdYears - 0.9) hr.push({ text: `The role asks for ${jdYears}+ years and your resume shows about ${tl.years}. Why are you ready for this level?`, why: 'Show scope and impact instead of years: what you owned, led or decided.' });
  rounds.push({ id: 'screen', title: 'Recruiter / HR screen', blurb: 'A short first call: your story, motivation and logistics.', items: hr });

  // 2. resume deep dive
  if (haveResume) {
    const deep: PlanItem[] = highlights(resume).map((l) => ({
      text: `Walk me through this line from your resume: “${clip(l, 170).replace(/[.\s]+$/, '')}”. What exactly did you do yourself, and what was the result?`,
      why: 'Interviewers pick a line and dig. Prepare the context, your role, one decision and its trade-off, and a number.',
    }));
    for (const h of resumeHits.slice(0, 4)) deep.push({ text: `You list ${h.skill.name}. What is the hardest production problem you solved with it, and what would you do differently now?`, why: 'Tell it as: situation, what you tried, what worked, what you learned.' });
    deep.push(...tl.questions);
    if (!deep.length) deep.push({ text: 'Which project on your resume are you most proud of, and why?', why: 'Pick one with clear impact and your own decisions.' });
    rounds.push({ id: 'resume', title: 'Resume deep-dive', blurb: 'Questions built from your own resume: expect follow-ups on every claim.', items: deep });
  }

  // 3. technical by skill
  const tech: PlanItem[] = ranked.filter((r) => !r.gap && !['leadership', 'agile'].includes(r.skill.id)).flatMap((r) => bankItems(r, 4));
  if (tech.length) rounds.push({ id: 'technical', title: 'Technical round, by skill', blurb: 'Questions from the bank for the skills this job asks for and you have. Open one to study it.', items: tech });

  // 4. system design
  const wantsDesign = inJd.has('systemdesign') || inJd.has('microservices') || inJd.has('kubernetes') || inJd.has('messaging') || (tl.years ?? 0) >= 6 || /lead|senior|principal|staff|architect/i.test(jd);
  if (wantsDesign) {
    const sd = topics.find((t) => t.slug === 'system-design');
    const items: PlanItem[] = [];
    if (sd) {
      const pick = [...sd.questions.filter((q) => q.module === 'Approach & Estimation').slice(0, 2), ...sd.questions.filter((q) => q.module === 'Case Studies').slice(0, 5)];
      items.push(...pick.map((q) => ({ text: q.question, why: q.module ?? '', qid: q.id, group: 'System design bank' })));
    }
    items.unshift({ text: `Design a system for a problem in ${role === 'this role' ? 'this domain' : role}'s domain using the stack in the job description. Walk me through requirements, estimates, API, data model and trade-offs.`, why: 'Use the framework: clarify, estimate, design, deep-dive, bottlenecks. Name the trade-offs out loud.' });
    rounds.push({ id: 'design', title: 'System design and architecture', blurb: 'Senior and lead roles are asked to design a system on a whiteboard.', items });
  }

  // 5. leadership and behavioural
  const leadSignals = inJd.has('leadership') || inResume.has('leadership') || /lead|senior|principal|staff|manager/i.test(jd) || (tl.years ?? 0) >= 5;
  {
    const lead = topics.find((t) => t.slug === 'leadership-behavioral');
    const items: PlanItem[] = [
      { text: 'Tell me about a time you disagreed with a teammate or stakeholder about a technical decision. What happened?', why: 'Use STAR: situation, task, action, result. Show listening, data and a respectful outcome.' },
      { text: 'Tell me about a production incident you handled. What did you do and what changed afterwards?', why: 'Show calm triage, mitigation first, root cause second, and a prevention step.' },
      { text: 'Tell me about a time you made a wrong decision. What did you learn?', why: 'Own it, explain the lesson and what you do differently now.' },
    ];
    if (leadSignals) items.push({ text: 'How do you mentor engineers and raise the quality of a team?', why: 'Give one concrete example: a person you grew, a standard you introduced, and the result.' });
    if (lead) items.push(...mix(lead.questions.filter((q) => leadSignals ? isTechLead(q) : q.module === 'Interview Approach'), 5, ['basic', 'intermediate', 'advanced'], true).map((q) => ({ text: q.question, why: q.module ?? '', qid: q.id, group: 'Leadership bank' })));
    rounds.push({ id: 'behavioral', title: 'Leadership and behavioural', blurb: leadSignals ? 'Lead roles weigh people and decision questions heavily.' : 'Almost every loop includes a behavioural round.', items });
  }

  // 6. gaps and risks
  if (gaps.length || tl.flags.length) {
    const items: PlanItem[] = [];
    for (const h of gaps.slice(0, 8)) {
      items.push({ text: `This role asks for ${h.skill.name}${h.required ? '' : ' (preferred)'}, but it is not on your resume. What is your experience with it, and how would you become productive quickly?`, why: 'Be honest. Mention adjacent experience, what you have already tried, and a realistic ramp-up plan.', group: h.skill.name });
      const r = ranked.find((x) => x.skill.id === h.skill.id);
      if (r) items.push(...bankItems(r, 3));
      else items.push({ text: `No questions in the bank yet for ${h.skill.name}.`, why: 'Study it from the official documentation (see Resources).', group: h.skill.name });
    }
    for (const f of tl.flags) items.push({ text: f, why: 'Prepare a short, calm answer.', group: 'Timeline' });
    rounds.push({ id: 'gaps', title: 'Gaps and risks', blurb: 'What an interviewer may probe, because it is in the job description but not on your resume (or looks unusual).', items });
  }

  // 7. your questions
  const ask: PlanItem[] = [
    { text: 'What would success look like in the first 90 days?', why: 'Shows you think about outcomes.' },
    { text: 'What does the team do well, and what is the hardest problem it is facing right now?', why: 'Reveals the real work and the culture.' },
    { text: 'How are decisions made and technical debt prioritised here?', why: 'Important for a lead: how much influence will you have?' },
  ];
  if (/on[- ]call|oncall|pager/i.test(jd)) ask.push({ text: 'What does on-call look like: rotation size, how often are people paged, and how are incidents reviewed?' });
  if (inJd.has('kubernetes') || inJd.has('cicd') || inJd.has('cloud')) ask.push({ text: 'How do releases work today (frequency, rollbacks, environments), and what would you like to improve?' });
  if (inJd.has('leadership')) ask.push({ text: 'How big is the team, what are the roles, and who would I work with most closely?' });
  rounds.push({ id: 'ask', title: 'Questions to ask them', blurb: 'Good questions are part of the interview.', items: ask });

  return { roleTitle, resumeYears: tl.years, jdYears, matchPercent, matched, gaps, extras, flags: tl.flags, rounds, ranked };
}

/** A prompt you can paste into an AI assistant to get a deeper, written plan from the same inputs. */
export function aiPrompt(resume: string, jd: string): string {
  return `You are an experienced interviewer and career coach. Using the resume and job description below, produce:
1. A skills match and gap analysis (matched, missing, extra) with how serious each gap is.
2. Questions grouped by interview round: recruiter screen, resume deep-dive (quote the resume line you are probing), technical (by skill), system design, leadership and behavioural, gaps and risks, and questions the candidate should ask.
3. For each question: why it is asked and a short outline of a strong answer using only facts from the resume (do not invent experience).
4. A prioritised 2-week study plan.

RESUME
${resume.trim() || '(not provided)'}

JOB DESCRIPTION
${jd.trim() || '(not provided)'}`;
}

export const SAMPLE_RESUME = `Priya Nair
Senior Software Engineer
Summary
Backend-leaning engineer with 7 years of experience building web platforms.
Experience
Acme Payments, Senior Software Engineer          2021-04 - Present
- Led a team of 4 engineers building a payments API in Node.js and TypeScript, handling 2M requests per day.
- Migrated 12 services from VMs to Docker and Kubernetes on Azure, reducing deployment time by 70%.
- Designed PostgreSQL schemas and cut the slowest report from 40 s to 3 s with indexes and query changes.
- Set up GitLab CI pipelines and Datadog dashboards for all services.
Brightcart, Software Engineer                     2018-06 - 2020-03
- Built a React and Redux storefront used by 300k customers.
- Implemented REST APIs and introduced Jest unit tests, raising coverage to 80%.
Education
B.Tech Computer Science, 2014 - 2018`;

export const SAMPLE_JD = `Staff Backend Engineer, Payments Platform
We are looking for a Staff Backend Engineer with 8+ years of experience to lead our payments platform.
Responsibilities
- Design and own scalable, highly available microservices handling millions of transactions.
- Lead and mentor a team of engineers and work with stakeholders.
- Run production on Kubernetes and AWS with Terraform and CI/CD.
Requirements
- Strong experience with Go or Java, and PostgreSQL.
- Experience with Kafka or other message queues and event-driven architecture.
- Knowledge of observability (Datadog, Prometheus) and on-call practices.
- Good understanding of security, OAuth and system design.
Nice to have: Python, GraphQL.`;
