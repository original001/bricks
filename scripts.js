$.ajax('get_data.php', {
  success: function(res){
    console.log(res);
  },
  error: function(err){
    console.log(err);
  }
})