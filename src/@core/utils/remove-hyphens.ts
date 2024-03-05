export const removeHyphens = (text: string) => {
  const hyphenWithoutSpaceRegex = new RegExp(/(?<=\S)-(?=\S)/g);
  return text.replace(hyphenWithoutSpaceRegex, '');
};
