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
      $('.js-checkPass').unbind().submit(function(event)   {
       event.preventDefault();
  
       $('.js-toDo, .js-goodNewsBadNews, .js-thePassword').addClass('hidden');
       $('.js-passBox, .js-passMagic').removeClass('hidden');
      
       $('.js-passMagic').html(
         `<form id='js-passMagicCheck' role='form' class='passMagicCheck js-passMagicCheck'>
           <label class='passMagicCheckTitle' for='passCheckfield'>Check your Password</label>
           <br>
           <div class='passwordEntry'>
           <input class="passCheckfield js-passCheckfield" type="password" name="passCheckfield" placeholder="Enter password to check here..."/> 
           <br>
           <label class='showPassCheckBox js-showPassCheckBox' for='showPassword' role='checkbox' aria-labelby='showPassword'>
           <input type='checkbox' name='showPassword' id='showPassword' class='showPassCheckBox'>
           Show Password
           </label>
           </div>
           <br>
           <button type="submit"  class="mt20 checkSubmit js-checkSubmit">Click to Check</button>   
           </form>
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
       
        $('.js-passMagic').html(
          `<form id='js-selectPass' role='form' class='selectPass js-selectPass'>
            <label class='newPassTitle'>Select a password type below!</label>
            <br>
            <button type='submit'  class='mt20 createNewPass js-createNewPass'>Create a Password</button>  OR 
            <button type='submit'  class='mt20 createNewPhrase js-createNewPhrase'>Create a Passphrase</button>  
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
      $('.js-goodNewsBadNews').html(
        `<h2  class='warning'>WARNING!</h2>
        <br>
        <p>We're sorry to inform you that the password <span class='emph'>WAS</span> found in a database of compromised passwords.</p>
        <br>
        <p>This does not mean you have been compromised, only that the password provided has been detected in the database.
        If you are seeing this message it is a good idea to generate a different password</p>
        <br>
        <p>Click below to check another password or try to generate a new one!</p>
        
        `);
    }
    
    else  {
      $('.js-passMagic').addClass('hidden');
      $('.js-goodNewsBadNews, .js-toDo, .js-newPass').removeClass('hidden');
      $('.js-goodNewsBadNews').html(
        `<h2 class='goodNews'>GOOD NEWS!</h2>
        <br>
        <p>The password was <span class='emph'>NOT</span> found in a database of compromised passwords.</p>
        <br>
        <p>This does not necessarily mean your password is good, only that it didn't appear in the database. You can continue 
        to use this password or if you would like you can generate a new one.</p>
        <br>
        <p>Click below to check another password or generate a new one!</p>
        
        `);
    }
  }
 

$(getStarted);