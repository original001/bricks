import 'es5-shim';
import 'es6-promise';
import axios from 'axios';
import React from 'react';

import App from './ui/App';

axios.get('../get_data.php')
  .then(res => {
    React.render(<App data={res.data} />, document.getElementById('container'));
  })
