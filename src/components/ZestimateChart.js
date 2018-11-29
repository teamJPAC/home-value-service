import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import HomeChart from './HomeChart.js';
import { HouseIdContext } from '../Main';

const ZestimateChart = ({ selected }) => (
  <HouseIdContext.Consumer>
    {({ houseList, currentHouse }) => {
      while (houseList.length < 3) {
        const rand = Math.floor(Math.random() * 100);
        if (!houseList.includes(rand)) {
          houseList.unshift(rand);
        }
      }
      houseList.pop()
      return (
        <Query
          query={gql`
            query Homes($num: [Int]!) {
              getSome(num: $num) {
                id
              }
            }
          `}
          variables={{ num: houseList }}
        >
          {({ loading, error, data }) => {

            if (loading) {
              return <p>Loading...</p>;
            }

            if (error) {
              return <p>Error :( {error.message}</p>;
            }

            if(data.getSome !== undefined){
              currentHouse.data = data.getSome
            }

            data = currentHouse.data;
        if (data !== undefined) {
              //load zestimate into data
              data.forEach(d => {
                d["zestimate"] = zestHistory();
              });
            } else {
              return 'FAILED DATA Loading...'
            }

            const current = currentHouse[0].zestimate;
            while (current.length < 132) {
              current.unshift(null);
            }
            const dashed = data[1].zestimate;
            while (dashed.length < 132) {
              dashed.unshift(null);
            }
            const rand = data[0].zestimate;
            while (rand.length < 132) {
              rand.unshift(null);
            }

            let count = 1;
            const monthsArr = Array.from({ length: 132 }, () => moment()
              .subtract(count++, 'months')
              .format('MM/YY')).reverse();

            let formatted = rand.map((zest, idx) => ({
              name: monthsArr[Math.floor(idx)],
              'This House': current[idx],
              Wakanda: zest,
              Narnia: dashed[idx],
            }));

            if (selected === 5) {
              formatted = formatted.slice(-60);
            } else if (selected === 1) {
              formatted = formatted.slice(-12);
            }
            return <HomeChart data={formatted} />;
          }}
        </Query>
      );
    }}
  </HouseIdContext.Consumer>
);

export default ZestimateChart;

const random = num => Math.ceil(Math.random() * num);

const zestHistory = () => {
  let total = 300000;
  const years = 8 + random(2);
  const months = random(12);
  let count = 0;
  const spike = [12, 7, 12, 5, 8, 5, 14, 3, 19, 1000];
  const slope = [
    -4000,
    -3000,
    -1000,
    2000,
    5000,
    2000,
    5000,
    3000,
    10000,
    7000,
    700,
    -700,
  ];
  let moreSlope = 0;

  return Array.from({ length: years * 12 + months }, () => {
    count++;
    if (count % spike[0] === 0) {
      const rand = random(4);
      moreSlope = rand > 2 ? 2000 : rand === 2 ? -2000 : 0;
      if (spike[0] === 14) {
        moreSlope = 8000;
      }
      spike.shift();
    }
    total += slope[Math.floor(count / 12)] + moreSlope;

    return total + random(7000);
  });
};
