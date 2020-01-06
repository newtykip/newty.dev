/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import React from "react";
import { withPrefix } from "gatsby";
import Helmet from "react-helmet";

const NotFoundPage = () => (
  <div>
    <Helmet>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      <script src={withPrefix("404.js")} type="text/javascript"></script>

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/font-hack/2.018/css/hack.min.css" />
      <link rel="stylesheet" type="text/css" href={withPrefix("404.css")} />
    </Helmet>

    <div class="text__error" data-text="404 (╯°□°）╯︵ ┻━┻"></div>
    <div class="text__link">
      <a data-text="The requested file couldn't be found."></a>
    </div>
  </div>
);

export default NotFoundPage;
