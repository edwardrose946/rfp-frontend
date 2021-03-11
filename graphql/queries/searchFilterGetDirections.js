import { gql } from '@apollo/client';

export const SEARCH_FILTER_GET_DIRECTIONS = gql`
query searchFilterGetDirections($list: String!, $postcode: String!, $radius: String!, $results: String!){
    searchFilterGetDirections(list: $list, postcode: $postcode, radius: $radius, results: $results) {
        EncodedPolyLine {
            points
        }
        addresses {
            LatLng {
                lat
                lng
            }
            firstLine
            postcode
        }
    }
}
`;