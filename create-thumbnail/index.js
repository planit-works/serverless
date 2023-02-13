import AWS from 'aws-sdk';
import util from 'util';
import sharp from 'sharp';

const s3 = new AWS.S3();

export const handler = async (event, context, callback) => {
  console.log('이벤트 옵션 내역: ', util.inspect(event, { depth: 5 }));
  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' '),
  );
  const dstBucket = `${srcBucket}-resized`;
  const dstKey = `${srcKey}`;

  //   const typeMatch = srcKey.match(/\.([^.]*)$/);
  //   if (!typeMatch) {
  //     console.log('Could not determine the image type.');
  //     return;
  //   }

  //   const imageType = typeMatch[1].toLowerCase();
  //   if (imageType != 'jpg' && imageType != 'png') {
  //     console.log(`Unsupported image type: ${imageType}`);
  //     return;
  //   }

  try {
    const params = {
      Bucket: srcBucket,
      Key: srcKey,
    };
    var origimage = await s3.getObject(params).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  const width = 200;

  try {
    var buffer = await sharp(origimage.Body).resize(width).toBuffer();
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const destparams = {
      Bucket: dstBucket,
      Key: dstKey,
      Body: buffer,
      ContentType: 'image',
    };

    const putResult = await s3.putObject(destparams).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(
    'Successfully resized ' +
      srcBucket +
      '/' +
      srcKey +
      ' and uploaded to ' +
      dstBucket +
      '/' +
      dstKey,
  );
};
