import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    profile: {
      age: Number,
      fitnessGoal: String,
      preferredWorkout: String,
    },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model('User', userSchema)