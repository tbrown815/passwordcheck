
function newPhraseOptions()    {

    $('.js-passMagic').html(
        `<p class='newPass-title'>Select your options!</p>
        <br><br>

        <form id='js-newPhraseForm' role='form' class='newPhraseForm js-newPhraseForm' novalidate>
        <div class='createPassLeft js-createPassLeft col-4 checkBoxGroup required'>
        <p>Include the following:</p>
        <br>

        <p class='phraseOption'><input id='letAnywhere' type='checkbox' value='&whenUp=Anywhere' class='mt20 passCheckbox'>
        <label for='letAnywhere'>Include Random Upper Case</label></p>

        <p class='phraseOption'><input id='numAnywhere' type='checkbox' value='&whenNum=Anywhere' class='mt20 passCheckbox'>
        <label for='numAnywhere'>Include Random Numbers</label></p>

        <p class='phraseOption'><input id='noSpace' type='checkbox' value='&sp=false' class='mt20 passCheckbox'>
        <label for='noSpace'>No Spaces</label></p>
       
        </div>

        <div class='createPassCenter js-createPassCenter col-4' id='numWords' role='radiogroup' aria-labelledby='numWords'>
        <br>
        <p>Select the number of words to include:</p>  
        <br>
        <p class='phraseNumWords'><input type='radio' id='10' name='numWords' value='&wc=10'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='10'> 10 Words </label></p>
        
        <p class='phraseNumWords'><input type='radio' id='15' name='numWords' value='&wc=15'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='15'> 15 Words </label></p>

        <p class='phraseNumWords'><input type='radio' id='20' name='numWords' value='&wc=20'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='20'> 20 Words </label></p>

        <p class='phraseNumWords'><input type='radio' id='25' name='numWords' value='&wc=25'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='25'> 25 Words </label></p>

        <p class='phraseNumWords'><input type='radio' id='30' name='numWords' value='&wc=30'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='30'> 30 Words </label></p>

        </div>

        <div class='createPassRight js-createPassRight col-4' id='passStrength' role='radiogroup' aria-labelledby='passStrength'>
        <br>
        <p>Select your passphrase strength:</p>  
        <br>

        <p class='phraseLength'><input type='radio' id='normal' name='passStrength' value='&s=normal'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='normal'> Normal </label></p>

        <p class='phraseLength'><input type='radio' id='RandomShort' name='passStrength' value='&s=RandomShort'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='RandomShort'> Random Short </label></p>

        <p class='phraseLength'><input type='radio' id='Strong' name='passStrength' value='&s=Strong'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='Strong'> Strong </label></p>

        <p class='phraseLength'><input type='radio' id='RandomLong' name='passStrength' value='&s=RandomLong'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='RandomLong'> Random Long </label></p>

        <p class='phraseLength'><input type='radio' id='RandomForever' name='passStrength' value='&s=RandomForever'
        class='mt20 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='RandomForever'> Random Forever </label></p>
        </div>
        <br><br><br><br>
        <div class='passPhraseButton'>
        <button type='submit'  class='mt20 newPhraseSubmit js-newPhraseSubmit'>Create my passphrase!</button>
        </div>
        </form>
        <div class='hiddenCheckAlert'>
        <a id='openNumWordsModal' href='#numWordsModal'></a>
            <div id='numWordsModal' class='pageModal modalContent'>
                <div>
                    <a href='#' title='Close' class='close'>Close</a>
                    <h2 class='modalTitle'>You must select the number of words!</h2>
                </div>
            </div>
        <a id='openPassStrengthModal' href='#passStrengthModal'></a>
            <div id='passStrengthModal' class='pageModal modalContent'>
                <div>
                    <a href='#' title='Close' class='close'>Close</a>
                    <h2 class='modalTitle'>You must select a password length!</h2>
                </div>
            </div>
        </div>
        `);
    createNewPhrase();
}

function createNewPhrase()  {
    
    $('.js-newPhraseForm').unbind().submit(function(event)  {
            checkedNumWords = $("input[name='numWords']:checked").length;
            checkedPassStrength = $("input[name='passStrength']:checked").length;
    
       
            if(!checkedNumWords) {
                $('#openNumWordsModal')[0].click();
                return false;
                } 
    
            if(!checkedPassStrength) {
                $('#openPassStrengthModal')[0].click();
                return false;
                } 

        event.preventDefault();
        
        
        let userSelected = [
            $('input[id=letAnywhere]:checked').val(),
            $('input[id=numAnywhere]:checked').val(),
            $('input[id=noSpace]:checked').val(),
            $('input[name=numWords]:checked').val(),
            $('input[name=passStrength]:checked').val()
        ];
        
        let filterUserSelected = userSelected.filter(function (val) {
            return ((val != undefined) || (val != null));
        });
        
        let phraseqQeryString = filterUserSelected.toString();

        let requestString = phraseqQeryString.replace(/,/g, '');

        callMakeApi(requestString, reviewPhraseResults);
        
    });   
    
}

function callMakeApi(requestString, callback)  {
    
  
    $.getJSON(MAKEMEPASS, requestString, callback);
    
}

function reviewPhraseResults(passPhrase) {
    
    const origPhrase = passPhrase.pws.map(        
        function(pws, index) {
            
            return `${pws}`;
        }
    )
    
    let phrase = origPhrase.toString();

    $('.js-thePassword').removeClass('hidden')
    $('.js-thePassword').html(
        `<br>
        <span class='yourNewPass'>This is the passphrase that was generated:</span>
        <br>
         <p class='passPhraseWord'>${phrase}</p>
        `);
        
        hashThePass(phrase);
    }

   
   $(newPhraseOptions);
   