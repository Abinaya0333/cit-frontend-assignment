import { useEffect, useState } from 'react';

export default function LocationFormModal({ open, initialValues, mode, onCancel, onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName(initialValues?.name || initialValues?.suggestedName || '');
      setError('');
    }
  }, [open, initialValues]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required.');
      return;
    }
    if (trimmed.length > 80) {
      setError('Name must be 80 characters or fewer.');
      return;
    }
    onSubmit({ name: trimmed });
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal-card" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 className="modal-title">
          {mode === 'edit' ? 'Edit location' : 'Name this location'}
        </h2>

        {initialValues?.lat !== undefined && (
          <p className="modal-coords">
            {initialValues.lat.toFixed(4)}, {initialValues.lng.toFixed(4)}
          </p>
        )}

        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Home, Office, Cafe…"
          className="modal-input"
        />

        {error && <div className="modal-error">{error}</div>}

        <div className="modal-actions">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === 'edit' ? 'Save' : 'Add location'}
          </button>
        </div>
      </form>
    </div>
  );
}