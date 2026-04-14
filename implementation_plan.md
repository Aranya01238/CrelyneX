# Implementation Plan - Architects Management Section

Add a new section to the admin portal (ID: CrelyneX) to manage (Add, Remove, Modify) "The Architects" section that appears on the About page.

## Proposed Changes

### Data & Persistence
- [NEW] `data/architects.json` - Store the architect data (moved from hardcoded array in About page).
- [NEW] `lib/architects.ts` - Utility functions for reading and writing architect data.

### API Layer
- [NEW] `app/api/architects/route.ts` - Public GET route (for the About page).
- [NEW] `app/api/admin/architects/route.ts` - Protected CRUD routes (POST, PATCH, DELETE) for the admin portal.

### Components
- [NEW] `components/admin-architects-manager.tsx` - A new dashboard component for the admin portal to manage architects.

### Integration
- [MODIFY] [admin/page.tsx](file:///d:/CrelyneX/app/admin/page.tsx) - Add a new "Architects" tab and integrate the `AdminArchitectsManager` component.
- [MODIFY] [about/page.tsx](file:///d:/CrelyneX/app/about/page.tsx) - Fetch team data from `/api/architects` instead of using the hardcoded `team` array.

## Verification Plan

### Automated Tests
- Test API routes to ensure CRUD operations work and are protected.
- Verify that `data/architects.json` is updated correctly.

### Manual Verification
- Log in to the Admin portal (ID: CrelyneX).
- Navigate to the new "Architects" tab.
- Perform Add, Edit, and Delete operations.
- Verify changes are reflected on the `/about` page.
- Ensure only authorized administrators can access the architects management API.
