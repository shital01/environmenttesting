const AWS = require('aws-sdk');
const s3 = new AWS.S3();

router.get('/upload',async(req,res)=>{
    const dummyuserid="123qwe13";
    const partNumber = 5;
    const key = `${dummyuserid}/${uuid.v1()}.jpeg`;
    // Initiate the multipart upload
  const initiateParams = {
    Bucket: config.get('bucketName'),
    Key: key,
    ContentType: 'image/jpeg', // Specify the content type
  };
  const initiateResponse = await s3.createMultipartUpload(initiateParams).promise();
  const uploadId = initiateResponse.UploadId;
  const presignedUrls = [];
  for (let partNumber = 1; partNumber <= partCount; partNumber++) {
    const uploadPartParams = {
      Bucket: bucketName,
      Key: objectKey,
      UploadId: uploadId,
      PartNumber: partNumber,
    };
    const presignedUrl = s3.getSignedUrl('uploadPart', uploadPartParams);
    presignedUrls.push(presignedUrl);
  }
  return presignedUrls;
  })
module.exports = router;

