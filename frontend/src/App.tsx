// Componente raíz: envuelve la aplicación con autenticación
// y monta el enrutador principal.
import AppRouter from './app/routes/AppRouter';
import { AuthProvider } from './app/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
