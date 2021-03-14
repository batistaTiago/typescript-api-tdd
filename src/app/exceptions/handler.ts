export function errorHandler(err, res) {
    console.log(`Error handler foi executado...`);
    // console.log(err.getMessage());

    return res.status(500).json({
        success: false,
        errorCode: 'ERR-001',
        meesage: 'Internal server error, please contact the support team.'
    });
}