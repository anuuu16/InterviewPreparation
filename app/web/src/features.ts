import hosted from '../hosted-features.json';

/** What the UI offers. The local app has every feature; the hosted build follows hosted-features.json. */
type Flags = { interviewPrep: boolean; studySets: boolean; editQuestions: boolean; newTopic: boolean; resourceEditing: boolean; authorFeedback: boolean };
const ALL: Flags = { interviewPrep: true, studySets: true, editQuestions: true, newTopic: true, resourceEditing: true, authorFeedback: true };

export const isHosted = import.meta.env.MODE === 'static';
export const features: Flags = isHosted ? { ...ALL, ...(hosted as Partial<Flags>) } : ALL;
