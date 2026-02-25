// Servicio simple para CRUD de productos usando Supabase.
import { supabase } from './supabase';
import type { Product } from '@/types/product';

export const productService = {
    // Obtener lista de productos activos
    async getProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(*)')
            .eq('is_active', true)
            .order('id', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Crear nuevo producto
    async createProduct(product: Omit<Product, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select();

        if (error) throw error;
        return data[0];
    },

    // Actualizar producto por id
    async updateProduct(id: number, product: Partial<Product>) {
        const { data, error } = await supabase
            .from('products')
            .update(product)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },

    // Eliminar producto por id
    async deleteProduct(id: number) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
