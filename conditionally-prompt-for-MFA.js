/**
 * 
 * This script is useful if you need to conditioanally prompt for a second step in a login flow
 * 
 */

// Only need to prompt for SMS OTP is the user used username & password option
// 2 options in Step 1 : Username & Password, Google
// 1 option in Step 2 : SMS OTP
function onLoginRequest(context) {
    executeStep(1, {
        onSuccess: function(context) {
            var authenticatorUsedInStep1 = context.steps[1].authenticator;
            
            // If you are using a federated IdP (ex: Google), you need to use context.steps[1].idp instead
            // var authenticatorUsedInStep1 = context.steps[1].idp;

            Log.info("Authenticator used in step 1 : " + authenticatorUsedInStep1);

            if (authenticatorUsedInStep1 === 'BasicAuthenticator') {
                Log.info("Username & password used as the first step. hence prompting for 2nd step");
                executeStep(2);
            }
        }
    });
}