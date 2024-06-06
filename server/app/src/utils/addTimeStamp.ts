interface TimestampedObject {
  createdAt: string;
  updatedAt: string;
}

export function addTimeStamp<T>(obj: T): T & TimestampedObject {
  const now = new Date().toISOString();
  return {
    ...obj,
    createdAt: now,
    updatedAt: now,
  };
}
