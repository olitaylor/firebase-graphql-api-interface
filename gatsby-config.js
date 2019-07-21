module.exports = {
  siteMetadata: {
    title: `GraphQL manager`,
    description: `GrpaphQl api interface`,
    author: `@olivertaylor`,
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
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "productsApi",
        // This is field under which it's accessible
        fieldName: "productsApi",
        // Url to query from
        url: "https://us-central1-graphql-api-3d27c.cloudfunctions.net/products",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
  ],
}
