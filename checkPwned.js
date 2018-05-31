  
function listenForPass()  {
  $('.js-passMagicCheck').unbind().submit(function(event)   {
    event.preventDefault();
    
    let msg = $('input').val();

    hashThePass(msg);
  });
}

function hashThePass(msg)  {    
    
    hashed = SHA1(msg).toUpperCase();
    
    $('.js-passCheckfield').val("");
    
    sliceHash(hashed);
}

function sliceHash(hashedVal)  {
  fiveSliced = hashedVal.slice(0,5);

  sendToPwned(fiveSliced, mapResults);

}

function sendToPwned(fiveSliced)  {

  let query = PWNED_URL+fiveSliced;
  
  let pwnedResp = $.get(query, function()  {
 
     let pwnedData = JSON.stringify(pwnedResp.responseText);
      
      mapResults(pwnedData);

  }, "text");

}


function mapResults(pwnedData)  {

  let pwnedDataString = pwnedData.replace(/(?:\\[rn])+/g, ' ');

  let splitDataArray = pwnedDataString.split(' ');

  const pwndedDataArray = splitDataArray.map(function(data) {
    
    return data = data.substring(0, data.indexOf(':'));
  })

 compareResults(pwndedDataArray);

}

function compareResults(pwndedDataArray)  {

  let match = 0;

  pwndedDataArray.forEach(function(hash)  {
    let tempHash = fiveSliced+hash;

    if (tempHash === hashed)  {

      match++;
    }
    
  })
  
  displayResults(match);

}

$(listenForPass);
