import React from 'react';
import _ from 'lodash';
import Modal from 'ui/Modal';

const LOGIN = 'buyonebrickcom';
const IS_TEST = 1;
const OUT_SUM_CURRENCY = 'USD';
const ROBOKASSA_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx';

const BRICKS_CLASSES = {
  1: 'lg',
  2: 'md',
  3: 'sm',
  4: 'xs'
};

class App extends React.Component {
  state = {
    opened: false,
    data: {
      id: 0,
      outSum: 0,
      title: ''
    }
  }

  open = () => {
    this.setState({opened: true});
  }

  close = () => {
    this.setState({opened: false});
  }

  _handleBrickClick = brick => {
    this.setState({
      data: {
        ...this.state.data,
        id: brick.id,
        outSum: brick.outSum
      }
    });
    this.open();
  }

  _handleInputChange = e => {
    const value = e.target.value;
    this.setState({
      data: {
        ...this.state.data,
        title: value
      }
    })
  }

  _handleBuyClick = e => {
    // const {title, id, outSum} = this.state.data;
    const title = '';
    const id = 1;
    const outSum = 100;
    fetch('../../get_hash.php', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({title, id, outSum})
    }).then(res => {
        res.text()
      })
      .then(hash => {
        location.href = buildUrl(hash);
      })
      .catch(err => {
        console.error(err);
      })
  }

  render(){
    const data = this.props.data;

    const segments = _.groupBy(data, 'segment');

    const piramid = _.map(segments, segment => {
      const rows = _.groupBy(segment, 'row');
      const mappedRows = _.map(rows, row => {
        const mappedRow = _.map(row, brick => {
          const brickClass = `brick ${BRICKS_CLASSES[brick.segment]}`;
          return (
            <div onClick={() => this._handleBrickClick(brick)} className={brickClass}></div>
          )
        })
        return <div className="row">{mappedRow}</div>
      })
      return <div className="segment">{mappedRows}</div>
    })

    return (
      <div>
        {piramid}
        {this.state.opened && this.renderModal()}
      </div>
    )
  }

  renderModal(){
    return (
      <Modal onClose={this.close}>
        <Modal.Header> 
          Buy Brick!
        </Modal.Header> 
        <Modal.Body> 
          <label>Title</label>
          <input type="text" onChange={this._handleInputChange}/>
        </Modal.Body> 
        <Modal.Footer> 
          <button onClick={this._handleBuyClick}>send</button>
        </Modal.Footer> 
      </Modal>
    ) 
  }

  buildUrl = hash => {
    const {id, outSum, title}  = this.state.data;
    const data = {
      MrchLogin: LOGIN,
      IsTest: IS_TEST,
      OutSum: outSum,
      OutSumCurrency: OUT_SUM_CURRENCY,
      InvId: id,
      Desc: 'description',
      SignatureValue: hash,
      Shp_title: title
    }

    let params = [];
    for (let caption in data) {
      if (data.hasOwnProperty(caption)) {
         params.push(`${caption}=${data[caption]}`);
      }
    }

    return `${ROBOKASSA_URL}?${params.join('&')}`;
  };
}



export default App;