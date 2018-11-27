import React from 'react';
import Home from './components/Home.js';

export const HouseIdContext = React.createContext({
  houseArr: [],
  currentHouse: {},
});

export default class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      home: true,
      mortgage: true,
      houseList: [this.props.rand],
      currentHouse: [this.props.current.getSome[0]],
      comparableHomes: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target) {
    this.setState({ [target]: !this.state[target] });
  }

  componentDidMount() {
    const randArr = [];
    while (randArr.length < 30) {
      const rand = Math.floor(Math.random() * 100);
      if (!this.state.houseList.includes(rand) && !randArr.includes(rand)) {
        randArr.push(rand);
      }
    }
    this.setState({ comparableHomes: randArr });
    const data = [...this.state.currentHouse];
    data.forEach(file => {
      file.zestimate = zestimate;
    })
    this.setState({currentHouse: data}, () => {
    })
    console.log(this.state.currentHouse)

  }


  render() {
    return (
      <HouseIdContext.Provider value={this.state}>
        <div>
          <Home
            status={this.state.home}
            expand={this.handleClick}
            current={this.state.currentHouse}
          />
        </div>
      </HouseIdContext.Provider>
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
