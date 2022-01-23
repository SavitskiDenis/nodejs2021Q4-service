import HTTP_CODES from '../common/http_codes';

class ForbiddenError extends Error {
    name = 'ForbiddenError';

    statusCode = HTTP_CODES.CODE_FORBIDDEN;
}

export default ForbiddenError;