/**
 * 
 * This script is useful if you need to pass 'login_hint' to authenticators.
 * 
 * - For this to work with local authenticators, they should support params passed via adaptive script. 
 * - For this to work with federated authenticators, you need to configure these query params to be passed to the federated IdP 
 *   as explained in https://is.docs.wso2.com/en/latest/references/idp-settings/oidc-settings-for-idp/#additional-query-parameters 
 * 
 */


// When login_hint is received in the authentication request as a query param
// Step 1: any local authenticator that supports `authenticatorParams` or any federated authenticator 
var onLoginRequest = function(context) {
    var login_hint = context.request.params.login_hint;
    if (login_hint != null) {
        executeStep(1, {
        authenticatorParams: {
            common: {
                'login_hint': login_hint
            }
        }
    }, {});
    } else {
        executeStep(1);
    }
};

// When login_hint is resolved from the identifier first authenticator and needs to be added to the federated authentication request as a query param
// Step 1: Identifier first  
// Step 2: Any federated authenticator (OIDC/SAML enterprise login)
var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function(context) {
            // Extracting authenticated user from the first step.
            var login_hint = context.steps[1].subject.username;
            executeStep(2, {
                authenticatorParams: {
                    common: {
                        'login_hint': login_hint
                    }
                }
            }, {});
        },
    });
};
