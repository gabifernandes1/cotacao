const fs = require('fs');
const { google } = require('googleapis');
// const { auth } = require('./gdrive-auth');
var client_secret = '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';
var client_id =
	'770526894528-0l5bmb1t6shupcatuldlrc0uo5iegh9d.apps.googleusercontent.com';
var redirect_uris = ['https://developers.google.com/oauthplayground'];
const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
const REFRESH_TOKEN =
	'1//0hIB1EMk7tdTICgYIARAAGBESNwF-L9IrULwem66vxwQ_tr0FND_Ox0m5ZDPtqwy5lMk1rqBKOom7AaoFLTQAwEcpk1-YRmripU8';

auth.setCredentials({ refresh_token: REFRESH_TOKEN });

function imageUpload(fileName, filePath, callback) {
	const fileMetadata = {
		name: fileName,
	};

	const media = {
		mimeType: 'image/jpeg',
		body: fs.createReadStream(filePath),
	};
	console.log('oi', auth);

	const drive = google.drive({ version: 'v3', auth });
	drive.files.create(
		{
			resource: fileMetadata,
			media: media,
			fields: 'id',
		},
		function (err, file) {
			if (err) {
				// Handle error
				console.error(err);
			} else {
				callback(file.data.id);
			}
		}
	);
}

module.exports = { imageUpload };
