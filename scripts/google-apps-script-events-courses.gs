const EVENTS_SHEET_NAME = "Events";
const COURSES_SHEET_NAME = "Courses";

const EVENTS_HEADERS = [
  "id",
  "title",
  "date",
  "time",
  "attendees",
  "location",
  "description",
  "category",
  "price",
  "registrationLink",
];

const COURSES_HEADERS = [
  "id",
  "title",
  "price",
  "duration",
  "level",
  "students",
  "description",
  "modules",
  "featured",
  "dates",
  "time",
  "certificate",
  "registrationLink",
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const action = payload.action;
    const secret = payload.secret || "";

    const expectedSecret =
      PropertiesService.getScriptProperties().getProperty("API_SECRET") || "";

    if (expectedSecret && secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    if (action === "getData") {
      return jsonResponse({ ok: true, data: getData() });
    }

    if (action === "setData") {
      const data = payload.data || {};
      setData(data);
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, data: getData() });
}

function getData() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  const eventsSheet = ensureSheet(
    spreadsheet,
    EVENTS_SHEET_NAME,
    EVENTS_HEADERS,
  );
  const coursesSheet = ensureSheet(
    spreadsheet,
    COURSES_SHEET_NAME,
    COURSES_HEADERS,
  );

  const events = readRows(eventsSheet, EVENTS_HEADERS).map((row) => ({
    ...row,
    attendees: Number(row.attendees || 0),
  }));

  const courses = readRows(coursesSheet, COURSES_HEADERS).map((row) => ({
    ...row,
    students: Number(row.students || 0),
    featured: String(row.featured).toLowerCase() === "true",
    certificate: String(row.certificate).toLowerCase() === "true",
    modules: parseJsonArray(row.modules),
    dates: parseJsonArray(row.dates),
  }));

  return { events, courses };
}

function setData(data) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const eventsSheet = ensureSheet(
    spreadsheet,
    EVENTS_SHEET_NAME,
    EVENTS_HEADERS,
  );
  const coursesSheet = ensureSheet(
    spreadsheet,
    COURSES_SHEET_NAME,
    COURSES_HEADERS,
  );

  const events = Array.isArray(data.events) ? data.events : [];
  const courses = Array.isArray(data.courses) ? data.courses : [];

  writeRows(
    eventsSheet,
    EVENTS_HEADERS,
    events.map((event) => ({
      ...event,
      attendees: Number(event.attendees || 0),
    })),
  );

  writeRows(
    coursesSheet,
    COURSES_HEADERS,
    courses.map((course) => ({
      ...course,
      students: Number(course.students || 0),
      featured: Boolean(course.featured),
      certificate: Boolean(course.certificate),
      modules: JSON.stringify(
        Array.isArray(course.modules) ? course.modules : [],
      ),
      dates: JSON.stringify(Array.isArray(course.dates) ? course.dates : []),
    })),
  );
}

function ensureSheet(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const existingHeaders = headerRange.getValues()[0];

  if (existingHeaders.join("|") !== headers.join("|")) {
    headerRange.setValues([headers]);
  }

  return sheet;
}

function readRows(sheet, headers) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();

  return values
    .filter((row) => String(row[0] || "").trim() !== "")
    .map((row) => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = row[index];
      });
      return record;
    });
}

function writeRows(sheet, headers, records) {
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  if (!records.length) {
    return;
  }

  const values = records.map((record) =>
    headers.map((header) => record[header] ?? ""),
  );
  sheet.getRange(2, 1, values.length, headers.length).setValues(values);
}

function parseJsonArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  const text = String(value || "").trim();
  if (!text) {
    return [];
  }

  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
