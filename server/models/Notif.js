import mongoose from "mongoose"

const notifSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.Object, ref: "User" },
    initiator: { type: mongoose.Schema.Types.Object, ref: "User" },
    description: {
      type: String,
      required: true,
    },
    isRead: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
  }
)

const Notif = mongoose.model("Notifs", notifSchema)
export default Notif
