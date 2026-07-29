/**
 * Epigroww Global — Master Form Sheet receiver.
 *
 * Paste this entire file into the Apps Script editor that is bound to the
 * master Google Sheet, then deploy it as a Web App (instructions in the chat
 * message / README). It receives form submissions from the website's
 * /api/forms route and writes them into clearly-labelled, auto-formatted tabs.
 *
 * Three tabs are created and maintained automatically:
 *   • "Contact — Project Briefs"
 *   • "Careers — Applications"
 *   • "Brand Discovery — Questionnaire"
 *
 * Security: every request must carry the shared secret. Set it once below and
 * use the SAME value in the site's GOOGLE_SHEETS_SHARED_SECRET env var.
 */

// 1) CHANGE THIS to a long random string, and put the SAME value in your
//    website's GOOGLE_SHEETS_SHARED_SECRET environment variable.
var SHARED_SECRET = "CHANGE_ME_TO_A_LONG_RANDOM_SECRET";

var SHEETS = {
  contact: {
    name: "Contact — Project Briefs",
    headers: [
      "Received (IST)",
      "Topic",
      "Full Name",
      "Work Email",
      "Company",
      "Role",
      "Budget",
      "Brief",
      "Source Page",
    ],
    headerColor: "#1f6feb",
    row: function (d, ts, page) {
      return [ts, d.topic, d.name, d.email, d.company, d.role, d.budget, d.brief, page];
    },
  },
  careers: {
    name: "Careers — Applications",
    headers: [
      "Received (IST)",
      "First Name",
      "Last Name",
      "Email",
      "Craft / Role",
      "Why Epigroww",
      "Source Page",
    ],
    headerColor: "#2da44e",
    row: function (d, ts, page) {
      return [ts, d.firstName, d.lastName, d.email, d.craft, d.why, page];
    },
  },
  questionnaire: {
    name: "Brand Discovery — Questionnaire",
    headers: [
      "Received (IST)",
      "Full Name",
      "Work Email",
      "Brand / Company",
      "Role",
      "Website / Instagram",
      "Phone / WhatsApp",
      "3–5 Year Vision (India)",
      "Year 1 Business Goals",
      "Categories & Hero SKUs",
      "Key USP / Differentiation",
      "Primary Target Audience",
      "Consumer Problem Solved",
      "Market Positioning",
      "Expected Price Range",
      "Launch Channels",
      "Distribution Notes",
      "Year 1 Marketing Budget",
      "Priority Channels / Activities",
      "Existing Brand Assets",
      "Success KPIs",
      "KPI Targets",
      "Competitors / Benchmarks",
      "Timelines & Constraints",
      "Manufacturing Origin",
      "Import Model / Country",
      "India Ops Setup",
      "Ops Notes",
      "Existing India Partners",
      "Source Page",
    ],
    headerColor: "#8250df",
    row: function (d, ts, page) {
      return [
        ts,
        d.name,
        d.email,
        d.brand,
        d.role,
        d.websiteUrl,
        d.phone,
        d.vision,
        d.yearOneGoals,
        d.categories,
        d.usp,
        d.audience,
        d.consumerProblem,
        d.positioning,
        d.priceRange,
        d.channels,
        d.channelsNote,
        d.budget,
        d.priorityChannels,
        d.brandAssets,
        d.kpis,
        d.kpisNote,
        d.competitors,
        d.timelines,
        d.manufacturing,
        d.importModel,
        d.opsSetup,
        d.opsNote,
        d.partners,
        page,
      ];
    },
  },
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // serialise writes so concurrent submits don't collide
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: "No data" });
    }

    var body = JSON.parse(e.postData.contents);

    if (body.secret !== SHARED_SECRET) {
      return json({ ok: false, error: "Unauthorized" });
    }

    var config = SHEETS[body.formType];
    if (!config) {
      return json({ ok: false, error: "Unknown form" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrCreateSheet(ss, config);

    var ts = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var page = body.page || "";
    var d = body.data || {};

    sheet.appendRow(config.row(d, ts, page));

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Health check so visiting the URL in a browser confirms the deployment works.
function doGet() {
  return json({ ok: true, service: "Epigroww form receiver" });
}

function getOrCreateSheet(ss, config) {
  var sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }

  // Ensure the header row exists and is formatted (idempotent).
  var firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell !== config.headers[0]) {
    sheet.clear();
    var headerRange = sheet.getRange(1, 1, 1, config.headers.length);
    headerRange.setValues([config.headers]);
    headerRange
      .setFontWeight("bold")
      .setFontColor("#ffffff")
      .setBackground(config.headerColor)
      .setVerticalAlignment("middle");
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 34);
    for (var i = 1; i <= config.headers.length; i++) {
      sheet.setColumnWidth(i, i === 1 ? 160 : 200);
    }
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
