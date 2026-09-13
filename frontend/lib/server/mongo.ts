import { Collection, MongoClient } from "mongodb";

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || "shanbara_institute";

// في بيئة serverless يُعاد استخدام الاتصال بين الاستدعاءات المتتالية
// عبر تخزينه في global، لتفادي فتح اتصال جديد بكل طلب.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!MONGODB_URI) {
    throw new Error(
      "متغير البيئة MONGODB_URI غير معرّف. أضفه في إعدادات Vercel (Settings > Environment Variables)."
    );
  }
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

export async function getMessagesCollection(): Promise<Collection<ContactMessage>> {
  const client = await getClientPromise();
  const collection = client.db(DB_NAME).collection<ContactMessage>("messages");
  await collection.createIndex({ id: 1 }, { unique: true }).catch(() => {});
  return collection;
}
