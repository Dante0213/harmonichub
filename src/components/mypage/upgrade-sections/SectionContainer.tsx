
import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
}

export function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className="rounded-lg border border-muted p-4 transition-colors hover:bg-muted/30">
      {children}
    </div>
  );
}
