/**
 * Image Storage & Optimization Service for Plaisirs & Saveurs HACCP
 * Automatically compresses camera and uploaded photos before storage & cloud sync.
 * Keeps photos lightweight (~30-50KB) to prevent localStorage quota exhaustion on phones.
 */

export interface ImageCompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export const compressImage = async (
  fileOrBase64: File | string,
  options: ImageCompressionOptions = {}
): Promise<string> => {
  const {
    maxWidth = 640,
    maxHeight = 640,
    quality = 0.72,
    format = 'image/jpeg',
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      try {
        let { width, height } = img;

        // Maintain aspect ratio while bounding within maxWidth/maxHeight
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(typeof fileOrBase64 === 'string' ? fileOrBase64 : '');
          return;
        }

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL(format, quality);
        resolve(compressedDataUrl);
      } catch (err) {
        console.warn('[ImageStorage] Canvas compression fallback:', err);
        resolve(typeof fileOrBase64 === 'string' ? fileOrBase64 : '');
      }
    };

    img.onerror = (err) => {
      console.warn('[ImageStorage] Image load error, using fallback', err);
      if (typeof fileOrBase64 === 'string') {
        resolve(fileOrBase64);
      } else {
        reject(err);
      }
    };

    if (typeof fileOrBase64 === 'string') {
      img.src = fileOrBase64;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        } else {
          reject(new Error('FileReader empty result'));
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(fileOrBase64);
    }
  });
};
