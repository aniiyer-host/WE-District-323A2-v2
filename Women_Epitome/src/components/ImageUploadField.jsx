import React, { useState, useRef } from 'react';
import { ImageIcon } from 'lucide-react';

/**
 * Reusable image file selection component with drag-drop and clipboard paste support.
 * Calls a parent callback with the selected File object for processing.
 * 
 * @param {Function} onFileSelected - Callback when file is selected (receives File object)
 * @param {Boolean} uploading - Whether a file upload is in progress
 * @param {String} ariaLabel - Accessible label for the upload area
 */
export const ImageUploadField = ({ 
  onFileSelected, 
  uploading = false, 
  ariaLabel = 'Image upload area. Click to select, drag and drop, or paste an image.' 
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const dragCounterRef = useRef(0);

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      console.warn('Selected file is not an image');
      return;
    }
    onFileSelected?.(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
      e.target.value = '';
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    dragCounterRef.current = 0;

    const files = e.dataTransfer.files;
    if (files?.length > 0) {
      handleFile(files[0]);
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        if (file && file.type.startsWith('image/')) {
          e.preventDefault();
          e.stopPropagation();
          handleFile(file);
          return;
        }
      }
    }
  };

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded-lg border-2 transition-all outline-none focus:ring-2 focus:ring-purple-300 ${
        dragOver
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-300 hover:border-purple-300 bg-white'
      }`}
      tabIndex="0"
      role="button"
      aria-label={ariaLabel}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="flex-1 min-w-0 px-2 sm:px-3 py-2 border-0 bg-white cursor-pointer text-xs sm:text-sm outline-none file:mr-2 sm:file:mr-4 file:py-1.5 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 file:font-semibold hover:file:bg-purple-100 file:cursor-pointer disabled:opacity-50"
        disabled={uploading}
      />
      {uploading && (
        <div className="flex items-center gap-1.5 text-purple-600 text-xs flex-shrink-0 px-2">
          <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span className="hidden sm:inline">Uploading…</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
