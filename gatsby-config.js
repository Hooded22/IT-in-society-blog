module.exports = {
  siteMetadata: {
    title: `ITense`,
    description: `Informatyk w społeczeństwie to wielki tygiel, w którym znajdziecie opowiadania, naukę algorytów, języków programowania wiele więcej.`,
    author: `Przemyslaw Sipta`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ITense Blog`,
        short_name: `ITense`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#166363`,
        display: `minimal-ui`,
        icon: `src/images/icon3.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
