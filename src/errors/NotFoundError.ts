class NotFoundError extends Error {
    name = 'NotFoundError';

    statusCode = 404;
}

export default NotFoundError;