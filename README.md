Password Generator and Checker

https://brotherfatcake.github.io/passwordcheck/
<br>
https://brotherfatcake.github.io/passwordcheck/index.html


![Alt text](AppScreenshot.png?raw=true "Home Page")

People have terrible passwords, the purpose of this app is to give them the opportunity to correct their password mistakes and ideally increase their level of account security. This is done by allowing users to enter existing passwords or passwords that they would like to use. Once entered the password is hashed and the first 5 characters of the hash are sent to 'haveibeenpwned.com'. They identify the instances of those characters in their database and return a list of hash values minus the first 5 characters. Then on the client side, the full hash values are pieced together from 'haveibeenpwned.com' and then compared to the original hash value generated off of the user's input. If a match is found the app informs the user that the password was identified in the database if no match was found they are informed as well. Both outcomes offer the user the ability to create a new password or passphrase. When creating a new password or passphrase the user is provided different input options ranging from the number of words to the inclusion of special characters. Once the options are selected the new password or passphrase is created using APIs at 'randomuser.me' or 'makemeapassword.ligos.net' and then displayed to the user.



![Alt text](AppScreenshot-checked.png?raw=true "Checked results")

![Alt text](AppScreenshot-phrase.png?raw=true "New passphrase results")

The app uses the following: <br>
    * HTML <br>
    * JavaScript  <br>
    * JQuery  <br>
    * CSS

    
    