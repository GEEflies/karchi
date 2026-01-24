const { Jimp } = require('jimp');

async function processImage() {
    try {
        const inputPath = '/Users/carly/.gemini/antigravity/brain/8aa6f7a6-6e37-4d6c-a4fb-ff0f58af3005/final_boss_hero_solid_white_1769266295976.png';
        const outputPath = '/Users/carly/GITHUB REPOS/karchi/public/images/final-boss-hero-v3.png';

        console.log(`Reading from ${inputPath}`);
        const image = await Jimp.read(inputPath);

        console.log('Processing image...');
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];

            // Remove white/near-white background
            // Increased threshold to capture off-whites but avoid bright highlights on the face/ring if possible
            if (r > 250 && g > 250 && b > 250) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0
            }
        });

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

processImage();
