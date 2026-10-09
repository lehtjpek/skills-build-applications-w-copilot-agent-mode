import mongoose, { Schema } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)