import mongoose from "mongoose";
import cron from "node-cron";
import Event from "../models/Event.model.js";
import User from "../models/User.model.js";
import "../lib/db.js";

// Helper function to remove attendee from event who are not in user collection 

async function cleanEventAttendees() {
  const users = await User.find({}, '_id');
  const userIds = users.map(u => u._id.toString());
  const events = await Event.find({});

  for (const event of events) {
    const filteredAttendees = event.attendees.filter(attId => userIds.includes(attId.toString()));

    if (filteredAttendees.length !== event.attendees.length) {
      event.attendees = filteredAttendees;
      await event.save();
    }
  }
}

// main cleanup function 
export async function cleanupOldEvents() {
  try {
    const now = new Date();
    // 1. Find all past events
    const oldEvents = await Event.find({ date: { $lt: now } });
    const oldEventIds = oldEvents.map(e => e._id);

    if (oldEventIds.length === 0) return;

    // 2. Remove event references from users
    await User.updateMany(
      {},
      {
        $pull: {
          createdEvents: { $in: oldEventIds },
          eventAttendees: { $in: oldEvenIds }
        }
      }
    );

    // 3. Delete the old events
    await Event.deleteMany({ _id: { $in: oldEventIds } });
  } catch (error) {
    console.log('Error during cleanup : ', error);
  }
}

// 4. Remove non-existent users from event attendees
export async function cleanupAttendees() {
  try {
    await cleanEventAttendees();
  } catch (error) {
    console.log('Error cleaning event attendees : ', error);
  }
}

// 5. Schedule the job to run every day at 2:00 AM
cron.schedule('0 2 * * *', async () => {
  await cleanupOldEvents();
  await cleanupAttendees();
});

// for manual run (node Backend/utils/cleanupOldEvents.js)
if (process.argv[1] === new URL(import.meta.url).pathname) {
  cleanupOldEvents().then(cleanupAttendees).then(() => process.exit(0));
}
