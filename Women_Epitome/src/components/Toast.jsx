import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// ── Context ───────────────────────────────────────────────────────────────────
const ToastContext = createContext(null);

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
    return ctx;
};

// ── Single Toast item ─────────────────────────────────────────────────────────
const ICONS = {
    success: <CheckCircle size={18} className="text-green-500 flex-shrink-0" />,
    error: <XCircle size={18} className="text-red-500   flex-shrink-0" />,
    warning: <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />,
    info: <Info size={18} className="text-blue-500  flex-shrink-0" />,
};

const BAR_COLORS = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
};

const ToastItem = ({ id, type = 'info', message, duration = 4000, onRemove }) => {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const intervalRef = useRef(null);

    // Slide in
    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    // Progress bar countdown
    useEffect(() => {
        if (duration <= 0) return;
        const step = 100 / (duration / 50);
        intervalRef.current = setInterval(() => {
            setProgress(p => {
                if (p <= 0) { clearInterval(intervalRef.current); return 0; }
                return p - step;
            });
        }, 50);
        const timer = setTimeout(() => dismiss(), duration);
        return () => { clearInterval(intervalRef.current); clearTimeout(timer); };
    }, [duration]);

    const dismiss = () => {
        setVisible(false);
        setTimeout(() => onRemove(id), 300);
    };

    return (
        <div
            className={`relative flex items-start gap-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 pr-10 overflow-hidden
                transition-all duration-300 ease-out
                ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
        >
            {ICONS[type]}
            <p className="text-sm text-gray-800 font-medium leading-snug pt-0.5">{message}</p>
            <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X size={15} />
            </button>
            {/* Progress bar */}
            {duration > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                    <div
                        className={`h-full ${BAR_COLORS[type]} transition-all duration-50`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};

// ── Provider ──────────────────────────────────────────────────────────────────
let _id = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const remove = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const add = useCallback((message, type = 'info', duration = 4000) => {
        const id = ++_id;
        setToasts(prev => [...prev, { id, message, type, duration }]);
        return id;
    }, []);

    const toast = {
        success: (msg, dur) => add(msg, 'success', dur),
        error: (msg, dur) => add(msg, 'error', dur ?? 6000),
        warning: (msg, dur) => add(msg, 'warning', dur),
        info: (msg, dur) => add(msg, 'info', dur),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {/* Portal-style fixed container — top-right */}
            <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map(t => (
                    <div key={t.id} className="pointer-events-auto">
                        <ToastItem {...t} onRemove={remove} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider;