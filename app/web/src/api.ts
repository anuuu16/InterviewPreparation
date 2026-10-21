import * as server from './apiServer';
import * as hosted from './apiHosted';

// The same calls work against the local Node server (npm start) or, in the static build used for hosting
// (vite --mode static), against bundled JSON plus a small overlay for edits, favorites and feedback.
const impl: typeof server = import.meta.env.MODE === 'static' ? hosted : server;

export const getAll = impl.getAll;
export const createTopic = impl.createTopic;
export const getGroups = impl.getGroups;
export const addQuestion = impl.addQuestion;
export const updateQuestion = impl.updateQuestion;
export const deleteQuestion = impl.deleteQuestion;
export const getFeedback = impl.getFeedback;
export const addFeedback = impl.addFeedback;
export const updateFeedback = impl.updateFeedback;
export const deleteFeedback = impl.deleteFeedback;
export const getProblems = impl.getProblems;
export const getResources = impl.getResources;
export const addResource = impl.addResource;
export const removeResource = impl.removeResource;
export { isHosted } from './features';
