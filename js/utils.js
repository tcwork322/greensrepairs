/**
 * Generate URL-friendly slug from bike name (or any string).
 * @param {string} name
 * @returns {string}
 */
export function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
