const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = {
    product: path.resolve('./src/templates/product.js'),
  }

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          productsApi {
            products {
              name
              id
            }
          }
        }
      `).then(result => {

        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Product page
        const productView = result.data.productsApi.products
        productView.forEach(link => {
          createPage({
            path: `/${link.id}/`,
            component: pages.product,
            context: {
              name: link.name
            }
          })
        })
      })
    )
  })
}