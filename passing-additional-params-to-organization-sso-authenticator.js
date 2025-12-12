/**
 * 
 * This script is useful if you need to pass additional query parameters such as 'login_hint' to the 'organization SSO authenticator'.
 * 
 * This sample script checks for the following optional query parameters in the login request, but you can add any additional query params.
 * 
 * - login_hint : to pass the login identifier of the user to the sub-org login flow 
 * - suborgidp  : to pass the name of the IdP that should be prompted in the sub-org login flow
 * 
 * If any of these parameters are present, the script builds a query string and forwards it to the organization SSO authenticator as `ssoAdditionalParams`. 
 * If none are provided, it executes the default authentication step.
 * 
 * This script can be used in the root app login-flow in combination with a conditional auth script in sub-org app login-flow to,
 * 
 * - pass the login identifier to the autheticator directly
 * - directly prompt the user with the required IdP etc. 
 * 
 */


var onLoginRequest = function(context) {

    var additionalParamString = "";
    var login_hint = context.request.params.login_hint;
    var suborgidp = context.request.params.suborgidp;

    if (login_hint != null) {
        Log.info("Received login hint as an additional parameter.");
        additionalParamString = 'login_hint=' + login_hint;
    }
    if (suborgidp != null) {
        Log.info("Received  sub-org IdP name as an additional parameter.");
        if (additionalParamString != "") {
            additionalParamString = additionalParamString + '&';
        }
        additionalParamString = additionalParamString + 'fidp=' + suborgidp;
    }
    if (additionalParamString != "") {
        Log.info("Passing additional paramters to organization SSO authenticator : " + additionalParamString);
        executeStep(1, {
            authenticatorParams: {
                federated: {
                SSO: {
                    ssoAdditionalParams: additionalParamString
                }
            }}
        }, {}
        );
    } else {
        Log.info("Additional params not available. Executing organization SSO authenticator.");
        executeStep(1);
    }
};