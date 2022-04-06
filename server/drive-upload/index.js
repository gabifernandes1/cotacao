//googleapis
const { google } = require('googleapis');

//path module
const path = require('path');

//file system module
const fs = require('fs');

//client id
const CLIENT_ID =
	'770526894528-0l5bmb1t6shupcatuldlrc0uo5iegh9d.apps.googleusercontent.com';

//client secret
const CLIENT_SECRET = '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';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN =
	'1//0hwQFcQo2CLGWCgYIARAAGBESNwF-L9IrOu6urHer-PsjbCU2qYCzhsC3RB4i9asc0tcHplT2XIWsSjswMGBtPh2cbUeo76cJcgo';

const oauth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
	version: 'v3',
	auth: oauth2Client,
});
const filePath = path.join(__dirname, 'imagem.jpg');

async function uploadFile() {
	try {
		const response = await drive.files.create({
			requestBody: {
				name: 'imagem.jpg', //file name
				mimeType: 'image/jpeg',
			},
			media: {
				mimeType: 'image/jpeg',
				body: fs.createReadStream(filePath),
			},
		});
		// report the response from the request
		console.log(response.data);
	} catch (error) {
		//report the error message
		console.log(error.message);
	}
}
uploadFile();
