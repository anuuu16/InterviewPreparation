/**
 * Skills the interview planner recognises in a resume or a job description, and where each one lives in the
 * question bank. When you add a topic or module to the bank, add its skill here so the planner can use it.
 */
export type SkillKind = 'language' | 'frontend' | 'backend' | 'cloud' | 'data' | 'devops' | 'practice' | 'leadership';

export interface Skill {
  id: string;
  name: string;
  kind: SkillKind;
  re: RegExp; // how it is written in a resume / job description
  topic?: string; // topic slug in the bank (data/<topic>.json)
  modules?: string[]; // narrow the topic to these modules
  keywords?: string[]; // words that make a question more relevant
}

const w = (pattern: string, flags = 'i') => new RegExp(`(?<![A-Za-z0-9+#])(?:${pattern})(?![A-Za-z0-9+#])`, flags);

export const SKILLS: Skill[] = [
  // languages
  { id: 'javascript', name: 'JavaScript', kind: 'language', re: w('javascript|ecmascript|es6|es2015'), topic: 'javascript' },
  { id: 'typescript', name: 'TypeScript', kind: 'language', re: w('typescript'), topic: 'typescript' },
  { id: 'go', name: 'Go', kind: 'language', re: new RegExp('(?<![A-Za-z0-9])(?:Golang|golang|Go(?![A-Za-z0-9-]| to\\b| live\\b| ahead\\b))(?![A-Za-z0-9])'), topic: 'golang' },
  { id: 'python', name: 'Python', kind: 'language', re: w('python|django|flask|fastapi') },
  { id: 'java', name: 'Java', kind: 'language', re: w('java|spring boot|spring') },
  { id: 'csharp', name: 'C# / .NET', kind: 'language', re: w('c#|\\.net(?: core)?|asp\\.net|dotnet') },
  { id: 'cpp', name: 'C / C++', kind: 'language', re: w('c\\+\\+|c language') },
  // front end
  { id: 'react', name: 'React', kind: 'frontend', re: w('react(?:\\.js|js)?|redux|next\\.js|nextjs|react native'), topic: 'react' },
  { id: 'angular', name: 'Angular / Vue', kind: 'frontend', re: w('angular(?:js)?|vue(?:\\.js)?|svelte'), topic: 'javascript', modules: ['Browser & DOM', 'Core Language'] },
  { id: 'css', name: 'HTML / CSS', kind: 'frontend', re: w('html5?|css3?|sass|scss|tailwind|material[- ]?ui|mui'), topic: 'javascript', modules: ['Browser & DOM'] },
  { id: 'testing', name: 'Testing', kind: 'practice', re: w('jest|cypress|selenium|playwright|unit test(?:ing|s)?|tdd|test automation|testing library|browserstack'), topic: 'react', modules: ['Architecture & Quality'], keywords: ['test'] },
  // back end
  { id: 'node', name: 'Node.js', kind: 'backend', re: w('node(?:\\.js|js)?|express(?:\\.js)?|nestjs|nest\\.js|fastify'), topic: 'nodejs' },
  { id: 'ruby', name: 'Ruby on Rails', kind: 'backend', re: w('ruby(?: on rails)?|rails|erb') },
  { id: 'rest', name: 'REST / APIs', kind: 'backend', re: w('rest(?:ful)?(?: apis?)?|web api|openapi|swagger|graphql|grpc'), topic: 'nodejs', modules: ['HTTP & APIs'], keywords: ['api', 'rest', 'http'] },
  // cloud
  { id: 'azure', name: 'Azure', kind: 'cloud', re: w('azure|aks|entra|azure devops'), topic: 'azure-cloud' },
  { id: 'aws', name: 'AWS / GCP', kind: 'cloud', re: w('aws|amazon web services|gcp|google cloud|ec2|s3|lambda'), topic: 'azure-cloud', modules: ['Cloud Fundamentals', 'Architecture & Resilience'] },
  // data
  { id: 'sql', name: 'SQL databases', kind: 'data', re: w('sql|postgres(?:ql)?|mysql|mssql|ms sql|sql server|oracle|mariadb|t-sql'), topic: 'databases' },
  { id: 'nosql', name: 'NoSQL / caching', kind: 'data', re: w('mongodb|mongo|redis|cassandra|dynamodb|cosmos ?db|elasticsearch|memcached'), topic: 'databases', modules: ['NoSQL & Caching', 'Scaling & Replication'] },
  { id: 'messaging', name: 'Messaging / streaming', kind: 'data', re: w('kafka|rabbitmq|service bus|event hubs?|sqs|sns|pub/?sub|message queues?|event[- ]driven'), topic: 'microservices', modules: ['Communication', 'Data & Consistency'], keywords: ['message', 'event', 'kafka', 'queue'] },
  // devops
  { id: 'docker', name: 'Docker', kind: 'devops', re: w('docker|containers?|containeri[sz]ation'), topic: 'devops-ci-cd', modules: ['Docker & Containers', 'Container Internals'] },
  { id: 'kubernetes', name: 'Kubernetes', kind: 'devops', re: w('kubernetes|k8s|helm|kubectl|openshift'), topic: 'kubernetes' },
  { id: 'cicd', name: 'CI/CD', kind: 'devops', re: w('ci/?cd|gitlab(?: ci)?|jenkins|github actions|circleci|azure pipelines|continuous (?:integration|delivery|deployment)|pipelines?'), topic: 'devops-ci-cd', modules: ['CI/CD Pipelines', 'GitLab CI', 'Release Strategies'] },
  { id: 'iac', name: 'Infrastructure as code', kind: 'devops', re: w('terraform|bicep|ansible|cloudformation|pulumi|infrastructure as code|iac'), topic: 'devops-ci-cd', modules: ['Infrastructure as Code'] },
  { id: 'git', name: 'Git', kind: 'devops', re: w('git|github|gitlab|bitbucket|version control'), topic: 'git-version-control' },
  { id: 'observability', name: 'Observability', kind: 'devops', re: w('datadog|prometheus|grafana|new relic|opentelemetry|splunk|elk|observability|monitoring|logging|tracing|sentry|app insights|application insights'), topic: 'microservices', modules: ['Observability'], keywords: ['observab', 'trace', 'metric', 'log'] },
  // practices
  { id: 'microservices', name: 'Microservices', kind: 'practice', re: w('microservices?|service[- ]oriented|soa|distributed systems?'), topic: 'microservices' },
  { id: 'systemdesign', name: 'System design', kind: 'practice', re: w('system design|architecture|architect|scalab(?:le|ility)|high availability|low latency|large[- ]scale|distributed'), topic: 'system-design' },
  { id: 'security', name: 'Security', kind: 'practice', re: w('security|oauth2?|openid|jwt|owasp|authentication|authorization|sso|encryption|tls|ssl|penetration'), topic: 'networking-security' },
  { id: 'networking', name: 'Networking / web', kind: 'practice', re: w('networking|tcp/?ip|http/?2|dns|load balanc(?:er|ing)|cdn|websockets?'), topic: 'networking-security', modules: ['Network Fundamentals', 'HTTP & Web', 'DNS & Delivery'] },
  { id: 'design', name: 'Design principles & patterns', kind: 'practice', re: w('design patterns?|solid|clean (?:code|architecture)|domain[- ]driven|ddd|oop|object[- ]oriented|refactoring'), topic: 'design-principles' },
  { id: 'ai', name: 'AI / ML', kind: 'practice', re: w('machine learning|\\bml\\b|llm|generative ai|genai|openai|rag|prompt engineering|artificial intelligence|\\bai\\b|copilot'), topic: 'ai-engineering' },
  { id: 'agile', name: 'Agile / Scrum', kind: 'leadership', re: w('agile|scrum|kanban|sprints?|safe|lean'), topic: 'sdlc-agile' },
  { id: 'leadership', name: 'Technical leadership', kind: 'leadership', re: w('lead(?:ing|ership)?|led (?:a |the |an )?(?:\\w+ )?(?:team|engineers?|squad|group|developers?)|tech(?:nical)? lead|mentor(?:ed|ing|ship)?|manag(?:e|ed|ing) (?:a |the )?(?:\\w+ )?(?:team|engineers?)|stakeholders?|coach(?:ed|ing)?|team lead|engineering manager|people management'), topic: 'leadership-behavioral' },
];

export const KIND_LABEL: Record<SkillKind, string> = {
  language: 'Languages', frontend: 'Front end', backend: 'Back end', cloud: 'Cloud', data: 'Data', devops: 'DevOps', practice: 'Practices', leadership: 'Leadership & process',
};
