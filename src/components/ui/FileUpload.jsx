import React, { useState, useRef } from 'react';
import { UploadCloud, File, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export const FileUpload = ({
  onFileSelect,
  accept = '.pdf,.doc,.docx',
  maxSizeMB = 5,
  helperText = 'PDF or Word format (max 5MB)',
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = (file) => {
    setError(null);
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds maximum allowed size of ${maxSizeMB}MB`);
      return;
    }

    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer',
          dragActive
            ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/20'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-900'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files?.[0])}
        />

        <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400 mb-3">
          <UploadCloud className="h-6 w-6" />
        </div>

        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          <span className="text-blue-600 dark:text-blue-400 underline">Click to upload</span> or drag and drop
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      </div>

      {selectedFile && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2.5 truncate">
            <File className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
              {selectedFile.name}
            </span>
            <span className="text-xs text-slate-400">
              ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

