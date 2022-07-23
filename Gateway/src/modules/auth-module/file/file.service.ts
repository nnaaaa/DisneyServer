import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drive_v3, google } from 'googleapis'
import { Stream } from 'stream';

@Injectable()
export class FileService {
    private drive: drive_v3.Drive;
    constructor(configService: ConfigService) {
        const oauth2Client = new google.auth.OAuth2(configService.get('GOOGLE_ID'), configService.get('GOOGLE_SECRET'))
        oauth2Client.setCredentials({ refresh_token: configService.get('GOOGLE_REFRESH_TOKEN') })
        this.drive = google.drive({ version: 'v3', auth: oauth2Client })
    }

    async uploadFile(file: Express.Multer.File) {
        const bufferStream = new Stream.PassThrough();
        bufferStream.end(file.buffer);
        const { data } = await this.drive.files.create({
            requestBody: {
                name: `DisneyImages/${file.originalname}`,
                mimeType: file.mimetype,
            },
            media: {
                mimeType: file.mimetype,
                body: bufferStream,
            },
        })
        await this.drive.permissions.create({
            fileId: data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        const result = await this.drive.files.get({
            fileId: data.id,
            fields: 'webViewLink',
        });
        return `https://drive.google.com/uc?id=${data.id}`
    }
}
