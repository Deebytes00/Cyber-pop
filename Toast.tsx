import { CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ToastProps {
  message: string | null;
  onViewCart: () => void;
}

export function Toast({ message, onViewCart }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 rounded-2xl border border-[#101426]/15 bg-[#101426] px-4 py-3 text-sm text-[#FFF9EC] shadow-xl"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2
              className="h-4 w-4 shrink-0 text-[#FFC94A]"
              aria-hidden="true"
            />
            <span className="font-medium">{message}</span>
          </div>
          <button
            type="button"
            onClick={onViewCart}
            className="shrink-0 rounded-lg bg-[#FFC94A] px-3 py-1.5 text-xs font-bold text-[#101426] transition-colors hover:bg-[#ffbe24] cursor-pointer whitespace-nowrap"
          >
            View Cart
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
