import { config } from 'dotenv';
config();

import '@/ai/flows/generate-timetable.ts';
import '@/ai/flows/resolve-schedule-conflicts.ts';