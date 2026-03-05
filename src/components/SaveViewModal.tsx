import React, { useState } from 'react';

export default function SaveViewModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [autoApply, setAutoApply] = useState(false);

  const handleSave = () => {
    onSave(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-[2px]" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-7 pb-5">
          <h2 className="text-2xl font-semibold text-gray-900">Guardar vista</h2>
        </div>
        <div className="h-px bg-gray-200 mx-0" />

        {/* Body */}
        <div className="px-8 py-6 flex flex-col gap-5">

          {/* Variante input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-base text-gray-500">Nombre de la vista:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Escribir nombre"
              className="w-full rounded-lg border border-gray-300 focus:border-primary outline-none px-4 py-2.5 text-base text-gray-900 placeholder:text-gray-400 transition-colors"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-4">
            {[
              { label: 'Default',                 checked: isDefault,  onChange: setIsDefault  },
              { label: 'Pública',                 checked: isPublic,   onChange: setIsPublic   },
              { label: 'Aplica automáticamente',  checked: autoApply,  onChange: setAutoApply  },
            ].map(({ label, checked, onChange }) => (
              <label key={label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={e => onChange(e.target.checked)}
                  className="size-5 rounded border-gray-300 text-primary cursor-pointer"
                />
                <span className="text-base text-gray-900">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Footer */}
        <div className="px-8 py-4 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="text-base font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-base font-semibold hover:bg-primary-dark transition-colors shadow-sm"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
