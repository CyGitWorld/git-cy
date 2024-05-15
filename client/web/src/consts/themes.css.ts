import { createTheme } from "@vanilla-extract/css";

const [theme, vars] = createTheme({
  color: {
    surface: '0px 0px / 100% no-repeat rgb(198, 198, 198)',
    primaryContainer: 'rgb(137, 176, 168)',
    primaryContainerBorder: 'rgb(162, 199, 192) rgb(5, 6, 8) rgb(5, 6, 8) rgb(162, 199, 192)',
  },
  shadow: {
    primaryContainer: 'rgb(206, 232, 227) 1px 1px 0px 1px inset, rgb(82, 109, 103) -1px -1px 0px 1px inset'
  }
});

export {
  theme,
  vars
}
