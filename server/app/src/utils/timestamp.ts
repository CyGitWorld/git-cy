import { ConvertTimeType } from "./types";

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

export function convertTimestampToISOString<T extends TimestampedObject>(
  obj: T
): ConvertTimeType<T> {
  if (obj.createdAt != null) {
    (obj.createdAt as unknown as string) = new Date(
      obj.createdAt
    ).toISOString();
  }
  if (obj.updatedAt != null) {
    (obj.updatedAt as unknown as string) = new Date(
      obj.updatedAt
    ).toISOString();
  }
  return obj as unknown as ConvertTimeType<T>;
}
