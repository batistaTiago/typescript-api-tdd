export function errorHandler(err, res) {
    console.log(`Error handler foi executado...`);
    // console.log(err.getMessage());

    return res.status(500).json({
        success: false,
        errorCode: 'ERR-001',
        meesage: 'Internal server error, please contact the support team.'
    });
}

export function __errorHandler(err, res) {
    console.log(`Error handler foi executado...`);
    const { statusCode, message } = err;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
};