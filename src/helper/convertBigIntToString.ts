/* eslint-disable @typescript-eslint/no-explicit-any */
const convertBigIntToString = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "bigint") return obj.toString();

  if (obj instanceof Date) return obj.toISOString();

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }

  if (typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = convertBigIntToString(obj[key]);
      return acc;
    }, {} as any);
  }

  return obj;
};

export default convertBigIntToString;
