var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

async function updateAttribute(userName) {
    return await new Promise((resolve, reject) => {
        const params = {
            UserAttributes: [
                {
                    Name: 'custom:role',
                    Value: 'admin',
                },
            ],
            UserPoolId: 'ap-southeast-2_EjtQVF9Ch',
            Username: userName,
        };
        cognitoidentityserviceprovider.adminUpdateUserAttributes(
            params,
            function (err, data) {
                if (err) {
                    // an error occurred
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    // successful response
                    console.log(data);
                    resolve(data);
                }
            }
        );
    });
}

exports.handler = async (event) => {
    console.log(event);
    return updateAttribute(event.userName);
};
