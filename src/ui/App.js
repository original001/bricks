import React from 'react';
import _ from 'lodash';
import Modal from 'ui/Modal';
import Gapped from 'ui/Gapped';

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
    },
    emptyField: false
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
        outSum: brick.outSum,
        name: '',
        surname: '',
        middlename: '',
        address: '',
      }
    });
    this.open();
  }

  _createHandler = (field, e) => {
    this.setState({
      data: {
        ...this.state.data,
        [field]: e.target.value
      }
    })
  }

  _handleNameChange = e => {
    this._createHandler('name', e)
  }

  _handleAddressChange = e => {
    this._createHandler('address', e)
  }

  _handleMiddlenameChange = e => {
    this._createHandler('middlename', e)
  }

  _handleSurnameChange = e => {
    this._createHandler('surname', e)
  }

  _handleBuyClick = e => {
    const _this = this;

    const data = this.state.data;

    if (!data.name || !data.surname) {
      this.setState({emptyField: true});
      return;
    }

    fetch('../../get_hash.php', {
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      method: 'POST',
      body: _this.buildUrl(data)
    }).then(res => {
        return res.text()
      })
      .then(hash => {
        _this.disable();
        location.href = _this.buildRCUrl(hash);
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
          const {segment, name, surname, middlename} = brick;
          const disabled = brick.disabled === '1' ? true : false;
          const brickClass = `brick ${BRICKS_CLASSES[segment]} ${disabled && 'disabled'}`;
          return (
            <div className='brick-wrapper'>
              <div onClick={() => disabled || this._handleBrickClick(brick)} 
                className={brickClass}>
                {this.buildName(name, surname, middlename)}
              </div>
              {disabled && (name || surname) && <div className='tooltip'>{[name, surname, middlename].join(' ')}</div>}
            </div>
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
          <Gapped vertical={true}>
            {this.state.emptyField && <span>Must enter name or surname</span>} 
            <div>
              <label>Name*</label>
              <input type="text" onChange={this._handleNameChange}/>
            </div>
            <div>
              <label>Surname*</label>
              <input type="text" onChange={this._handleSurnameChange}/>
            </div>
            <div>
              <label>Middlename</label>
              <input type="text" onChange={this._handleMiddlenameChange}/>
            </div>
            <div>
              <label>Address</label>
              <input type="text" onChange={this._handleAddressChange}/>
            </div>
            <div>Sum: ${this.state.data.outSum}</div>
          </Gapped>
        </Modal.Body> 
        <Modal.Footer> 
          <button onClick={this._handleBuyClick}>send</button>
        </Modal.Footer> 
      </Modal>
    ) 
  }

  buildRCUrl = hash => {
    const {name, surname, middlename, address, id, outSum}  = this.state.data;
    const data = {
      MrchLogin: LOGIN,
      IsTest: IS_TEST,
      OutSum: outSum,
      OutSumCurrency: OUT_SUM_CURRENCY,
      InvId: id,
      Desc: 'description',
      SignatureValue: hash,
      Shp_address: address,
      Shp_middlename: middlename,
      Shp_name: name,
      Shp_surname: surname,
    }

    return this.buildUrl(data, ROBOKASSA_URL);
  }

  buildUrl = (data, url) => {
    let params = [];
    for (let caption in data) {
      if (data.hasOwnProperty(caption)) {
         params.push(`${caption}=${data[caption]}`);
      }
    }

    if (!url) return params.join('&');

    return `${url}?${params.join('&')}`;
  };

  buildName = (name, surname, middlename) => {
    return [name, surname, middlename].filter(val => val).map(val => val[0]).join('.');
  };

  disable = () => {
    const id = this.state.data.id;

    fetch('../../set_disabled.php', {
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      method: 'POST',
      body: `id=${id}`
    })
  }
}

export default App;