import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import s3Config from './config.json';

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: s3Config.S3_ID,
    secretAccessKey: s3Config.S3_SECRET,
  },
});

export const handler = async (event: any) => {
  const { folder } = event.pathParameters;
  const params = {
    Bucket: s3Config.S3_BUCKET,
    Key: `${folder}/${Date.now()}`,
    ACL: 'public-read',
  };
  const command = new PutObjectCommand(params);

  const presignedURL = await getSignedUrl(s3, command, { expiresIn: 600 });
  const response = {
    statusCode: 200,
    body: JSON.stringify(presignedURL),
  };
  return response;
};
