import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import aws from 'aws-sdk'
import sharp from 'sharp'
import crypto from 'crypto'

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

@Injectable()
export class S3Service {
  limitSize: number
  types: string[]

  constructor() {
    this.limitSize = 1024 * 1024 // 1MB
    this.types = ['png', 'jpg', 'jpeg']
  }

  async upload(file: Express.Multer.File) {
    if (!file) throw new HttpException('File not found', HttpStatus.BAD_REQUEST)
    const { mimetype, size, buffer } = file
    if (size > this.limitSize) {
      throw new HttpException(
        `File size is too large. Max size is ${this.limitSize} bytes.`,
        HttpStatus.BAD_REQUEST
      )
    }
    if (!this.types.includes(mimetype.split('/')[1])) {
      throw new HttpException(
        `File type is not supported. Supported types are ${this.types.join(
          ', '
        )}`,
        HttpStatus.BAD_REQUEST
      )
    }

    const fileName = `${Date.now()}-${crypto.randomUUID()}`
    const bufferOptimized = await sharp(buffer)
      .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 70, progressive: true })
      .toBuffer()

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${fileName}.jpg`,
      Body: bufferOptimized,
      ACL: 'public-read',
      ContentType: mimetype,
    }

    const { Location, Key } = await s3.upload(params).promise()

    return {
      location: Location,
      key: Key,
    }
  }

  getKeyFromUrl(url: string) {
    return url.split('/').pop()
  }
  
  async delete(key: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    }
    await s3.deleteObject(params).promise()
  }
}
