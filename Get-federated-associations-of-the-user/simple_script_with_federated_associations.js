var errorPageParameters = {
    'status': 'Unauthorized',
    'statusMsg': 'Could not find an association in the organization for the user.'
};

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function (context) {
            var federatedAssociations = getFederatedAssociations(context, null);
            var authenticators = [];
            for (var key in federatedAssociations) {
                var identityProviderName = JSON.stringify(federatedAssociations[key]).replace(/"/g, "");
                authenticators.push({idp: identityProviderName});
                Log.info("Identified association with IDP: " + identityProviderName);
            }
            if (authenticators.length != 0) {
                executeStep(2, {authenticationOptions: authenticators}, {});
            } else {
              // User should have at least one association in the sub-org to log in
              Log.info("No association found. Sending unauthorized error.");
              sendError('', errorPageParameters);
          }
        }
    });
};
