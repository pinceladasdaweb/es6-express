'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('about.html');
});

export default router;