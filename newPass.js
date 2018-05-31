
function newPassOptions()    {

    console.log('newPassOptions start')

    $('.js-passMagic').html(
        `<p class='newPass-title'>Select your options!</p>
        <br><br>

        <form id='js-newPassForm' role='form' class='newPassForm js-newPassForm' novalidate>
       
        <div class='createPassLeft js-createPassLeft col-6 checkBoxGroup required'>
        <p>Include the following:</p>
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
        <br>
        <p>Select your password length:</p>  
        <br>

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
        <button type='submit'  class='mt20 newPassSubmit js-newPassSubmit'>Create my Password!</button>
        </div>
        </form>
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
    console.log('createNewPass start')
    
    $('.js-newPassForm').unbind().submit(function(event)  {
        checkedCharType = $("input[type=checkbox]:checked").length;
        checkedPassLength = $("input[type=radio]:checked").length;
        
        if(!checkedCharType) {
            console.log('check alert modal')
            $('#openCharTypeModal')[0].click();
            return false;
            }    

        
        if(!checkedPassLength) {
            console.log('check radio modal')
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
        
        console.log('userUpperBox ',userSelected[0]);
        console.log('userLower ',userSelected[1]);
        console.log('userNumber ',userSelected[2]);
        console.log('userSpecial ',userSelected[3]);
        console.log('userLength ',userSelected[4]);

        let filterUserSelected = userSelected.filter(function (val) {
            return ((val != undefined) || (val != null));
        });

        console.log('toSfilterUserSelectedtring: ', filterUserSelected);

        let passQueryString = filterUserSelected.toString();

        console.log('passQueryString: ',passQueryString)

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
    console.log('passResponse', passResponse)

    const origPass = passResponse.results.map(        
        function(passResults, index) {
            
            return `${passResults.login.password}`;
        }
      )
    console.log('origPass: ',origPass);

    let password = origPass.toString();
    console.log('password: ',password);
    console.log(password.length)

    let updatePass = password.replace(/`|</g, '_');

    console.log('updatePass: ',updatePass)

    $('.js-thePassword').removeClass('hidden')
    $('.js-thePassword').html(
        `<br>
        <span class='yourNewPass'>This is the password that was generated:</span>
        <br>
        <p class='passPhraseWord'>${updatePass}</p>
        `);

    hashThePass(updatePass);
}


$(newPassOptions);
