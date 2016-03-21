import React from 'react';
import _ from 'lodash';

const LOGIN = 'buyonebrickcom';
const IS_TEST = 1;
const OUT_SUM_CURRENCY = 'USD';

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
        const url = buildUrl(brick);
        return (
          <a href={url} className={brickClass}></a>
        )
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

const buildUrl = brick => {
  const url = 'https://auth.robokassa.ru/Merchant/Index.aspx';
  const {row, ind, id, hash, outSum}  = brick;
  return `${url}?MrchLogin=${LOGIN}&IsTest=${IS_TEST}&OutSum=${outSum}&OutSumCurrency=${OUT_SUM_CURRENCY}&InvId=${id}&Desc=${row}-${ind}&SignatureValue=${hash}&Culture=en`;
}

export default App;