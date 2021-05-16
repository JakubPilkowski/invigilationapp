export default (regex: string | RegExp, value: string): boolean => {
  if (!regex) return true;
  if (!value) return true;
  return new RegExp(regex).test(value);
};
