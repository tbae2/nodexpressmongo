var update = document.getElementById('update');

update.addEventListener('click',function(){
  fetch('quotes'), {
    method: 'put',
    headers: {'Content-Type': 'appication/json'} ,
    body: JSON.stringify({
      'name' : 'Darth Vader',
      'quote': 'I find your lack of faith disturbing'
    })
})
