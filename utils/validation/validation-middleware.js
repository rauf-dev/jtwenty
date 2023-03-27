const mongoose = require('mongoose');

function validateBody(schema) {
  return async (req, res, next) => {
    try {
      console.log('VALIDATION: validateBody: ', req.body);
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      console.log('PASSED: validatedBody: ', validatedBody);
      next();
    } catch (error) {
      console.log('FAILED: validateBody: ', error.message);
      res.json({ error: error.message });
    }
  };
}

module.exports = validateBody;
