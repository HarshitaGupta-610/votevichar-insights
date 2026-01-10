import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Simulation {
  id: string;
  user_id: string;
  name: string;
  model: string;
  states_count: number;
  cycle_length: number;
  cost_assumption: string;
  manpower_level: string;
  cost_savings: string | null;
  efficiency: string | null;
  status: "completed" | "pending";
  created_at: string;
  updated_at: string;
}

export interface CreateSimulationData {
  name: string;
  model: string;
  states_count: number;
  cycle_length: number;
  cost_assumption: string;
  manpower_level: string;
  cost_savings?: string;
  efficiency?: string;
  status?: "completed" | "pending";
}

export const useSimulations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: simulations = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["simulations", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("simulations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Simulation[];
    },
    enabled: !!user,
  });

  const createSimulation = useMutation({
    mutationFn: async (data: CreateSimulationData) => {
      if (!user) throw new Error("User not authenticated");

      const { data: newSim, error } = await supabase
        .from("simulations")
        .insert({
          user_id: user.id,
          ...data,
          status: data.status || "pending",
        })
        .select()
        .single();

      if (error) throw error;
      return newSim as Simulation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["simulations", user?.id] });
    },
  });

  const updateSimulation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Simulation> & { id: string }) => {
      const { data: updated, error } = await supabase
        .from("simulations")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return updated as Simulation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["simulations", user?.id] });
    },
  });

  const deleteSimulation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("simulations")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["simulations", user?.id] });
    },
  });

  const getRecentSimulations = (count: number) => {
    return simulations.slice(0, count);
  };

  return {
    simulations,
    isLoading,
    error,
    refetch,
    createSimulation,
    updateSimulation,
    deleteSimulation,
    getRecentSimulations,
  };
};
