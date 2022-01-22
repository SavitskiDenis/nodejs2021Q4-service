import { FastifyPluginCallback } from 'fastify';
import loginController from './login.controller';
import HTTP_CODES from '../../common/http_codes';

const { CODE_OK, CODE_FORBIDDEN, CODE_BAD_REQUEST } = HTTP_CODES;

const requestLoginSchema = {
  type: 'object',
  properties: {
    login: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['login', 'password']
};

const responseLoginSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string'
    }
  }
};

const loginOpts = {
  schema: {
    body: requestLoginSchema,
    response: {
      [CODE_OK]: responseLoginSchema,
      [CODE_FORBIDDEN]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
        type: 'string'
      }
    }
  },
  handler: loginController.login
};

/**
 * Login router for fastify
 * 
 * @param fastify - Instance of fastify
 * @param _ - Unused arg
 * @param done - Done cb function
 */
const router: FastifyPluginCallback = (fastify, _, done) => {
    fastify.post('/login', loginOpts);
  
    done();
  };
  
  export default router;
