import React from 'react';
import _ from 'lodash';
import Modal from 'ui/Modal';
import Gapped from 'ui/Gapped';
import Brick from './Brick';

import * as api from './api';

const LOGIN = 'buyonebrickcom';
const IS_TEST = 1;
const OUT_SUM_CURRENCY = 'USD';
const ROBOKASSA_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx';

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

    api.getHash(_this.buildUrl(data)).then(res => {
        _this.disable();
        location.href = _this.buildRCUrl(res.data);
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
        const bricks = _.map(row, brick =>  <Brick {...brick} onClick={this._handleBrickClick}/> );
        return <div className="row">{bricks}</div>
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
  }

  disable = () => {
    const id = this.state.data.id;

    api.disable(id);
  }
}

export default App;