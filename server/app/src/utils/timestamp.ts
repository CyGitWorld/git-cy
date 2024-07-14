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
): Omit<T, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} {
  if (obj.createdAt != null) {
    (obj.createdAt as unknown as string) = new Date(
      obj.createdAt
    ).toISOString();
  }
  if (obj.updatedAt != null) {
    (obj.createdAt as unknown as string) = new Date(
      obj.updatedAt
    ).toISOString();
  }
  return obj as unknown as Omit<T, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  };
}
