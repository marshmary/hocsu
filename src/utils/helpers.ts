export function isEmptyObject(obj: Object) {
  return Object.values(obj).every((each) => !each);
}
