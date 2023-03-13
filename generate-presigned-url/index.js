const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

export const handler = async (event) => {
  if (event.body.type === 'PreventColdStart') {
    return { statusCode: 204 };
  }
  const body = JSON.parse(event.body);
  const { folder } = body;
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `${folder}/${Date.now()}`,
  };
  const command = new PutObjectCommand(params);

  const presignedURL = await getSignedUrl(s3, command, { expiresIn: 600 });
  const response = {
    statusCode: 200,
    body: presignedURL,
  };
  return response;
};
