//"listen" for password to be submit  
function listenForPass() {
  $('.js-passMagicCheck').unbind().submit(function (event) {
    event.preventDefault();

    let msg = $('input').val();

    let msgLen = msg.length;

    if (msgLen < 1) {
      $('#openPassCheckModal')[0].click();
      return false;
    }

    hashThePass(msg);
  });
}
//hash the password using SHA script
function hashThePass(msg) {

  hashed = SHA1(msg).toUpperCase();

  $('.js-passCheckfield').val("");

  sliceHash(hashed);
}
//slice first 5 char from hashed password to send to have I been pwned (HIBP)
function sliceHash(hashedVal) {
  fiveSliced = hashedVal.slice(0, 5);

  sendToPwned(fiveSliced, mapResults);

}
//send 5 sliced to HIBP
function sendToPwned(fiveSliced) {

  let query = PWNED_URL + fiveSliced;

  let pwnedResp = $.get(query, function () {

    let pwnedData = JSON.stringify(pwnedResp.responseText);

    mapResults(pwnedData);

  }, "text");

}

//replace values in data returned to separate the hash strings returned
function mapResults(pwnedData) {

  let pwnedDataString = pwnedData.replace(/(?:\\[rn])+/g, ' ');

  let splitDataArray = pwnedDataString.split(' ');

  const pwndedDataArray = splitDataArray.map(function (data) {

    return data = data.substring(0, data.indexOf(':'));
  })

  compareResults(pwndedDataArray);

}
//compare the 5 slice + hash values to the original entered hash string
function compareResults(pwndedDataArray) {

  let match = 0;

  pwndedDataArray.forEach(function (hash) {
    let tempHash = fiveSliced + hash;

    if (tempHash === hashed) {

      match++;
    }

  })

  displayResults(match);

}

$(listenForPass);
