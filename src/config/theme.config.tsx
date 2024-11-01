import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
