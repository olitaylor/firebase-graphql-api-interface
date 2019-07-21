import React from "react"
import { Link } from "gatsby"
import get from 'lodash/get'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Table, Segment, Header } from 'semantic-ui-react'

class IndexPage extends React.Component {
  render() {

    const products = get(this, 'props.data.productsApi.products')
    return (
      <Layout>
        <SEO title="GraphQL manager" />

        <Header as='h2' attached='top'>
          Products
        </Header>

        <Segment attached>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { products && products.map((product, index) => (
                <Table.Row key={index}>
                  <Table.Cell error={product.isFull}>
                    <Link to={`/${product.id}/`}>{product.name}</Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
         </Segment>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    productsApi {
      products {
        name
        id
        isFull
      }
    }
  }
`

