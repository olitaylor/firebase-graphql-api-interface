import React from "react"
import { Link } from "gatsby"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Table, Segment, Header } from 'semantic-ui-react'

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  query {
    products {
      id
      name
      isFull
      location
      meetAndGreet
      pricePerDay
    }
  }
`
class IndexPage extends React.Component {
  render() {

    return (

      <Layout>
        <SEO title="GraphQL manager" />
        <Header as='h2' attached='top'>Products</Header>

        <Query query={APOLLO_QUERY}>
          {({ data, loading, error }) => (
            <Segment attached>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  { data.products && data.products.map((product, index) => (
                    <Table.Row key={index}>
                      <Table.Cell error={product.isFull}>
                        <Link to={`/${product.id}/`}>{product.name}</Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          )}
        </Query>
      </Layout>
    )
  }
}

export default IndexPage