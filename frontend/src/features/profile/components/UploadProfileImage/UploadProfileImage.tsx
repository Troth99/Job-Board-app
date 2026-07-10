import { useRef } from "react";

interface ImageUploadProps {
  onFileChange: (file: File) => void; // Приема функция за обработка на файл
}

function ImageUpload({ onFileChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 

    if (file) {
      onFileChange(file); 
    }
  };

  return (
    <div>
        <button className="edit-image-button" onClick={() => fileInputRef.current?.click()}>Choose image </button> 
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange} 
      />
    </div>
  );
}

export default ImageUpload;
