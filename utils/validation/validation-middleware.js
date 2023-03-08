const mongoose = require('mongoose');

function validateBody(schema) {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (error) {
      res.json({ error: error.message });
    }
  };
}

module.exports = validateBody;
