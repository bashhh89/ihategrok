export async function executeSlashCommand(command, currentSowData) {
    const trimmedCommand = command.trim();
    // Parse different slash commands
    if (trimmedCommand.startsWith('/newScope ')) {
        return handleNewScope(trimmedCommand, currentSowData);
    }
    else if (trimmedCommand.startsWith('/addRole ')) {
        return handleAddRole(trimmedCommand, currentSowData);
    }
    else if (trimmedCommand.startsWith('/setBudget ')) {
        return handleSetBudget(trimmedCommand, currentSowData);
    }
    else {
        throw new Error(`Unknown command: ${trimmedCommand}`);
    }
}
function handleNewScope(command, sowData) {
    // Extract scope name from "/newScope {scopeName}"
    const scopeName = command.replace('/newScope ', '').trim();
    if (!scopeName) {
        throw new Error('Scope name is required');
    }
    const newScope = {
        id: `scope-${Date.now()}`,
        scopeName,
        scopeOverview: `This scope covers ${scopeName.toLowerCase()} requirements and deliverables.`,
        deliverables: [`${scopeName} deliverable 1`, `${scopeName} deliverable 2`],
        assumptions: [`Client will provide necessary access for ${scopeName}`, `All required resources are available`],
        roles: [],
        subtotal: 0
    };
    return {
        ...sowData,
        scopes: [...(sowData.scopes || []), newScope]
    };
}
function handleAddRole(command, sowData) {
    // Parse "/addRole to {scopeId} {roleName} {hours}"
    const match = command.match(/\/addRole to (\S+) (.+) (\d+)/);
    if (!match) {
        throw new Error('Invalid addRole command format. Use: /addRole to {scopeId} {roleName} {hours}');
    }
    const [, scopeId, roleName, hoursStr] = match;
    const hours = parseInt(hoursStr, 10);
    if (isNaN(hours) || hours <= 0) {
        throw new Error('Hours must be a positive number');
    }
    const updatedScopes = sowData.scopes?.map((scope) => {
        if (scope.id === scopeId || scope.scopeName === scopeId) {
            const newRole = {
                name: roleName,
                description: `${roleName} responsibilities for ${scope.scopeName}`,
                hours,
                rate: roleName, // Will be resolved by rate card
                total: hours * 120 // Default rate estimation
            };
            const updatedRoles = [...(scope.roles || []), newRole];
            const subtotal = updatedRoles.reduce((sum, role) => sum + role.total, 0);
            return {
                ...scope,
                roles: updatedRoles,
                subtotal
            };
        }
        return scope;
    }) || [];
    return {
        ...sowData,
        scopes: updatedScopes
    };
}
function handleSetBudget(command, sowData) {
    // Extract budget from "/setBudget {amount}"
    const budgetMatch = command.match(/\/setBudget (\d+)/);
    if (!budgetMatch) {
        throw new Error('Invalid setBudget command format. Use: /setBudget {amount}');
    }
    const budget = parseInt(budgetMatch[1], 10);
    if (isNaN(budget) || budget <= 0) {
        throw new Error('Budget must be a positive number');
    }
    return {
        ...sowData,
        budgetNote: `Target budget: $${budget.toLocaleString()}. This scope has been carefully crafted to deliver maximum value within the specified budget constraints while ensuring all critical objectives are met.`
    };
}
