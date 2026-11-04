import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";


const SHEET_NAME = "Subscribers";
const HEADERS = ["Email", "Subscribed at (IST)"];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_PATH = process.env.SUBSCRIBERS_FILE
  ? path.resolve(process.env.SUBSCRIBERS_FILE)
  : path.join(__dirname, "..", "data", "subscribers.xlsx");

const knownEmails = new Set(); // emails already in the file (to detect duplicates fast)
let queue = Promise.resolve(); // makes sure only one write happens at a time

// Run once when the server starts: creates the file if needed, loads existing emails.
export async function initStorage() {
  fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });

  const workbook = new ExcelJS.Workbook();

  if (!fs.existsSync(FILE_PATH)) {
    const sheet = workbook.addWorksheet(SHEET_NAME);
    sheet.columns = [
      { header: HEADERS[0], key: "email", width: 40 },
      { header: HEADERS[1], key: "at", width: 26 },
    ];
    sheet.getRow(1).font = { bold: true };
    await workbook.xlsx.writeFile(FILE_PATH);
    return;
  }

  await workbook.xlsx.readFile(FILE_PATH);
  const sheet = workbook.getWorksheet(SHEET_NAME) ?? workbook.worksheets[0];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip the header row
    const value = row.getCell(1).text;
    if (value) knownEmails.add(value.trim().toLowerCase());
  });
}

export function addSubscriber(email) {
  const task = queue.then(async () => {
    if (knownEmails.has(email)) return false;

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(FILE_PATH);
    const sheet = workbook.getWorksheet(SHEET_NAME) ?? workbook.worksheets[0];

    const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    sheet.addRow([email, time]);

    const tempPath = `${FILE_PATH}.tmp`;
    await workbook.xlsx.writeFile(tempPath);
    fs.renameSync(tempPath, FILE_PATH);

    knownEmails.add(email);
    return true;
  });

  queue = task.catch(() => {}); 
  return task;
}