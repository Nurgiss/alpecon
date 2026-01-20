interface ImagePlaceholderProps {
  height?: string;
  label?: string;
  className?: string;
}

export function ImagePlaceholder({ 
  height = 'h-64', 
  label = 'Image',
  className = ''
}: ImagePlaceholderProps) {
  return (
    <div className={`${height} border-2 border-gray-300 bg-gray-100 flex items-center justify-center ${className} rounded-md`}>
      <span className="text-sm text-gray-500 font-mono">{label}</span>
    </div>
  );
}