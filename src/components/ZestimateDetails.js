import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ComparableHomes from './ComparableHomes';
import LocalSalePrices from './LocalSalePrices';
import ZestimateChart from './ZestimateChart.js';
import GraphNavbar from './GraphNavbar.js';
import LocalTaxAssessments from './LocalTaxAssessments.js';
import MarketAppreciation from './MarketAppreciation.js';
import { HouseIdContext } from '../Main';

export default class ZestimateDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comparableHomes: false,
      localSalePrices: false,
      localTaxAssessments: false,
      marketAppreciation: false,
      comparableAverage: 0,
      localSaleAverage: 0,
      recalculate: true,
      houses: [],
    };
    this.expandComparable = this.expandComparable.bind(this);
    this.expandLocalSale = this.expandLocalSale.bind(this);
    this.expandLocalTax = this.expandLocalTax.bind(this);
    this.expandMarket = this.expandMarket.bind(this);
  }

  expandComparable() {
    this.setState({
      comparableHomes: !this.state.comparableHomes,
      recalculate: false,
    });
  }

  expandMarket() {
    this.setState({ marketAppreciation: !this.state.marketAppreciation });
  }

  expandLocalSale() {
    this.setState({ localSalePrices: !this.state.localSalePrices });
  }

  expandLocalTax() {
    this.setState({ localTaxAssessments: !this.state.localTaxAssessments });
  }

  render() {
    return (
      <HouseIdContext.Consumer>
        {({ comparableHomes, currentHouse }) => (
          <Query
            query={gql`
              query getTen($num: [Int]!) {
                getSome(num: $num) {
                  id
                  address
                  beds
                  baths
                  sqft
                  status
                  taxassessment
                }
              }
            `}
            variables={{ num: comparableHomes }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return 'Loading...';
              }
              if (error) {
                return `Error! ${error.message}`;
              }
              data = data.getSome;

              //load zestimate into data
              data.forEach(d => {
                d["zestimate"] = zestimate;
              });

              const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

              if (!this.state.comparableAverage && this.state.recalculate) {
                this.state.houses = data;
                this.state.comparableAverage = numberWithCommas(
                  Math.floor(
                    data
                      .slice(0, 10)
                      .reduce(
                        (acc, cur) => acc + cur.zestimate[cur.zestimate.length - 1],
                        0,
                      ) / 10,
                  ),
                );
                this.state.localSaleAverage = numberWithCommas(
                  Math.floor(
                    data
                      .slice(10, 20)
                      .reduce(
                        (acc, cur) => acc + cur.zestimate[cur.zestimate.length - 1],
                        0,
                      ) / 10,
                  ),
                );
              }

              currentHouse[0].taxassessment = Math.floor(
                currentHouse[0].taxassessment,
              );

              const lastSold = currentHouse[0].zestimate.slice(-49)[0];
              const marketAppValue = currentHouse[0].zestimate[currentHouse[0].zestimate.length - 1];

              return (
                <div id="expand-zestimate-details-container">
                  <div id="inside-zestimate-summary-container">
                    <h3 id="inside-zestimate-title">Inside the Zestimate</h3>
                    <p id="inside-zestimate-description">
                      The Zestimate is Zillow’s best estimate of a home’s value.
                      It is based on a blend of valuation methods, each of which
                      may produce a different estimate depending on the
                      available data.
                    </p>
                    <h4 id="estimate-based-on-title">Estimate based on</h4>
                    <div id="zestimate-subcat-container">
                      <section
                        className="expand-subcontainer"
                        id="expand-comparable"
                        onClick={this.expandComparable}
                      >
                        <div className="zestimate-detail-summary">
                          <span className="zestimate-detail-spacing" />
                          <div className="zestimate-detail-title">
                            <span className="zestimate-detail-label">
                              Comparable homes
                            </span>
                            <span id="comparable-homes-average">
                              $
                              {this.state.comparableAverage}
                            </span>
                            {this.state.comparableHomes ? (
                              <img
                                className="zest-chev"
                                src="https://s3-us-west-1.amazonaws.com/housing-hr/down.png"
                              />
                            ) : (
                                <img
                                  className="zest-chev"
                                  src="https://s3-us-west-1.amazonaws.com/housing-hr/up.png"
                                />
                              )}
                          </div>
                        </div>
                      </section>
                      {this.state.comparableHomes && (
                        <ComparableHomes
                          // comparable={this.props.comparable}
                          houses={this.state.houses}
                        />
                      )}
                      <section
                        className="expand-subcontainer"
                        id="expand-tax-assessment"
                        onClick={this.expandLocalTax}
                      >
                        <div className="zestimate-detail-summary">
                          <span className="zestimate-detail-spacing" />
                          <div className="zestimate-detail-title">
                            <span className="zestimate-detail-label">
                              Local tax assessments
                            </span>
                            {' '}
                            <span id="local-sale-prices-average">
                              $
                              {numberWithCommas(
                                Math.floor(currentHouse[0].taxassessment),
                              )}
                            </span>
                            {this.state.localTaxAssessments ? (
                              <img
                                className="zest-chev"
                                src="https://s3-us-west-1.amazonaws.com/housing-hr/down.png"
                              />
                            ) : (
                                <img
                                  className="zest-chev"
                                  src="https://s3-us-west-1.amazonaws.com/housing-hr/up.png"
                                />
                              )}
                          </div>
                        </div>
                      </section>
                      {this.state.localTaxAssessments && (
                        <LocalTaxAssessments
                          houses={this.state.houses}
                          taxAssessment={currentHouse[0].taxassessment}
                        />
                      )}
                      <section
                        className="expand-subcontainer"
                        id="expand-market"
                        onClick={this.expandMarket}
                      >
                        <div className="zestimate-detail-summary">
                          <span className="zestimate-detail-spacing" />
                          <div className="zestimate-detail-title">
                            <span className="zestimate-detail-label">
                              Market appreciation
                            </span>
                            {' '}
                            <span id="local-sale-prices-average">
                              $
                              {numberWithCommas(marketAppValue)}
                            </span>
                            {this.state.marketAppreciation ? (
                              <img
                                className="zest-chev"
                                src="https://s3-us-west-1.amazonaws.com/housing-hr/down.png"
                              />
                            ) : (
                                <img
                                  className="zest-chev"
                                  src="https://s3-us-west-1.amazonaws.com/housing-hr/up.png"
                                />
                              )}
                          </div>
                        </div>
                      </section>
                      {this.state.marketAppreciation && (
                        <MarketAppreciation
                          houses={this.state.houses}
                          market={currentHouse[0].zestimate}
                        />
                      )}
                      <section
                        className="expand-subcontainer"
                        id="expand-local-sale"
                        onClick={this.expandLocalSale}
                      >
                        <div className="zestimate-detail-summary">
                          <span className="zestimate-detail-spacing" />
                          <div className="zestimate-detail-title">
                            <span className="zestimate-detail-label">
                              Local sale prices
                            </span>
                            {' '}
                            <span id="local-sale-prices-average">
                              $
                              {this.state.localSaleAverage}
                            </span>
                            {this.state.localSalePrices ? (
                              <img
                                className="zest-chev"
                                src="https://s3-us-west-1.amazonaws.com/housing-hr/down.png"
                              />
                            ) : (
                                <img
                                  className="zest-chev"
                                  src="https://s3-us-west-1.amazonaws.com/housing-hr/up.png"
                                />
                              )}
                          </div>
                        </div>
                      </section>
                      {this.state.localSalePrices && (
                        <LocalSalePrices houses={this.state.houses} />
                      )}
                      <br />
                      <a
                        href=""
                        rel="nofollow"
                        className="zestimate-accuracy-link"
                      >
                        Add seller comment
                      </a>
                      {this.props.graph && (
                        <GraphNavbar
                          selected={this.props.selected}
                          handleClick={this.props.getSelected}
                        />
                      )}
                      {this.props.graph && (
                        <ZestimateChart selected={this.props.selected} />
                      )}
                      <a
                        id="close-zestimate-details"
                        onClick={this.props.collapse}
                      >
                        Close
                        {'  '}
                        <span id="close-zestimate-details-icon">
                          <b>^</b>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            }}
          </Query>
        )}
      </HouseIdContext.Consumer>
    );
  }
}


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

const zestimate = zestHistory()
