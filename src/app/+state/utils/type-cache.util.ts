/**
 * Local cache of registered action type constants. Used to ensure uniqueness
 */
const typeCache: { [label: string]: boolean } = {};

/**
 * Registers a Action Type within local cache
 *
 * @export
 * @template T Generic type for the action type. Recommended using a string variable
 * @param {(T | '')} label The action type to be registered
 * @returns {T} The action type for use within variables
 */
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}
