import Notif from "../models/Notif.js"
import Joi from 'joi'

export const createNotif = async (req, res) => {
  const { error } = validate(req.body, {
    userID: Joi.string().required(),
    initiator: Joi.string().required(),
    description: Joi.string().min(3).required() 
  })

  if (error) return res.status(400).send({
    status: 'error',
    message: error.details[0].message
  })

  const notif = new Notif({
    userID: req.body.userID,
    initiator: req.body.initiator,
    description: req.body.description
  })

  return await notif.save({
    validateBeforeSave: true
  })
  .then(response => { 
    res.send({ 
      status: 'success', 
      message: response
    })
  })
  .catch(e => { throw e })
}

function validate(data, validation) {
  const schema = Joi.object(validation)

  return schema.validate(data)
}