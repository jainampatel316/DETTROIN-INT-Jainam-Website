import { useCallback, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/* Full-screen photo viewer built on Radix Dialog: focus trapping, scroll
   lock and Escape come from the primitive; arrow-key paging is added here.
   `index` is null when closed. */
export default function Lightbox({ photos, index, onClose, onIndex }) {
  const open = index !== null && index >= 0;

  const step = useCallback(
    (delta) => {
      if (!open) return;
      onIndex((index + delta + photos.length) % photos.length);
    },
    [open, index, photos.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  const photo = open ? photos[index] : null;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="lb-overlay" />
        <Dialog.Content className="lb-content" aria-describedby={undefined}>
          <Dialog.Title className="lb-title">
            {photo ? `Photo ${index + 1} of ${photos.length}` : 'Gallery'}
          </Dialog.Title>

          <button
            type="button"
            className="lb-nav lb-prev"
            onClick={() => step(-1)}
            aria-label="Previous photo"
          >
            <ChevronLeft size={26} strokeWidth={2} />
          </button>

          <figure className="lb-figure">
            {photo && <img src={photo.src} alt={photo.alt} className="lb-img" />}
            <figcaption className="lb-caption">
              <span className="lb-count">
                {index + 1} <i>/</i> {photos.length}
              </span>
              <span className="lb-hint">Use the arrow keys to browse</span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lb-nav lb-next"
            onClick={() => step(1)}
            aria-label="Next photo"
          >
            <ChevronRight size={26} strokeWidth={2} />
          </button>

          <Dialog.Close className="lb-close" aria-label="Close gallery">
            <X size={20} strokeWidth={2.2} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
