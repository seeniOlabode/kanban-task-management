const getDefaultColorScheme = () => {
  let preferredScheme = "light";
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  preferredScheme = prefersDarkScheme.matches ? "dark" : "light";
  return preferredScheme;
};

export default getDefaultColorScheme;
