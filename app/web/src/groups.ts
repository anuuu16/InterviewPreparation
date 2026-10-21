/** Topics are shown in groups (Languages, Frameworks, Tools...). The order of the groups comes from app/groups.json. */
export const OTHER_GROUP = 'Other';

export interface TopicGroup<T> {
  name: string;
  topics: T[];
}

export function groupTopics<T extends { group?: string }>(topics: T[], order: string[]): TopicGroup<T>[] {
  const names = [...new Set(topics.map((t) => t.group || OTHER_GROUP))];
  const rank = (g: string) => (order.includes(g) ? order.indexOf(g) : order.length);
  names.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  return names.map((name) => ({ name, topics: topics.filter((t) => (t.group || OTHER_GROUP) === name) }));
}
