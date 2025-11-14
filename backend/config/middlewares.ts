module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:5179',
        'http://localhost:5176', 
        'http://localhost:5173', 
        'http://localhost:3000',
        'https://help.creatordoor.com', // ✅ ADD YOUR PRODUCTION URL
        'https://*.netlify.app', // ✅ ADD Netlify preview URLs (optional)
      ],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];