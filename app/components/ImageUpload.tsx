import React, { useState, useCallback } from "react";

interface ImageUploadProps {
  initialImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ initialImage }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImage || null
  );

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  // Placeholder for upload function
  const handleUpload = async () => {
    alert("Replace this alert with your upload logic");
  };

  return (
    <div className="space-y-4">
      {imagePreview && (
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file:btn file:btn-primary"
      />
      <button onClick={handleUpload} className="btn btn-primary">
        Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;
