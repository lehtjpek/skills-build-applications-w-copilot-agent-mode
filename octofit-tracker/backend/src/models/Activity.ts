import mongoose, { Schema } from 'mongoose'

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
    notes: String,
  },
  { timestamps: true },
)

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema)