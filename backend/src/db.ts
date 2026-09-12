import { getMessagesCollection } from "./mongo.js";

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export async function readMessages(): Promise<ContactMessage[]> {
  const collection = await getMessagesCollection();
  const docs = await collection
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
  return docs;
}

export async function addMessage(msg: ContactMessage): Promise<ContactMessage> {
  const collection = await getMessagesCollection();
  await collection.insertOne(msg);
  return msg;
}

export async function markRead(id: string): Promise<ContactMessage | null> {
  const collection = await getMessagesCollection();
  const result = await collection.findOneAndUpdate(
    { id },
    { $set: { read: true } },
    { returnDocument: "after", projection: { _id: 0 } }
  );
  return result ?? null;
}

export async function deleteMessage(id: string): Promise<boolean> {
  const collection = await getMessagesCollection();
  const result = await collection.deleteOne({ id });
  return result.deletedCount === 1;
}
