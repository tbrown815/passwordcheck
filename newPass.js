function newPassOptions()    {

    $('.js-infoBox').html(
        `<span class='titleInfo' role='Presentation' aria-live='assertive'><h2>Tips for a strong password:</h2>
        <h3>Your new password should be at least 12 characters long, and include numbers, capital letters, and special characters. 
        Be sure to create a new password for each of your accounts.  Get started below!
        </h3>
        </span>
        `);

    $('.js-passMagic').html(
        `<p class='newPass-title'>Select your options!</p>
        <br><br>
        <form id='js-newPassForm' role='form' class='newPassForm js-newPassForm' aria-label='newPassForm' aria-live='assertive' novalidate>
       
        <div class='createPassLeft js-createPassLeft col-6 checkBoxGroup aria-labelledby='passOption' required'>
        <p>Include the following:*</p>
        <br>
        <div class='checkBx'>
        <p class='passOption'><input id='upper' type='checkbox' value='upper' class='passCheckbox' aria-labelledby='passOption'>
        <label for='upper' class='checkboxLabel'>Upper Case Letters</label></p>
        </div>
        <div class='checkBx'>
        <p class='passOption'><input id='lower' type='checkbox' value='lower' class='passCheckbox' aria-labelledby='passOption'>
        <label for='lower' class='checkboxLabel'>Lower Case Letters</label></p>
        </div>
        <div class='checkBx'>        
        <p class='passOption'><input id='number' type='checkbox' value='number' class='passCheckbox' aria-labelledby='passOption'>
        <label for='number' class='checkboxLabel'>Numbers</label></p>
        </div>
        <div class='checkBx'>        
        <p class='passOption'><input id='special' type='checkbox' value='special' class='passCheckbox' aria-labelledby='passOption'>
        <label for='special' class='checkboxLabel'>Special Characters</label></p>
        </div>
        </div>
        <div class='createPassRight js-createPassRight col-6' id='passLength' role='radiogroup' aria-labelledby='passLength'>
        <p>Select your password length:*</p>  
        <br>
        <div class='rdio'> 
        <p class='passLength'><input type='radio' id='12' name='passLength' value='12'
        class='bt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='12' class='radioLabel'> 12 characters </label></p>
        </div>
        <div class='rdio'> 
        <p class='passLength'><input type='radio' id='24' name='passLength' value='24'
        class='bt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='24' class='radioLabel'> 24 characters </label></p>
        </div>
        <div class='rdio'> 
        <p class='passLength'><input type='radio' id='32' name='passLength' value='32'
        class='bt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='32' class='radioLabel'> 32 characters </label></p>
        </div>
        <div class='rdio'> 
        <p class='passLength'><input type='radio' id='48' name='passLength' value='48'
        class='bt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='48' class='radioLabel'> 48 characters </label></p>
        </div>
        <div class='rdio'> 
        <p class='passLength'><input type='radio' id='64' name='passLength' value='64'
        class='bt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='64' class='radioLabel'> 64 characters </label></p>
        </div>
        </div>
        <br><br><br>
        <div class='passPhraseButton'>
        <button type='submit'  class='newPassSubmit js-newPassSubmit bt20'>Create My Password!</button>
        <br>
        <button type='submit'  class='newPassOops js-newPassOops bt30' formnovalidate>Did you want a passphrase instead?</button>
        <br>
        <a href='index.html'>Start Over?</a>
        </form>
        <br>
        <br>
        <p>* = Required</p>
        </div>
        <div class='hiddenCheckAlert' role='dialog'>
        <a id='openPassLengthModal' href='#passLengthModal'></a>
            <div id='passLengthModal' class='pageModal modalContent' aria-live='assertive'>
                <div>
                    <a href='#' title='Close' class='close'>Close</a>
                    <h2 class='modalTitle'>You must select a password length!</h2>
                </div>
            </div>
        <a id='openCharTypeModal' href='#charTypeModal'></a>
            <div id='charTypeModal' class='pageModal modalContent' aria-live='assertive'>
                <div>
                    <a href='#' title='Close' class='close'>Close</a>
                    <h2 class='modalTitle'>You must select at least one of the character type checkboxes!</h2>
                </div>
            </div>
        </div>
        `);
        
        createNewPass();
    }


function createNewPass()  {
    
    $('.js-newPassOops').unbind().click(function(event)  {
       
       event.preventDefault();
       
       newPhraseOptions();
    });

    $('.js-newPassForm').unbind().submit(function(event)  {


        checkedCharType = $("input[type=checkbox]:checked").length;
        checkedPassLength = $("input[type=radio]:checked").length;

        if(!checkedCharType) {
            $('#openCharTypeModal')[0].click();
            return false;
            }    

        
        if(!checkedPassLength) {
            $('#openPassLengthModal')[0].click();
            return false;
            }   
        
        event.preventDefault();

        
        let userSelected = [
            $('input[id=upper]:checked').val(),
            $('input[id=lower]:checked').val(),
            $('input[id=number]:checked').val(),
            $('input[id=special]:checked').val(),
            $('input[name=passLength]:checked').val()
        ];

        let filterUserSelected = userSelected.filter(function (val) {
            return ((val != undefined) || (val != null));
        });

        let passQueryString = filterUserSelected.toString();

        callPassApi(passQueryString, reviewPassResults);
        
    });   
    
}

function callPassApi(passQueryString, callback)  {

 let query = {
     password: `${passQueryString}`
   };
   
 $.getJSON(RANDOMPASS, query, callback);

}

function reviewPassResults(passResponse) {

    const origPass = passResponse.results.map(        
        function(passResults, index) {
            
            return `${passResults.login.password}`;
        }
      )

    let password = origPass.toString();

    let updatePass = password.replace(/`|</g, '_');

    $('.js-thePassword').removeClass('hidden')
    $('.js-thePassword').html(
        `<br>
        <span class='yourNewPass'>This is the password that was generated:</span>
        <br>
        <p class='passPhraseWord'>${updatePass}</p>
        <br>
        <p>You can also click below to check an additional password/passphrase or generate a new one!</p>
        `);

    hashThePass(updatePass);
}


$(newPassOptions);

