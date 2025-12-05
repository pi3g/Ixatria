const request = require("request");
const fs = require("fs");

const options = {
    method: "POST",
    url: "https://ixatria.com/api/v1.0/verification/image",
    port: 443,
    headers: {
        "x-api-key": "device-api-key"
    },
    formData : {
        "image" : fs.createReadStream("./images/scr1.png") // Either supply an image file or base64 encoded string
    }
};

request(options, function (err, res, body) {
    if(err) console.log(err);
    console.log(body);
    // body will have this type:
    // { "success": boolean, "reason": string | undefined, "age": number | undefined }
    // reason is present if success is false
    // age is present if success is true
});