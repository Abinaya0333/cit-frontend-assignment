import { useEffect, useState } from 'react';

export default function LocationFormModal({ open, initialValues, mode, onCancel, onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName(initialValues?.name || '');
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onCancel}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: 20,
          borderRadius: 10,
          width: 'min(90vw, 360px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 12, fontSize: 16 }}>
          {mode === 'edit' ? 'Edit location' : 'Name this location'}
        </h2>

        {initialValues?.lat !== undefined && (
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 0 }}>
            {initialValues.lat.toFixed(4)}, {initialValues.lng.toFixed(4)}
          </p>
        )}

        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Home, Office, Cafe…"
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #d1d5db',
            borderRadius: 8,
            fontSize: 14,
            boxSizing: 'border-box',
          }}
        />

        {error && (
          <div style={{ color: '#b91c1c', fontSize: 12, marginTop: 6 }}>{error}</div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '8px 14px',
              border: '1px solid #d1d5db',
              background: 'white',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '8px 14px',
              border: 'none',
              background: '#2563eb',
              color: 'white',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            {mode === 'edit' ? 'Save' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}