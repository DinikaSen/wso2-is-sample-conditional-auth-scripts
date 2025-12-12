# wso2-is-sample-conditional-auth-scripts

var onLoginRequest = function(context) {
    var is_customer = context.request.params.is_customer;
    if (is_customer != null) {
        Log.info("is_customer query param is present. Sending to organization SSO authenticator.");
        executeStep(1, {
            authenticationOptions:[{
            authenticator: 'OrganizationSSO'
            }]}, {}
        );
    } else {
        Log.info("is_customer query param is not present. Defaulting to identifier first authenticator.");
        executeStep(1, {
            authenticationOptions:[{
            authenticator: 'IdentifierExecutor'
            }]}, {}
        );
    }
};

// Map each federated domain to its IdP name
var federatedDomains = {
    "brightledger.com": "BrightLedger IdP",
    "worklink.com": "Worklink IdP"
};

var onLoginRequest = function(context) {
    var is_customer = context.request.params.is_customer;
    if (is_customer != null && is_customer == "true") {
        Log.info("is_customer query param is present. Sending to organization SSO authenticator." + is_customer);
        executeStep(1, {
            authenticationOptions:[{
                idp: 'SSO'
            }]}, {
                onSuccess: function (context) {
                Log.info("Login successful with organization SSO authenticator.");
            } 
            }
        );
    } else {
        Log.info("is_customer query param is not present. Defaulting to identifier first authenticator.");
        executeStep(1, {
            authenticationOptions:[{
                authenticator: 'IdentifierExecutor'
            }]}, {
            onSuccess: function (context) {
                var username = context.steps[1].subject.username;
                var indexOfLastAt = username.lastIndexOf("@");
                var domain = username.substring(indexOfLastAt + 1);

                // Look up IdP name from the mapping
                var idpName = federatedDomains[domain];

                if (idpName) {
                    // If domain is federated, use mapped IdP
                    executeStep(2, { 
                        authenticationOptions: [{ 
                            idp: idpName 
                        }] 
                    }, {
                        onSuccess: function (context) {
                        Log.info("Login successful with federated authenticator.");
                    }});
                } else {
                    // Otherwise fall back to basic authentication
                    executeStep(2, { 
                        authenticationOptions: [{ 
                            authenticator: 'BasicAuthenticator' 
                        }] 
                    }, {
                        onSuccess: function (context) {
                        Log.info("Login successful with basic authenticator.");
                    }});
                }
            }}
        );
    }
};

