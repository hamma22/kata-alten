const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().max(300).required(),
  price: Joi.number().positive().required(),
  code: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
  internalReference: Joi.string().allow(""),
  shellId: Joi.number().allow(""),
  category: Joi.string().required(),
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((e) => e.message),
    });
  }
  next();
};

module.exports = validateProduct;
