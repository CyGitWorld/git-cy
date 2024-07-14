
export type ConvertTimeType<T extends { createdAt: number; updatedAt: number }> = Omit<
  T,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};
