import React from 'react';

import App from './ui/App';
fetch('../get_data.php')
	.then((res) => {
    return res.json();
	})
  .then(json => {
    React.render(<App data={json} />, document.getElementById('container'));
  })
	.catch(err => {
    console.log(err)
	})
