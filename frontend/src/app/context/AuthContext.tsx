// Contexto de autenticación: proporciona `session`, `user`, `loading`
// y helpers (p.ej. `signOut`) a toda la aplicación.
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al montar: comprobar sesión actual y escuchar cambios de auth
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Cierra sesión vía Supabase
    const signOut = async () => {
        await supabase.auth.signOut();
    };

    // Marca simple para UI; extender con roles si hace falta
    const isAdmin = !!user;

    return (
        <AuthContext.Provider value={{ session, user, loading, isAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook de ayuda para consumir el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
