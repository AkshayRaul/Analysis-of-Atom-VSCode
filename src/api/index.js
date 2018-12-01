import express from 'express';
const router = express.Router();

import githubAPI from './github';

router.use('/status', (req, res) => {
    res.json({
        status: 200
    });
});

router.use('/github', githubAPI);

export default router;