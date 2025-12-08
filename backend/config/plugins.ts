export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        baseUrl: `https://${env('AWS_BUCKET')}.storage.railway.app`,
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          },
          endpoint: env('AWS_ENDPOINT'),
          region: env('AWS_REGION', 'auto'),
          params: {
            Bucket: env('AWS_BUCKET'),
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