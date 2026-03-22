# Google Sheets Database Setup

This project can use Google Sheets as the database for Events and Courses.

## 1) Prepare the Google Sheet

1. Open your sheet.
2. Create two tabs:
   - Events
   - Courses
3. Do not manually add headers; script will handle headers.

## 2) Create Apps Script

1. In Google Sheet: Extensions -> Apps Script.
2. Replace code with content from:
   - scripts/google-apps-script-events-courses.gs
3. Save.

## 3) Add API secret (recommended)

1. In Apps Script: Project Settings -> Script Properties.
2. Add property:
   - Key: API_SECRET
   - Value: any long random string

## 4) Deploy Apps Script Web App

1. Click Deploy -> New deployment.
2. Type: Web app.
3. Execute as: Me.
4. Who has access: Anyone.
5. Deploy and copy Web app URL.

## 5) URL is hardcoded in app

The current project hardcodes your Apps Script web app URL in:

- lib/events-courses.ts

So no Google env variable is required.

If your Apps Script URL changes in future, update that file and redeploy.

## Notes

- Admin add/remove updates Google Sheet rows.
- Public Events & Courses page reads data through server APIs.
- If secret is configured in script properties, add that same value in `APPS_SCRIPT_SECRET` constant inside `lib/events-courses.ts`.
