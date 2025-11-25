import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { uploadFiles, clearUploadedFiles } from '../redux/fileSlice';

function ImageUploader({ images = [], onChange, required = false, token }) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrls, setPreviewUrls] = useState(images);
  const dispatch = useDispatch();
  const { uploadedUrls, loading: uploading, error } = useSelector((state) => state.files);

  // Actualizar previewUrls cuando se suben archivos exitosamente
  useEffect(() => {
    if (uploadedUrls.length > 0) {
      const updatedUrls = [...previewUrls, ...uploadedUrls];
      setPreviewUrls(updatedUrls);
      onChange(updatedUrls);
      dispatch(clearUploadedFiles());
    }
  }, [uploadedUrls]);

  // Mostrar errores
  useEffect(() => {
    if (error) {
      alert('Error al subir las imágenes: ' + error);
      dispatch(clearUploadedFiles());
    }
  }, [error, dispatch]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;

    dispatch(uploadFiles({ files: imageFiles, token }));
  };

  const removeImage = (index) => {
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newUrls);
    onChange(newUrls);
  };

  const moveImage = (fromIndex, toIndex) => {
    const newUrls = [...previewUrls];
    const [moved] = newUrls.splice(fromIndex, 1);
    newUrls.splice(toIndex, 0, moved);
    setPreviewUrls(newUrls);
    onChange(newUrls);
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive ? 'border-[#2d5d52] bg-[#2d5d52]/5' : 'border-gray-300 hover:border-gray-400'}
          ${required && previewUrls.length === 0 ? 'border-red-300' : ''}
          ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            {uploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5d52]"></div>
            ) : (
              <Upload className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              {uploading ? 'Subiendo imágenes...' : 'Arrastra imágenes aquí'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {uploading ? 'Espera un momento' : 'o haz clic para seleccionar archivos'}
            </p>
          </div>
          {required && previewUrls.length === 0 && (
            <p className="text-sm text-red-600">
              * Debes subir al menos una imagen
            </p>
          )}
        </div>
      </div>

      {/* Preview Grid */}
      {previewUrls.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Imágenes ({previewUrls.length})
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200"
              >
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23ddd" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em">Error</text></svg>';
                  }}
                />
                
                {/* Overlay con controles */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {/* Mover a la izquierda */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                      title="Mover a la izquierda"
                    >
                      ←
                    </button>
                  )}
                  
                  {/* Eliminar */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                    title="Eliminar imagen"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Mover a la derecha */}
                  {index < previewUrls.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                      title="Mover a la derecha"
                    >
                      →
                    </button>
                  )}
                </div>

                {/* Indicador de primera imagen */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-[#2d5d52] text-white text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Tip: La primera imagen será la principal. Usa las flechas para reordenar.
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
