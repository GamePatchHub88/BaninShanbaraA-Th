import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
}

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, "[]", "utf-8");
}

export function readMessages(): ContactMessage[] {
  ensureStore();
  const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
  try {
    return JSON.parse(raw) as ContactMessage[];
  } catch {
    return [];
  }
}

export function writeMessages(messages: ContactMessage[]) {
  ensureStore();
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

export function addMessage(msg: ContactMessage) {
  const all = readMessages();
  all.unshift(msg);
  writeMessages(all);
  return msg;
}

export function markRead(id: string) {
  const all = readMessages();
  const idx = all.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  all[idx].read = true;
  writeMessages(all);
  return all[idx];
}

export function deleteMessage(id: string) {
  const all = readMessages();
  const next = all.filter((m) => m.id !== id);
  writeMessages(next);
  return next.length !== all.length;
}
