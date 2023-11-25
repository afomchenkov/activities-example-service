import gql from 'graphql-tag';

export default gql`
  query ActivitiesList($limit: Float!, $offset: Float!, $search: String!) {
    activitiesList(limit: $limit, offset: $offset, search: $search) {
      totalCount
      offset
      activities {
        id
        title
        price
        currency
        rating
        specialOffer
        supplier {
          name
          address
          zip
          city
          country
        }
      }
    }
  }
`;
