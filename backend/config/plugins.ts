export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        baseUrl: `https://${env('AWS_S3_BUCKET_NAME')}.storage.railway.app`,
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          },
          endpoint: `https://${env('AWS_S3_BUCKET_NAME')}.storage.railway.app`,
          region: 'auto',
          params: {
            Bucket: env('AWS_S3_BUCKET_NAME'),
          },
          forcePathStyle: false,
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});