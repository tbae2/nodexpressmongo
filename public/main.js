var update = document.getElementById('update');

update.addEventListener('click',function(){

  //use then to use OK on the response object to check the response and that fetch worked

  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'} ,
    body: JSON.stringify({
      'name' : 'Darth Vader',
      'quote': 'I find your lack of faith disturbing'
    })
  }).then(function(res){
    if(res.ok) return res.json();
  }).then(function(data){
    console.log(data);
    window.location.reload(true);
  })
});

  var del = document.getElementById('delete');

  del.addEventListener('click', function(){
    fetch('quotes',{
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "name": "Darth Vader"
      })
    }).then(function(res){
      if(res.ok) return res.json()
    }).then(function(data){
      console.log(data);
      window.location.reload(true);
    })
  });
