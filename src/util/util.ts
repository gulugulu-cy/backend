export function convertPackageKeysToCamelCase(pack) {
  const camelCase = str =>
    str.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  const converted = {};
  for (const key in pack) {
    // eslint-disable-next-line no-prototype-builtins
    if (pack.hasOwnProperty(key)) {
      const camelKey = camelCase(key);
      const value = pack[key];
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        converted[camelKey] = convertPackageKeysToCamelCase(value);
      } else if (Array.isArray(value)) {
        converted[camelKey] = value.map(v =>
          typeof v === 'object' && v !== null
            ? convertPackageKeysToCamelCase(v)
            : v
        );
      } else {
        converted[camelKey] = value;
      }
    }
  }
  return converted;
}
