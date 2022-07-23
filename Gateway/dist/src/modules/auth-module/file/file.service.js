"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
let FileService = class FileService {
    constructor(configService) {
        const oauth2Client = new googleapis_1.google.auth.OAuth2(configService.get('GOOGLE_ID'), configService.get('GOOGLE_SECRET'));
        oauth2Client.setCredentials({ refresh_token: configService.get('GOOGLE_REFRESH_TOKEN') });
        this.drive = googleapis_1.google.drive({ version: 'v3', auth: oauth2Client });
    }
    async uploadFile(file) {
        const bufferStream = new stream_1.Stream.PassThrough();
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
        });
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
        return `https://drive.google.com/uc?id=${data.id}`;
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map