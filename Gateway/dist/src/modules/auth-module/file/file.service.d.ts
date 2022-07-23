/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class FileService {
    private drive;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<string>;
}
