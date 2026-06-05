export interface CompressImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  /** Skip compression if file is smaller than this (bytes) */
  skipBelowBytes?: number;
  /** Target max output size — quality is lowered until reached */
  maxOutputBytes?: number;
}

const DEFAULTS: Required<CompressImageOptions> = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.85,
  skipBelowBytes: 250 * 1024,
  maxOutputBytes: 1.5 * 1024 * 1024,
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Не удалось прочитать изображение'));
    img.src = src;
  });
}

function scaleDimensions(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  if (width <= maxWidth && height <= maxHeight) {
    return { width, height };
  }
  const ratio = Math.min(maxWidth / width, maxHeight / height);
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Сжатие не удалось'))),
      'image/jpeg',
      quality
    );
  });
}

/**
 * Resize and compress an image on the client before upload.
 * Output is JPEG (photos/card images don't need transparency).
 */
export async function compressImage(
  file: File,
  options: CompressImageOptions = {}
): Promise<File> {
  const opts = { ...DEFAULTS, ...options };

  if (!file.type.startsWith('image/')) {
    return file;
  }

  // GIF — keep as-is (animation / palette)
  if (file.type === 'image/gif') {
    return file;
  }

  if (file.size <= opts.skipBelowBytes) {
    return file;
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const img = await loadImage(objectUrl);
    const { width, height } = scaleDimensions(
      img.naturalWidth,
      img.naturalHeight,
      opts.maxWidth,
      opts.maxHeight
    );

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return file;

    ctx.drawImage(img, 0, 0, width, height);

    let quality = opts.quality;
    let blob = await canvasToBlob(canvas, quality);

    while (blob.size > opts.maxOutputBytes && quality > 0.45) {
      quality -= 0.1;
      blob = await canvasToBlob(canvas, quality);
    }

    const baseName = file.name.replace(/\.[^.]+$/, '') || 'image';
    return new File([blob], `${baseName}.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
