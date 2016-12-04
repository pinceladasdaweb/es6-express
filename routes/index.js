'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.html', {
    message: 'Hello World from Express'
  });
});

export default router;