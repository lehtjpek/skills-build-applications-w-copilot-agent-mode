import mongoose, { Schema } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    coach: { type: String, required: true },
    focus: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Team || mongoose.model('Team', teamSchema)