import React, { useState } from "react";

interface EditCategoryModalProps {
  category: { id: number; name: string };
  onClose: () => void;
  onUpdate: (updated: { id: number; name: string }) => void;
}

const EditCategoryModal = ({
  category,
  onClose,
  onUpdate,
}: EditCategoryModalProps) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = () => {
    onUpdate({ id: category.id, name });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="p-6 bg-white rounded-xl w-80">
        <h2 className="mb-4 text-lg font-semibold">Editar Categoría</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
