import mongoose, { Schema } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    equipment: [{ type: String }],
    suggestedFor: [{ type: String }],
  },
  { timestamps: true },
)

export default mongoose.models.Workout || mongoose.model('Workout', workoutSchema)