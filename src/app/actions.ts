"use server";
import { generateTimetable, type GenerateTimetableInput } from '@/ai/flows/generate-timetable';

export async function handleGenerateTimetable(input: GenerateTimetableInput) {
  try {
    const result = await generateTimetable(input);
    return { success: true, timetable: result.timetable };
  } catch (error) {
    console.error("Error generating timetable:", error);
    return { success: false, error: 'An unexpected error occurred while generating the timetable. Please try again.' };
  }
}
