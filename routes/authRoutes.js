const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { CLIENT_ID, CLIENT_SECRET, TOKEN_SECRET } = require('../config');

function decodeBasicAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith('Basic ')) return null;
  const base64Credentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [client_id, client_secret] = decodedCredentials.split(':');
  return { client_id, client_secret };
}

router.post('/token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const { client_id, client_secret } = decodeBasicAuth(authHeader) || {};

  console.log('req.body', req.body);
  console.log('client_id', client_id);
  console.log('client_secret', client_secret);

  if (req.body.grant_type !== 'client_credentials') {
    return res.status(400).json({
      error: 'unsupported_grant_type',
      error_description: "The grant type must be 'client_credentials'."
    });
  }

  if (client_id !== CLIENT_ID || client_secret !== CLIENT_SECRET) {
    return res.status(401).json({
      error: 'invalid_client',
      error_description: 'The client ID or secret is incorrect.'
    });
  }

  const accessToken = jwt.sign(
    {
      scope: ['read', 'write'],
      client_id: client_id
    },
    TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: 3600
  });
});

module.exports = router;