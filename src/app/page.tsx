"use client";

import { useState } from "react";
import { TutorForm } from "@/components/tutor-form";
import { TutorList } from "@/components/tutor-list";
import { TimetableGenerator } from "@/components/timetable-generator";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Tutor } from "@/lib/types";

export default function Home() {
  const [tutors, setTutors] = useState<Tutor[]>([
    {
      id: "1",
      name: "Dr. Alan Grant",
      specialities: ["Science", "History"],
      availability: "Mon, Wed, Fri 9am-5pm",
    },
    {
      id: "2",
      name: "Dr. Ian Malcolm",
      specialities: ["Mathematics"],
      availability: "Tue, Thu 10am-4pm",
    },
    {
      id: "3",
      name: "Dr. Ellie Sattler",
      specialities: ["Science", "Art"],
      availability: "Mon-Fri 9am-1pm",
    },
  ]);
  const { toast } = useToast();

  const handleAddTutor = (newTutorData: Omit<Tutor, "id">) => {
    const newTutor: Tutor = {
      id: crypto.randomUUID(),
      ...newTutorData,
    };
    setTutors((prev) => [...prev, newTutor]);
    toast({
      title: "Tutor Added",
      description: `${newTutor.name} has been added to the list.`,
    });
  };

  const handleRemoveTutor = (id: string) => {
    const tutorToRemove = tutors.find(tutor => tutor.id === id);
    setTutors((prev) => prev.filter((tutor) => tutor.id !== id));
    if (tutorToRemove) {
      toast({
        title: "Tutor Removed",
        description: `${tutorToRemove.name} has been removed.`,
      });
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-headline">
          TimeWise
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your intelligent assistant for creating perfect, conflict-free school timetables. Add your tutors, specify your classes, and let our AI do the heavy lifting.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>1. Add a Tutor</CardTitle>
              <CardDescription>Enter the details for each tutor available.</CardDescription>
            </CardHeader>
            <CardContent>
              <TutorForm onAddTutor={handleAddTutor} />
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>2. Manage Tutors</CardTitle>
              <CardDescription>View, filter, and remove tutors from your list.</CardDescription>
            </CardHeader>
            <CardContent>
              <TutorList tutors={tutors} onRemoveTutor={handleRemoveTutor} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-8 space-y-8">
           <TimetableGenerator tutors={tutors} />
        </div>
      </div>
    </main>
  );
}
