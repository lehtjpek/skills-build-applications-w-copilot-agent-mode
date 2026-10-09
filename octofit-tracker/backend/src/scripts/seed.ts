import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailBlazers, coreCrew, sprintSquad] = await Team.insertMany([
      {
        name: 'Trail Blazers',
        city: 'Seattle',
        coach: 'Maya Chen',
        focus: 'Endurance training',
      },
      {
        name: 'Core Crew',
        city: 'Austin',
        coach: 'Jordan Blake',
        focus: 'Strength and mobility',
      },
      {
        name: 'Sprint Squad',
        city: 'Denver',
        coach: 'Priya Raman',
        focus: 'High-intensity intervals',
      },
    ]);

    const [ava, marcus, sofia, eli] = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@example.com',
        role: 'member',
        teamId: trailBlazers._id,
        profile: {
          age: 29,
          fitnessGoal: 'Run a half marathon',
          preferredWorkout: 'Outdoor running',
        },
      },
      {
        name: 'Marcus Rivera',
        email: 'marcus.rivera@example.com',
        role: 'captain',
        teamId: coreCrew._id,
        profile: {
          age: 34,
          fitnessGoal: 'Build functional strength',
          preferredWorkout: 'Kettlebell circuits',
        },
      },
      {
        name: 'Sofia Patel',
        email: 'sofia.patel@example.com',
        role: 'member',
        teamId: sprintSquad._id,
        profile: {
          age: 26,
          fitnessGoal: 'Improve sprint speed',
          preferredWorkout: 'Track intervals',
        },
      },
      {
        name: 'Eli Brooks',
        email: 'eli.brooks@example.com',
        role: 'member',
        teamId: trailBlazers._id,
        profile: {
          age: 41,
          fitnessGoal: 'Increase weekly activity',
          preferredWorkout: 'Cycling',
        },
      },
    ]);

    await Activity.insertMany([
      {
        userId: ava._id,
        type: 'Run',
        durationMinutes: 52,
        caloriesBurned: 510,
        activityDate: new Date('2026-10-01T07:30:00Z'),
        notes: 'Morning lake loop with steady pacing',
      },
      {
        userId: marcus._id,
        type: 'Strength',
        durationMinutes: 45,
        caloriesBurned: 420,
        activityDate: new Date('2026-10-02T18:15:00Z'),
        notes: 'Lower-body strength session',
      },
      {
        userId: sofia._id,
        type: 'Intervals',
        durationMinutes: 38,
        caloriesBurned: 460,
        activityDate: new Date('2026-10-03T06:45:00Z'),
        notes: 'Eight 400-meter repeats',
      },
      {
        userId: eli._id,
        type: 'Cycling',
        durationMinutes: 70,
        caloriesBurned: 640,
        activityDate: new Date('2026-10-04T09:00:00Z'),
        notes: 'Rolling hills endurance ride',
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: eli._id,
        teamId: trailBlazers._id,
        rank: 1,
        points: 1280,
        activeMinutes: 410,
      },
      {
        userId: ava._id,
        teamId: trailBlazers._id,
        rank: 2,
        points: 1195,
        activeMinutes: 386,
      },
      {
        userId: sofia._id,
        teamId: sprintSquad._id,
        rank: 3,
        points: 1110,
        activeMinutes: 355,
      },
      {
        userId: marcus._id,
        teamId: coreCrew._id,
        rank: 4,
        points: 1040,
        activeMinutes: 332,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Builder Run',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        equipment: ['Running shoes'],
        suggestedFor: ['Endurance', 'Half marathon preparation'],
      },
      {
        title: 'Kettlebell Power Circuit',
        category: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 35,
        equipment: ['Kettlebell', 'Exercise mat'],
        suggestedFor: ['Functional strength', 'Core stability'],
      },
      {
        title: 'Track Speed Ladder',
        category: 'Intervals',
        difficulty: 'Intermediate',
        durationMinutes: 32,
        equipment: ['Track access', 'Timer'],
        suggestedFor: ['Speed', 'Anaerobic conditioning'],
      },
      {
        title: 'Recovery Mobility Flow',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        equipment: ['Yoga mat'],
        suggestedFor: ['Recovery', 'Flexibility'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
