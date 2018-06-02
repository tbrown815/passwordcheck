
function newPassOptions()    {

    $('.js-infoBox').html(
        `<span class='titleInfo'><h2>Tips for a strong password:</h2>
            <ul>
            <li>Make the password at least 12 characters long.</li>
            <li>Include numbers, capital letters and symbols.</li>
            <li>Don’t just use one password.</li>
        </span>
        `);

    $('.js-passMagic').html(
        `<p class='newPass-title'>Select your options!</p>
        <br><br>

        <form id='js-newPassForm' role='form' class='newPassForm js-newPassForm' novalidate>
       
        <div class='createPassLeft js-createPassLeft col-6 checkBoxGroup required'>
        <p>Include the following:*</p>
        <br>

        <p class='passOption'><input id='upper' type='checkbox' value='upper' class='mt20 passCheckbox'>
        <label for='upper'>Upper Case Letters</label></p>

        <p class='passOption'><input id='lower' type='checkbox' value='lower' class='mt20 passCheckbox'>
        <label for='lower'>Lower Case Letters</label></p>

        <p class='passOption'><input id='number' type='checkbox' value='number' class='mt20 passCheckbox'>
        <label for='number'>Numbers</label></p>
       
        <p class='passOption'><input id='special' type='checkbox' value='special' class='mt20 passCheckbox'>
        <label for='special'>Special Characters</label></p>
        </div>

        <div class='createPassRight js-createPassRight col-6' id='passLength' role='radiogroup' aria-labelledby='passLength'>
        <p>Select your password length:*</p>  

        <p class='passLength'><input type='radio' id='12' name='passLength' value='12'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='12'> 12 characters </label></p>

        <p class='passLength'><input type='radio' id='24' name='passLength' value='24'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='24'> 24 characters </label></p>

        <p class='passLength'><input type='radio' id='32' name='passLength' value='32'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='32'> 32 characters </label></p>

        <p class='passLength'><input type='radio' id='48' name='passLength' value='48'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='48'> 48 characters </label></p>

        <p class='passLength'><input type='radio' id='64' name='passLength' value='64'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passLength' required>
        <label for='64'> 64 characters </label></p>
        </div>
        <br><br><br>
        <div class='passPhraseButton'>
        <button type='submit'  class='newPassSubmit js-newPassSubmit mt20'>Create my Password!</button>
        </form>
        <form id='js-newPassBack' role='form' class='newPassBack js-newPassBack' novalidate>
        <button type='submit'  class='newPassBackButton js-newPassBackButton mt30' formnovalidate="formnovalidate">Back</button>
        </form>
        </div>
        <p>* = Required</p>
        <div class='hiddenCheckAlert'>
        <a id='openPassLengthModal' href='#passLengthModal'></a>
            <div id='passLengthModal' class='pageModal modalContent'>
                <div>
                    <a href='#' title='Close' class='close'>Close</a>
                    <h2 class='modalTitle'>You must select a password length!</h2>
                </div>
            </div>
        <a id='openCharTypeModal' href='#charTypeModal'></a>
            <div id='charTypeModal' class='pageModal modalContent'>
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
/*    
    $('.js-newPassBack').unbind().submit(function(event)  {
       console.log('backClicked')
       
       event.preventDefault();
       
       selectYourType();
    });
*/
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
