'use server';

/**
 * @fileOverview This file defines a Genkit flow to resolve schedule conflicts in a school timetable.
 *
 * - resolveScheduleConflicts - A function that takes in an array of potentially conflicting schedules and returns a conflict-free schedule.
 * - ResolveScheduleConflictsInput - The input type for the resolveScheduleConflicts function.
 * - ResolveScheduleConflictsOutput - The return type for the resolveScheduleConflicts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResolveScheduleConflictsInputSchema = z.object({
  schedules: z.array(
    z.object({
      tutor: z.string().describe('The name of the tutor.'),
      grade: z.string().describe('The grade level.'),
      subject: z.string().describe('The subject being taught.'),
      time: z.string().describe('The time slot for the class.'),
      day: z.string().describe('The day of the week for the class.'),
    })
  ).describe('An array of schedules, possibly containing conflicts.'),
});
export type ResolveScheduleConflictsInput = z.infer<typeof ResolveScheduleConflictsInputSchema>;

const ResolveScheduleConflictsOutputSchema = z.array(
  z.object({
    tutor: z.string().describe('The name of the tutor.'),
    grade: z.string().describe('The grade level.'),
    subject: z.string().describe('The subject being taught.'),
    time: z.string().describe('The time slot for the class.'),
    day: z.string().describe('The day of the week for the class.'),
  })
).describe('An array of schedules with all conflicts resolved.');
export type ResolveScheduleConflictsOutput = z.infer<typeof ResolveScheduleConflictsOutputSchema>;

export async function resolveScheduleConflicts(input: ResolveScheduleConflictsInput): Promise<ResolveScheduleConflictsOutput> {
  return resolveScheduleConflictsFlow(input);
}

const resolveScheduleConflictsPrompt = ai.definePrompt({
  name: 'resolveScheduleConflictsPrompt',
  input: {schema: ResolveScheduleConflictsInputSchema},
  output: {schema: ResolveScheduleConflictsOutputSchema},
  prompt: `You are a timetable management expert. Your task is to resolve any scheduling conflicts in a given list of school schedules. 

  Examine the following schedules and identify any conflicts, such as the same tutor being assigned to two different classes at the same time, or the same classroom being double-booked. Resolve these conflicts by adjusting the time or day of the conflicting classes while ensuring minimal disruption to the overall schedule. The output should be a conflict-free list of schedules.

  Here are the schedules:
  {{#each schedules}}
  - Tutor: {{tutor}}, Grade: {{grade}}, Subject: {{subject}}, Time: {{time}}, Day: {{day}}
  {{/each}}
  
  Ensure that the output is a valid JSON array of schedules and the output matches the output schema.
  `, 
});

const resolveScheduleConflictsFlow = ai.defineFlow(
  {
    name: 'resolveScheduleConflictsFlow',
    inputSchema: ResolveScheduleConflictsInputSchema,
    outputSchema: ResolveScheduleConflictsOutputSchema,
  },
  async input => {
    const {output} = await resolveScheduleConflictsPrompt(input);
    return output!;
  }
);
