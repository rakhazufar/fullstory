import { v4 as uuidv4 } from "uuid";

export function generateSlug(name) {
  const uid = uuidv4();

  const firstName = name.split(" ")[0];
  const nameSlug = firstName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const idSuffix = uid.substring(uid.length - 5);
  return `${nameSlug}-${idSuffix}`;
}
