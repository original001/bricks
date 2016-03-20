import React from 'react';
import _ from 'lodash';

import './ui/App';

fetch('../get_data.php')
	.then(res => {
		React.render(<App data={res.data} />, document.getElementById('container'));
	})
	.catch(err => {
		console.error(err);
	})
