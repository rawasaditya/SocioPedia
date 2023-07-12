import Notif from "../models/Notif.js";
import Joi from "joi";

export const createNotif = async (req, res) => {
  const { error } = validate(req.body, {
    userID: Joi.string().required(),
    initiator: Joi.string().required(),
    description: Joi.string().min(3).required(),
  });

  if (error)
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });

  const notif = new Notif({
    userID: req.body.userID,
    initiator: req.body.initiator,
    description: req.body.description,
  });

  return await notif
    .save({
      validateBeforeSave: true,
    })
    .then((response) => {
      res.send({
        status: "success",
        message: response,
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const listNotifs = async (req, res) => {
  if (req.user.id) {
    const result = await Notif.find({ userID: req.user.id })
      .sort({ date: -1 })
      .select({
        userID: 1,
        initiator: 1,
        description: 1,
        isRead: 1,
        date: 1,
      });

    res.status(200).json(result);
  } else {
    res.status(400).send({ status: "error", message: "UserID is required." });
  }
};

function validate(data, validation) {
  const schema = Joi.object(validation);

  return schema.validate(data);
}
