import React, { useState, useEffect, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true);
      setError(event.error);
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      setHasError(true);
      setError(event.reason);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  if (hasError) {
    let message = "Ocorreu um erro inesperado.";
    
    try {
      const firestoreError = JSON.parse(error?.message || "");
      if (firestoreError.error && firestoreError.error.includes("insufficient permissions")) {
        message = "Você não tem permissão para realizar esta ação ou acessar estes dados.";
      }
    } catch (e) {
      // Not a JSON error
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-neu-bg)] p-4">
        <div className="neu-flat p-8 rounded-3xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ops! Algo deu errado</h2>
          <p className="text-slate-600 mb-6">{message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 neu-flat rounded-xl hover:neu-pressed transition-all font-bold text-slate-700"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
