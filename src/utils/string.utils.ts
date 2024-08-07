const trimIfEmptyOrSpaces = (str: string) => {
  const trimmedStr = str.trim();
  return trimmedStr === "" ? trimmedStr : str;
};

export { trimIfEmptyOrSpaces };
