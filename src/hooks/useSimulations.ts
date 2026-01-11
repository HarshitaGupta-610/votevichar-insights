import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { demoSimulations } from "@/data/electionDatasets";

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
      if (!user) {
        // Return demo simulations for guests/unauthenticated users
        return demoSimulations as unknown as Simulation[];
      }

      try {
        const { data, error } = await supabase
          .from("simulations")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        // If no data, return empty array (not demo data for authenticated users)
        return (data as Simulation[]) || [];
      } catch (err) {
        console.error("Error fetching simulations, using fallback:", err);
        // Fallback to empty array on error for authenticated users
        return [];
      }
    },
    enabled: true, // Always enabled to support guest mode
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

  // Get user's simulations (for comparison, history, etc.)
  const getUserSimulations = async (userId: string): Promise<Simulation[]> => {
    try {
      const { data, error } = await supabase
        .from("simulations")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as Simulation[]) || [];
    } catch (err) {
      console.error("Error fetching user simulations:", err);
      return [];
    }
  };

  // Save simulation with all parameters
  const saveSimulation = async (simulationData: CreateSimulationData): Promise<Simulation | null> => {
    if (!user) {
      console.error("Cannot save simulation: User not authenticated");
      return null;
    }

    try {
      const result = await createSimulation.mutateAsync(simulationData);
      return result;
    } catch (err) {
      console.error("Error saving simulation:", err);
      return null;
    }
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
    getUserSimulations,
    saveSimulation,
  };
};
