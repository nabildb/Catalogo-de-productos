// Inicializa el cliente de Supabase con las variables de entorno.
// Usado por los servicios para consultar y mutar datos.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn('Faltan variables de entorno de Supabase. Añádelas a .env.');
  }
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
