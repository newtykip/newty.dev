/** @jsx jsx */
import { Footer as ThemeFooter, jsx } from "theme-ui";
import Helmet from 'react-helmet';

const Footer = () => {
  return (
    <div>
      <Helmet>
        <style>
          {
            `a {
              color: #a0aea3;
            }`
          }
        </style>
      </Helmet>
      <ThemeFooter>
        Copyright &copy; {new Date().getFullYear()}. All rights reserved. Made with <a href="https://github.com/LekoArts">@lekoarts</a>'s Gatsby theme <a href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-cara">cara</a>.
      </ThemeFooter>
    </div>
  );
};

export default Footer;
