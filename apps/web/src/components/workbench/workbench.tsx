'use client';

import { useSOWStore } from '@/stores/sow-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProjectSummary } from './project-summary';
import { ProjectScopes } from './project-scopes';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export function Workbench() {
  const { activeSow } = useSOWStore();

  if (!activeSow) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No SOW Selected</h2>
          <p className="text-muted-foreground mb-4">
            Select an existing SOW from the sidebar or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto h-full">
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <ProjectSummary />
        <ProjectScopes />
        {/* Additional sections will be added here */}
      </div>
    </div>
  );
}
