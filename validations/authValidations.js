import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().required(), 
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    password_confirmation: Joi.ref('password'),   
}).with('password', 'password_confirmation');

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});


export const expenseSchema = Joi.object({
  expense: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(),
  date: Joi.date().required()
})