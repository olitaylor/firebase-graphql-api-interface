import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Layout from "../components/layout"
import SEO from "../components/seo"

import { Table, Header, Segment } from 'semantic-ui-react'

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  query Product($name: String!) {
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

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  query Product($name: String!) {
    product(name: $name) {
      name
      isFull
      location
      meetAndGreet
      pricePerDay
    }
  }
`

class ProductView extends React.Component {
  render() {
    return (
      <Query query={APOLLO_QUERY} variables={{ name: this.props.pageContext.name }}>
        {({ data, loading, error }) => (
          <Layout>
            { loading && <p>Loading products...</p> }
            { error && <p>Error: ${error.message}</p> }

            { data && data.product &&
              <Fragment>
                <SEO title={data.product.name} />
                <Link className="ui button" to="/">Back</Link>
                <Header as='h2' attached='top'>{data.product.name}</Header>

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
                        <Table.Cell error={data.product.isFull}>{data.product.isFull ? 'Full' : 'Spaces'}</Table.Cell>
                        <Table.Cell>{data.product.location}</Table.Cell>
                        <Table.Cell>{data.product.meetAndGreet ? "Yes" : "No"}</Table.Cell>
                        <Table.Cell>&pound;{data.product.pricePerDay}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Segment>
              </Fragment>
            }
          </Layout>
        )}
      </Query>
    )
  }
}

export default ProductView
