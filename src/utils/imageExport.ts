import { toPng } from 'html-to-image';
import { soundEngine } from './soundEngine';

/**
 * Captures an HTML element and triggers a download of the resulting PNG.
 * @param elementId The ID of the DOM element to capture.
 * @param filename The desired filename for the downloaded image.
 */
export const downloadCardAsImage = async (elementId: string, filename: string): Promise<boolean> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return false;
  }

  try {
    // Play a "camera shutter" style click if possible, or standard click
    soundEngine.playClick();
    
    // We render twice to fix some font-loading quirks in html-to-image
    await toPng(element, { cacheBust: true, pixelRatio: 2 });
    const dataUrl = await toPng(element, { 
      cacheBust: true, 
      pixelRatio: 2,
      style: {
        transform: 'scale(1)', // Ensure no scaling issues
        transformOrigin: 'top left'
      }
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
    
    // Play success sound when download finishes
    setTimeout(() => {
      soundEngine.playSuccess();
    }, 500);
    
    return true;
  } catch (err) {
    console.error('Failed to generate image', err);
    soundEngine.playError();
    return false;
  }
};
