"use client";

import { Badge } from "@/components/ui/badge";
import { Calculator, FlaskConical, ScrollText, BookOpenText, Palette, Music, Dumbbell, Book } from 'lucide-react';
import type { ReactElement } from "react";

const getSubjectIcon = (subject: string): ReactElement => {
  const s = subject.toLowerCase().trim();
  if (s.includes('math')) return <Calculator className="h-4 w-4" />;
  if (s.includes('science')) return <FlaskConical className="h-4 w-4" />;
  if (s.includes('history')) return <ScrollText className="h-4 w-4" />;
  if (s.includes('english') || s.includes('literature')) return <BookOpenText className="h-4 w-4" />;
  if (s.includes('art')) return <Palette className="h-4 w-4" />;
  if (s.includes('music')) return <Music className="h-4 w-4" />;
  if (s.includes('physical education') || s.includes('pe') || s.includes('gym')) return <Dumbbell className="h-4 w-4" />;
  return <Book className="h-4 w-4" />;
};

export const SubjectBadge = ({ subject }: { subject: string }) => {
    return (
        <Badge variant="secondary" className="gap-1.5 pl-2 pr-3 text-secondary-foreground inline-flex items-center">
            {getSubjectIcon(subject)}
            {subject}
        </Badge>
    );
}
