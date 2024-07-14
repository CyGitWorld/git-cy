interface TimestampedObject {
  createdAt: number;
  updatedAt: number;
}

export function addTimeStamp<T>(obj: T): T & TimestampedObject {
  const now = new Date().getTime();
  return {
    ...obj,
    createdAt: now,
    updatedAt: now,
  };
}

export function convertTimestampToISOString(obj: Partial<TimestampedObject>) {
  if (obj.createdAt != null) {
    obj.createdAt = new Date(obj.createdAt).toISOString();
  }
  if (obj.updatedAt != null) {
    obj.updatedAt = new Date(obj.updatedAt).toISOString();
  }
}
