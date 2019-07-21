import React from "react"
import { Link, graphql } from "gatsby"
import get from 'lodash/get'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Table, Header, Segment } from 'semantic-ui-react'

class ProductView extends React.Component {
  render() {

    const product = get(this, 'props.data.productsApi.product')
    return (
      <Layout>
        <SEO title={product.name} />

        <Link className="ui button" to="/">Back</Link>

        <Header as='h2' attached='top'>
          {product.name}
        </Header>

        <Segment attached>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Capacity</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Meet and Greet</Table.HeaderCell>
                <Table.HeaderCell>Price per day</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell error={product.isFull}>{product.isFull ? 'Full' : 'Spaces'}</Table.Cell>
                <Table.Cell>{product.location}</Table.Cell>
                <Table.Cell>{product.meetAndGreet ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>&pound;{product.pricePerDay}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </Layout>
    )
  }
}

export default ProductView

export const pageQuery = graphql`
  query ProductQuery($name: String!) {
    productsApi {
      product(name: $name) {
        name
        isFull
        location
        meetAndGreet
        pricePerDay
      }
    }
  }
`

