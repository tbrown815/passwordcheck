
  
  
  
function listenForPass()  {
  $('.js-passMagicCheck').unbind().submit(function(event)   {
    event.preventDefault();
    
    let msg = $('input').val();

    hashThePass(msg);
  });
}

function hashThePass(msg)  {    
  console.log('passed pass: ',msg)  
    
    hashed = SHA1(msg).toUpperCase();
    
    $('.js-passCheckfield').val("");
  
    console.log(msg);

    console.log("SHA1 msg: ",SHA1(msg));
    console.log("hashed: ",hashed);
    
    sliceHash(hashed);
}

function sliceHash(hashedVal)  {
  fiveSliced = hashedVal.slice(0,5);

  console.log("fiveSliced: ",fiveSliced)

  sendToPwned(fiveSliced, mapResults);

}

function sendToPwned(fiveSliced)  {

  let query = PWNED_URL+fiveSliced;
  
  console.log('query: ',query)
  
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

 console.log('pwndedDataArray: ',pwndedDataArray);

 compareResults(pwndedDataArray);

}

function compareResults(pwndedDataArray)  {

  let match = 0;

  pwndedDataArray.forEach(function(hash)  {
    let tempHash = fiveSliced+hash;
  //  console.log(tempHash)

    if (tempHash === hashed)  {
      
      console.log('found a match');
      console.log('tempHash ',tempHash, ' hashed: ',hashed)
      match++;
    }

    else{
      console.log('not a match');
    }

    
  })
  
  console.log('match: ',match)


  // ADD IF STMNTS TO DISPLAY CHECK OR NEW RESULTS


  displayResults(match);

}
/*
function displayResults(match)  {

  if (match > 0)  {
    $('.js-passMagic').addClass('hidden');
    $('.js-goodNewsBadNews, .js-toDo, .js-newPass').removeClass('hidden');
    $('.js-goodNewsBadNews').html(
      `<h2>ATTENTION!</h2>
      <p>We're sorry to inform you that the password you entered was found in a database of compromised passwords.</p>
      <p>This does not mean you have been compromised, only the password has been detected. Regardless, 
      you should use a different password</p>
      <span>Click below to check another password or generate a new one!</span>
      
      `);
  }
  
  else  {
    $('.js-passMagic').addClass('hidden');
    $('.js-goodNewsBadNews, .js-toDo, .js-newPass').removeClass('hidden');
    $('.js-goodNewsBadNews').html(
      `<h2>GOOD NEWS!</h2>
      <p>The password you entered was NOT found in a database of compromised passwords.</p>
      <p>This does not necessarily mean your password is good, only that it didn't appear in the database. Regardless, 
      you may want to use a different password</p>
      <span>Click below to check another password or generate a new one!</span>
      
      `);
  }
}
*/
$(listenForPass);
