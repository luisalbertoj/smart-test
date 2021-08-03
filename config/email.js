module.exports.email = {
  service: "Mailgun",
  auth: {
    user: 'postmaster@sandbox4b23f4af85ba4017b9d117d0fc534929.mailgun.org',
    pass: '86f6ded596c149e00be70628e461aabc-64574a68-71fcb436',
  },
  from: 'email@your-domain',
  templateDir: 'views/emailTemplates',
  testMode: false,
};
