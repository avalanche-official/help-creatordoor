export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          },
          endpoint: env('AWS_ENDPOINT_URL'),
          region: env('AWS_DEFAULT_REGION', 'auto'),
          params: {
            Bucket: env('AWS_S3_BUCKET_NAME'),
          },
          forcePathStyle: false,
        },
      },
    },
  },
});