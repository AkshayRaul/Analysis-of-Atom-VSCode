import express from 'express';

import { getOrgData, getCodeEvents, getAtomEvents } from './github.controller';
import { getOrgData, getEvents, getCommits, getIssues, getIssuesEvents, getLabels, getMilestones, getPulls } from './github.controller';

const router = express.Router();

// router.use('/', getOrgData);

router.use('/vscodeEvents', getCodeEvents);
router.use('/atomEvents', getAtomEvents);
router.use('/events', getEvents);
router.use('/commits', getCommits);
router.use('/issues', getIssues);
router.use('/issues/events', getIssuesEvents);
router.use('/labels', getLabels);
router.use('/milestones', getMilestones);
router.use('/pulls', getPulls);

export default router;