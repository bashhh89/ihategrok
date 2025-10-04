export type { SOW, Message, RateCardItem } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
export declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export interface Role {
    name: string;
    description: string;
    hours: number;
    rate: number;
    total: number;
}
export interface Scope {
    scopeName: string;
    scopeOverview: string;
    deliverables: string[];
    assumptions: string[];
    roles: Role[];
    subtotal: number;
}
export interface SOWData {
    projectTitle: string;
    clientName: string;
    projectOverview: string;
    projectOutcomes: string[];
    scopes: Scope[];
    budgetNote?: string;
}
//# sourceMappingURL=index.d.ts.map