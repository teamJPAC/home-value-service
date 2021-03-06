import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Main from '../Main';

export const PreQuery = () => {
  let rand = [Math.floor(Math.random() * 100)];
  const houseId = Number(window.location.pathname.replace(/\//, ''));
  if (houseId && houseId >= 0 && houseId < 100) {
    rand = [houseId];
  }
  return (
    <Query
      query={gql`
        query Current($num: [Int]!) {
          getSome(num: $num) {
            address
            city
            beds
            baths
            sqft
            status
            taxassessment
          }
        }
      `}
      variables={{ num: rand }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error :(</p>;
        }
        return <Main current={data} num={rand} />;
      }}
    </Query>
  );
};
