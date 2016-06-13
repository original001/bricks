import axios from 'axios';	

export const getHash = (data) => {
  return axios({
    url: '../../get_hash.php',
    headers: {
      'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    method: 'POST',
    data: data,
  })
}

export const disable = (id) => {
  axios({
    url: '../../set_disabled.php',
    headers: {
      'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    method: 'POST',
    data: `id=${id}`
  })
}