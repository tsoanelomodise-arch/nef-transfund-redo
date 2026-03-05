

## Website Testing Template

Create a dedicated testing checklist page at `/testing` that test users can use to systematically verify all website features. The page will have categorized test cases with pass/fail/skip toggles and optional notes, stored in localStorage so testers can resume.

### Structure

**New file: `src/pages/TestingChecklist.tsx`**

A single-page checklist with these test categories:

1. **Navigation** -- All navbar links, mobile menu, dropdowns, scroll-to-anchor behavior
2. **Pages Load** -- Each route loads without errors (Home, Path to Funding, Contacts, About, etc.)
3. **Contact Form** -- Form validation, submission, email recipient correctness
4. **PDF Downloads** -- TF Framework and Executive Summary links open correctly
5. **Eligibility & Document Checker** -- Quiz flows, modals, results display
6. **Responsive Design** -- Key pages on mobile/tablet/desktop
7. **Footer & Social Links** -- All footer links and social media icons work

Each test case will have:
- Description of what to test
- Expected result
- Pass / Fail / Skip radio buttons
- Optional notes textarea
- Visual status indicator (green/red/gray)

A summary bar at the top shows progress (e.g., "12/25 completed, 10 passed, 2 failed").

State persisted to `localStorage` so testers can close and resume.

**Route addition in `src/App.tsx`:**
- Add `/testing` route pointing to the new page

### Technical approach
- Pure React component with `useState` + `localStorage`
- No database needed -- this is a lightweight local tool
- Styled with existing Tailwind classes
- Print-friendly layout for PDF export via browser print

