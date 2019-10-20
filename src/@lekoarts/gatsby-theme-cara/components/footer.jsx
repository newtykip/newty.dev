/** @jsx jsx */
import { Footer as ThemeFooter, jsx } from "theme-ui";

const Footer = () => {
  return (
    <ThemeFooter>
      Copyright &copy; {new Date().getFullYear()}. All rights reserved.
    </ThemeFooter>
  );
};

export default Footer;
