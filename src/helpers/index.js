export const ucFirst = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : null;
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};