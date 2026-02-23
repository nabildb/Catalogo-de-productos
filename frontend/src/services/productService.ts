import { supabase } from './supabase';
import type { Product } from '@/types/product';

export const productService = {
    async getProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(*)')
            .eq('is_active', true)
            .order('id', { ascending: true });

        if (error) throw error;
        return data;
    },

    async createProduct(product: Omit<Product, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select();

        if (error) throw error;
        return data[0];
    },

    async updateProduct(id: number, product: Partial<Product>) {
        const { data, error } = await supabase
            .from('products')
            .update(product)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },

    async deleteProduct(id: number) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
