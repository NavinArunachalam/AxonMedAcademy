const { uploadFileToCloudflareR2 } = require('./src/config/cloudflare');
(async () => {
    try {
        const result = await uploadFileToCloudflareR2('temp-video.mp4', 'axon/test-video.mp4', 'video/mp4');
        console.log('OK', result);
    } catch (err) {
        console.error('ERROR', err.message);
        console.error(err.stack);
        process.exit(1);
    }
})();
