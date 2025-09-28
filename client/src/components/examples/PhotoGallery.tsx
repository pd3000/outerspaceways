import { PhotoGallery } from '../PhotoGallery';
import { ThemeProvider } from '../ThemeProvider';

export default function PhotoGalleryExample() {
  return (
    <ThemeProvider>
      <PhotoGallery />
    </ThemeProvider>
  );
}