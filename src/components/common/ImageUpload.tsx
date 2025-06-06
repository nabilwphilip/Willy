
import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LazyImage from './LazyImage';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className = '' }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsLoading(true);

      // Optimize image before processing
      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulating a delay to show loading state
        setTimeout(() => {
          onChange(reader.result as string);
          setIsLoading(false);
        }, 500); // Reduced delay for better UX
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  return (
    <div className={`${className}`}>
      {value ? (
        <div className="relative">
          <LazyImage
            src={value}
            alt="Uploaded image"
            className="w-full h-48 object-cover rounded-lg"
            placeholder="/placeholder.svg"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 rounded-full"
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
          <label className="flex flex-col items-center justify-center cursor-pointer gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">
              {isLoading ? 'Uploading...' : 'Upload image'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
