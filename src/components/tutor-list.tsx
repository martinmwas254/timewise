"use client";

import { useState } from "react";
import type { Tutor } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, User, Search, School } from "lucide-react";
import { SubjectBadge } from "./subject-badge";
import { ScrollArea } from "./ui/scroll-area";

type TutorListProps = {
  tutors: Tutor[];
  onRemoveTutor: (id: string) => void;
};

export function TutorList({ tutors, onRemoveTutor }: TutorListProps) {
  const [filter, setFilter] = useState("");

  const filteredTutors =
    filter.trim() === ""
      ? tutors
      : tutors.filter((tutor) =>
          tutor.specialities.some((s) =>
            s.toLowerCase().includes(filter.toLowerCase())
          )
        );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter by subject..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-10"
        />
      </div>
      {tutors.length > 0 ? (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <Card key={tutor.id} className="relative group transition-all hover:border-primary">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  onClick={() => onRemoveTutor(tutor.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove Tutor</span>
                </Button>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
                      <User className="h-5 w-5 text-secondary-foreground" />
                    </span>
                    {tutor.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {tutor.specialities.map((speciality, index) => (
                      <SubjectBadge key={index} subject={speciality} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-card-foreground">Availability:</span> {tutor.availability}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
             <div className="text-center py-10">
                <p className="text-muted-foreground">No tutors match your filter.</p>
             </div>
          )}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <School className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold">No tutors yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add a tutor using the form above to get started.
          </p>
        </div>
      )}
    </div>
  );
}
