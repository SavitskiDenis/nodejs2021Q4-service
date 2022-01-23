import HTTP_CODES from '../common/http_codes';

class UnauthorizedError extends Error {
    name = 'UnauthorizedError';

    statusCode = HTTP_CODES.CODE_UNAUTHORIZED;
}

export default UnauthorizedError;