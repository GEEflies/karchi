const { Jimp } = require('jimp');

async function enhanceImage() {
    try {
        const inputPath = '/Users/carly/GITHUB REPOS/karchi/public/images/final-hero.png';
        const outputPath = '/Users/carly/GITHUB REPOS/karchi/public/images/final-hero-enhanced.png';

        console.log(`Reading from ${inputPath}`);
        const image = await Jimp.read(inputPath);

        console.log('Enhancing image...');

        // Increase contrast (0 to 1) - slight boost
        image.contrast(0.2);

        // Adjust brightness (-1 to 1) - slight boost
        image.brightness(0.05);

        console.log(`Writing to ${outputPath}`);
        await new Promise((resolve, reject) => {
            image.write(outputPath, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        console.log('Success');
    } catch (err) {
        console.error('Error processing image:', err);
        process.exit(1);
    }
}

enhanceImage();
