require("dotenv").config({
  path: ".env"
});

module.exports = {
  siteMetadata: {
    siteTitleAlt: "Newt",
    siteUrl: "https://jsmiith.xyz/",
    siteDescription: "",
    siteLanguage: "en",
    siteImage: "/",
    author: "@amnewtt"
  },
  plugins: [
    {
      resolve: "@lekoarts/gatsby-theme-cara",
      options: {}
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID
      }
    },
    "gatsby-plugin-netlify"
  ]
};
