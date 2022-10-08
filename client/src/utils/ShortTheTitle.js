export const shortTheTitle = (text, limit = 15) => {
  return text.slice(0, limit) + (text.length > limit ? "..." : "");
};
