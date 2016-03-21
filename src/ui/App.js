import React from 'react';
import _ from 'lodash';

const BRICKS_CLASSES = {
  1: 'lg',
  2: 'md',
  3: 'sm',
  4: 'xs'
};

const App = props => {
  const data = props.data;

  const segments = _.groupBy(data, 'segment');

  const piramid = _.map(segments, segment => {
    const rows = _.groupBy(segment, 'row');
    const mappedRows = _.map(rows, row => {
      const mappedRow = _.map(row, brick => {
        const brickClass = `brick ${BRICKS_CLASSES[brick.segment]}`;
        return <span className={brickClass}></span>
      })
      return <div className="row">{mappedRow}</div>
    })
    return <div className="segment">{mappedRows}</div>
  })

  return (
    <div>
      {piramid}
    </div>
  )
}

export default App;