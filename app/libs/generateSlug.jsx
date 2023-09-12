export default function generateSlug(name, id) {
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const idSuffix = id.substring(id.length - 3); // Ambil 3 karakter terakhir dari ID
  return `${nameSlug}-${idSuffix}`;
}
