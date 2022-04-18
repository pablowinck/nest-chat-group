/// <reference types="multer" />
export declare class S3Service {
    limitSize: number;
    types: string[];
    constructor();
    upload(file: Express.Multer.File): Promise<{
        location: string;
        key: string;
    }>;
    getKeyFromUrl(url: string): string;
    delete(key: string): Promise<void>;
}
