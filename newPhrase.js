
function newPhraseOptions()    {

    $('.js-infoBox').html(
        `<span class='titleInfo' role='Presentation' aria-live='assertive'><h2>Tips for passphrases:</h2>
        <h3>A strong passphrase is a random combination of words that are meaningless together. The more unpredictable the better!

        No matter how strong your previous password may be, its appearance in a password dictionary makes it an easy target for hackers.  Get started below!
        </h3>
        </span>
        `);

    $('.js-passMagic').html(
        `<p class='newPass-title'>Select your options!</p>
        <br><br>

        <form id='js-newPhraseForm' role='form' class='newPhraseForm js-newPhraseForm' aria-label='newPhraseForm' aria-live='assertive' novalidate>
        <div class='createPassLeft js-createPassLeft col-4 checkBoxGroup required'>
        <p>Include the following:</p>
        <br>

        <div class='checkBx'>
        <p class='phraseOption'><input id='letAnywhere' type='checkbox' value='&whenUp=Anywhere' class='bt30 passCheckbox' aria-labelledby='phraseOption'>
        <label for='letAnywhere'>Include Upper Case</label></p>
        </div>
        <div class='checkBx'>
        <p class='phraseOption'><input id='numAnywhere' type='checkbox' value='&whenNum=Anywhere' class='bt30 passCheckbox' aria-labelledby='phraseOption'>
        <label for='numAnywhere'>Include Random Numbers</label></p>
        </div>
        <div class='checkBx'>
        <p class='phraseOption noSpace'><input id='noSpace' type='checkbox' value='&sp=false' class='bt30 passCheckbox' aria-labelledby='phraseOption'>
        <label for='noSpace'>No Spaces</label></p>
        </div>
        
        </div>

        <div class='createPassCenter js-createPassCenter col-4' id='numWords' role='radiogroup' aria-labelledby='numWords'>
        <p>Select the number of words to include:*</p>  
        <br>
        <div class='rdio'> 
        <p class='phraseNumWords'><input type='radio' id='10' name='numWords' value='&wc=10'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='10'> 10 Words </label></p>
        </div>
        <div class='rdio'> 
        <p class='phraseNumWords'><input type='radio' id='15' name='numWords' value='&wc=15'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='15'> 15 Words </label></p>
        </div>
        <div class='rdio'> 
        <p class='phraseNumWords'><input type='radio' id='20' name='numWords' value='&wc=20'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='20'> 20 Words </label></p>
        </div>
        <div class='rdio'> 
        <p class='phraseNumWords'><input type='radio' id='25' name='numWords' value='&wc=25'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='25'> 25 Words </label></p>
        </div>
        <div class='rdio'> 
        <p class='phraseNumWords'><input type='radio' id='30' name='numWords' value='&wc=30'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='numWords' required>
        <label for='30'> 30 Words </label></p>
        </div>
        </div>

        <div class='createPassRight js-createPassRight col-4' id='passStrength' role='radiogroup' aria-labelledby='passStrength'>
        <p>Select the minimum number of characters:*</p>  
        <br>
        <div class='rdio'> 
        <p class='phraseLength'><input type='radio' id='min20' name='passStrength' value='&minCH=20'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='min20'> 20 </label></p>
        </div>
        <div class='rdio'> 
        <p class='phraseLength'><input type='radio' id='min40' name='passStrength' value='&minCH=40'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='min40'> 40 </label></p>
        </div>
        <div class='rdio'> 
        <p class='phraseLength'><input type='radio' id='min80' name='passStrength' value='&minCH=80'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='min80'> 80 </label></p>
        </div>
        <div class='rdio'> 
        <p class='phraseLength'><input type='radio' id='min160' name='passStrength' value='&minCH=160'
        class='bt30 passRadio' role='radio' aria-checked='false' aria-labelledby='passStrength' required>
        <label for='min160'> 160 </label></p>
        </div>
        </div>
        <br><br><br><br>
        <div class='passPhraseButton'>
        <button type='submit'  class='newPhraseSubmit js-newPhraseSubmit bt20'>Create My Passphrase!</button>
        <br>
        <button type='submit'  class='newPhraseOops js-newPhraseOops bt30' formnovalidate>Did you want a password instead?</button>
        <br>
        <a href='index.html'>Start Over?</a>
        </form>
        <br>
        <br>
        <p>* = Required</p>
        </div>
        <div class='hiddenCheckAlert' role='dialog'>
        <a id='openNumWordsModal' href='#numWordsModal'></a>
            <div id='numWordsModal' class='pageModal modalContent' aria-live='assertive'>
                <div>
                    <a href='#' title='Close' class='close'>Close</a>
                    <h2 class='modalTitle'>You must select the number of words!</h2>
                </div>
            </div>
        <a id='openPassStrengthModal' href='#passStrengthModal'></a>
            <div id='passStrengthModal' class='pageModal modalContent' aria-live='assertive'>
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

    $('.js-newPhraseOops').unbind().click(function(event)  {
        console.log('backClicked')
        
        event.preventDefault();
        
        newPassOptions();
     });
    
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
         <br>
         <p>You can also click below to check another password/passphrase or generate a new one!</p>

        `);
        
        hashThePass(phrase);
    }

   
   $(newPhraseOptions);