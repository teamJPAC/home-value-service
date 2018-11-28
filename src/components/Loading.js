import React from 'react';

const Loading = (props) => {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>;
  } else {
    return <div>Loading...</div>;
  }
}

export default Loading;
