
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useSupabaseData<T>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        toast.error(`Failed to load ${tableName}`);
        return;
      }

      setData(result || []);
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
      toast.error(`Failed to load ${tableName}`);
    } finally {
      setLoading(false);
    }
  };

  // Add item to Supabase
  const addItem = async (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert([item])
        .select()
        .single();

      if (error) {
        console.error(`Error adding to ${tableName}:`, error);
        toast.error(`Failed to add ${tableName.slice(0, -1)}`);
        return null;
      }

      setData(prev => [result, ...prev]);
      toast.success(`${tableName.slice(0, -1)} added successfully`);
      return result;
    } catch (error) {
      console.error(`Error adding to ${tableName}:`, error);
      toast.error(`Failed to add ${tableName.slice(0, -1)}`);
      return null;
    }
  };

  // Update item in Supabase
  const updateItem = async (id: string, updates: Partial<T>) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating ${tableName}:`, error);
        toast.error(`Failed to update ${tableName.slice(0, -1)}`);
        return null;
      }

      setData(prev => prev.map(item => 
        (item as any).id === id ? result : item
      ));
      toast.success(`${tableName.slice(0, -1)} updated successfully`);
      return result;
    } catch (error) {
      console.error(`Error updating ${tableName}:`, error);
      toast.error(`Failed to update ${tableName.slice(0, -1)}`);
      return null;
    }
  };

  // Delete item from Supabase
  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting from ${tableName}:`, error);
        toast.error(`Failed to delete ${tableName.slice(0, -1)}`);
        return false;
      }

      setData(prev => prev.filter(item => (item as any).id !== id));
      toast.success(`${tableName.slice(0, -1)} deleted successfully`);
      return true;
    } catch (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      toast.error(`Failed to delete ${tableName.slice(0, -1)}`);
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName]);

  return {
    data,
    loading,
    addItem,
    updateItem,
    deleteItem,
    refreshData: fetchData
  };
}
