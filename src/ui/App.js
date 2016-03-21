import React from 'react';
import _ from 'lodash';

const App = props => {
  const data = props.data;

  const segments = _.groupBy(data, 'segment');

  const piramid = _.map(segments, segment => {
    const rows = _.groupBy(segment, 'row');
    const mappedRows = _.map(rows, row => {
      const mappedRow = _.map(row, brick => {
        return <span className="brick">B</span>
      })
      return <div className="row">R{mappedRow}</div>
    })
    return <div className="segment">S{mappedRows}</div>
  })

  return (
    <div>
      {piramid}
    </div>
  )
}

export default App;