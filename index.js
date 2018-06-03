const PWNED_URL = 'https://api.pwnedpasswords.com/range/';
const MAKEMEPASS = 'https://makemeapassword.ligos.net/api/v1/passphrase/json';
const RANDOMPASS = 'https://randomuser.me/api/';

let hashed = null;
let fiveSliced = null;

$.getScript('SHA1.js', function(data)  {
    return SHA1;
  });

$.getScript('checkPwned.js', function(data)  {
    return sliceHash;
  });
  
function getStarted() {
      $('.js-infoBox').html(
        `<span class='titleInfo'><h2>Choose a selection below to either check a password against a database of known comprised passwords 
        or to generate a <span class='emph'>secure</span> password or passphrase.</h2></span>
        `);

      $('.js-checkPass').unbind().submit(function(event)   {
       event.preventDefault();
  
       $('.js-toDo, .js-goodNewsBadNews, .js-thePassword').addClass('hidden');
       $('.js-passBox, .js-passMagic').removeClass('hidden');
      
       $('.js-infoBox').html(
        `<span class='titleInfo'><h2>Enter a password that you'd like to compare to a database of known compromised passwords! </h2></span>
        `);
      
       $('.js-passMagic').html(
         `<form id='js-passMagicCheck' role='form' class='passMagicCheck js-passMagicCheck' novalidate>
            <div class='passwordEntry' role='presentation'>
              <label class='passMagicCheckTitle' for='passCheckfield'>
                Check your Password 
              </label>
              <br><br>
              <input required class="passCheckfield js-passCheckfield" type="password" name="passCheckfield" placeholder="Enter a password to check here..." tabindex=0/> 
              <br>
              <div class='checkBoxGroup checkBx' checkBoxGroup>
                <input type='checkbox' name='showPassword' id='showPassword' class='showPassCheckBox' tabindex=0/>
                <label class='showPassCheckBox js-showPassCheckBox' for='showPassword' role='checkbox' aria-labelby='showPassword'>
                Show Password
                </label>
              </div>
            </div>
            <br>
            <button type="submit"  class="bt20 checkSubmit js-checkSubmit" tabindex=0>Click to Check</button>   
            <br><br>
              <div class='startOverlink'>
                <a href='index.html' tabindex=0>Start Over?</a>
              </div>
          </form>
          
           <div class='hiddenCheckAlert' role='dialog'>
            <a id='openPassCheckModal' href='#passCheckModal'></a>
             <div id='passCheckModal' class='pageModal modalContent'>
               <div>
                 <a href='#' title='Close' class='close'>Close</a>
                  <h2 class='modalTitle'>You must enter at least one character!</h2>
               </div>
             </div>
            </div>
        `);


         $('#showPassword').change(function()  {
           if ($(this).is(':checked')) {
             $('.js-passCheckfield').attr('type', 'text');
           }
           else{
             $('.js-passCheckfield').attr('type', 'password');
           }
 
         })
     
       listenForPass();
      })

    $('.js-newPass').unbind().submit(function(event)   {
        event.preventDefault();
   
        $('.js-toDo, .js-goodNewsBadNews, .js-thePassword').addClass('hidden');
        $('.js-passBox, .js-passMagic').removeClass('hidden');
        $('.js-infoBox').html(
          `<span class='titleInfo'><h2>Do you want a password or a passphrase?</h2>
          </span>
          `);
        $('.js-passMagic').html(
          `<form id='js-selectPass' role='form' class='selectPass js-selectPass'>
            <label class='newPassTitle'>Select a password type below!</label>
            <br>
            <button type='submit'  class='bt20 createNewPass js-createNewPass'>Create a Password</button>  OR 
            <button type='submit'  class='bt20 createNewPhrase js-createNewPhrase'>Create a Passphrase</button>  
          </form>
          <br>
          <span><a href='https://en.wikipedia.org/wiki/Passphrase' target='_blank'>What is a Passphrase?</a></span>
          `);
   
       selectYourType() 
       })
     
}

function selectYourType()   {
  
  $('.js-createNewPass').unbind().click(function(event)  {
        event.preventDefault();

        $('.js-newPass').addClass('hidden');

        newPassOptions()

    }); 

    $('.js-createNewPhrase').unbind().click(function(event)  {
        event.preventDefault();

        $('.js-newPass').addClass('hidden');
        
        newPhraseOptions();
    });
  }

function displayResults(match)  {

    if (match > 0)  {
      $('.js-passMagic').addClass('hidden');
      $('.js-goodNewsBadNews, .js-toDo, .js-newPass').removeClass('hidden');
      $('.js-infoBox').html(
        `<span class='titleInfo' role='Presentation'><h2>Choose a selection below to either check a password against a database of known comprised passwords 
        or to generate a <span class='emph'>secure</span> password or passphrase.</h2></span>
        `);
      $('.js-goodNewsBadNews').html(
        `<h2  class='warning'>WARNING!</h2>
        <br>
        <p>We're sorry to inform you that the password <span class='emph'>WAS</span> found in a database of compromised passwords.</p>
        <br>
        <p>This does not mean that your accounts have been compromised, only that the password provided has been detected in the database.
        If you are seeing this message you may want to consider creating a new secure password or passphrase.</p>
        <br>
        
        
        `);
    }
    
    else  {
      $('.js-passMagic').addClass('hidden');
      $('.js-goodNewsBadNews, .js-toDo, .js-newPass').removeClass('hidden');
      $('.js-infoBox').html(
        `<span class='titleInfo'  role='Presentation'><h2>Choose a selection below to either check a password against a database of known comprised passwords 
        or to generate a <span class='emph'>secure</span> password or passphrase.</h2></span>
        `);
      $('.js-goodNewsBadNews').html(
        `<h2 class='goodNews'>GOOD NEWS!</h2>
        <br>
        <p>The generated data was <span class='emph'>NOT</span> found in a database of compromised passwords.</p>
        <br>
        <p>This does not mean your password is strong or secure, but rather it does not appear in a database of known compromised passwords. 
        You may want to consider creating a new secure password or passphrase to help protect your accounts.

        Click below to check another password or generate a new one!</p>
        <br>
        
        `);
    }
  }
 

$(getStarted);