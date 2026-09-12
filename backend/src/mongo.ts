import { Collection, MongoClient } from "mongodb";
import type { ContactMessage } from "./db.js";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || "shanbara_institute";

if (!MONGODB_URI) {
  throw new Error(
    "متغير البيئة MONGODB_URI غير معرّف. أضفه في ملف .env محليًا أو في إعدادات الاستضافة."
  );
}

let clientPromise: Promise<MongoClient> | null = null;

function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const client = new MongoClient(MONGODB_URI as string);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getMessagesCollection(): Promise<Collection<ContactMessage>> {
  const client = await getClient();
  const collection = client.db(DB_NAME).collection<ContactMessage>("messages");
  // فهرس فريد على معرف الرسالة، ينشأ مرة واحدة فقط ثم يُتجاهل تلقائيًا في المرات التالية
  await collection.createIndex({ id: 1 }, { unique: true }).catch(() => {});
  return collection;
}
