### Step 1: Build the Project

Build the project to generate the artifact:

```bash
mvn clean install
```

This will generate the JAR file: `target/org.wso2.custom.auth.functions.federated-associations-1.0.0.jar`

### Step 2: Deploy the Artifact

Copy the generated JAR file to the <IS_HOME>/repository/components/dropins/ folder:

```bash
cp target/org.wso2.custom.auth.functions.federated-associations-1.0.0.jar<IS_HOME>/repository/components/dropins/
```

### Step 3: Restart the server

### Step 4: Use the function in your conditional authentication script as shown in the sample [simple_script_with_federated_associations.js](../../simple_script_with_federated_associations.js)