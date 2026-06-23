// src/hooks/useAdminLogic.ts
import {
  api,
  type CatalogItem,
  type KitchenOrder,
  type MenuPayload,
  type UserProfile,
  type UserResponse,
} from "@/utils/api";
import { useEffect, useState } from "react";

// 1. Modul Hafidh & Keishin (Catalog & Reserve)
export function useCatalog() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestPickupCode, setLatestPickupCode] = useState<string | null>(null);

  const fetchItems = async (showLoader: boolean = true) => {
    if (showLoader) {
      setLoading(true);
    }
    try {
      const data = await api.getCatalog();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  const handleReserve = async (
    skuCode: string,
    quantity: number = 1,
    userId: number = 1,
  ) => {
    try {
      const res = await api.reserveBento({ userId, skuCode, quantity });
      setLatestPickupCode(res.pickupCode);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await api.getCatalog();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void loadItems();
  }, []);

  const createMenu = async (payload: MenuPayload) => {
    setIsSubmitting(true);
    try {
      const created = await api.createMenu(payload);
      await fetchItems(false);
      return created;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const editMenu = async (id: number, payload: MenuPayload) => {
    setIsSubmitting(true);
    try {
      await api.updateMenu(id, payload);
      await fetchItems(); // Auto-refresh the table data
    } catch (err) {
      console.error("Update Menu Error:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete (DELETE)
  const deleteMenu = async (id: number) => {
    setIsSubmitting(true);
    try {
      await api.deleteMenu(id);
      await fetchItems(); // Auto-refresh the table data
    } catch (err) {
      console.error("Delete Menu Error:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    items,
    loading,
    isSubmitting,
    latestPickupCode,
    handleReserve,
    fetchItems,
    createMenu,
    editMenu,
    deleteMenu,
  };
}

// 2. Modul Rafael (FIFO Queue)
export function useKitchenQueue(autoPollMs: number = 5000) {
  const [queue, setQueue] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const data = await api.getKitchenQueue();
      setQueue(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadQueue = async () => {
      try {
        const data = await api.getKitchenQueue();
        setQueue(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void loadQueue();
    const interval = setInterval(loadQueue, autoPollMs);
    return () => clearInterval(interval);
  }, [autoPollMs]);

  return { queue, loading, fetchQueue };
}

export function useCustomerOrders() {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmPickup = async (
    orderId: number,
    onSuccess?: () => void,
  ) => {
    setIsConfirming(true);
    try {
      const response = await api.confirmPickup(orderId);

      // Opsional: Tampilkan notifikasi sukses atau perubahan Karma Poin
      console.log("Pickup Confirmed!", response.message);
      if (response.newKarmaScore !== undefined) {
        console.log(`Skor Karma Anda sekarang: ${response.newKarmaScore}`);
      }

      // Trigger refresh data jika ada (misal me-refresh list pesanan aktif)
      if (onSuccess) onSuccess();
    } catch (error: any) {
      alert(`Gagal: ${error.message}`);
    } finally {
      setIsConfirming(false);
    }
  };

  return { handleConfirmPickup, isConfirming };
}

// 3. Modul Elfan (Time Leap / Cron)
export function useFlashDiscount() {
  const [isTriggering, setIsTriggering] = useState(false);

  const executeLeap = async () => {
    setIsTriggering(true);
    try {
      await api.triggerDiscount();
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsTriggering(false);
    }
  };

  const resetTime = async () => {
    setIsTriggering(true);
    try {
      await api.triggerResetDiscount();
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsTriggering(false);
    }
  };

  return { executeLeap, resetTime, isTriggering };
}

export function useKarmaSystem(initialUserId: number = 1) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isPenalizing, setIsPenalizing] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsUserLoading(true);
      try {
        const dbUser = await api.getUserProfile(initialUserId);
        setUser(dbUser);
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setIsUserLoading(false);
      }
    };

    loadUser();
  }, [initialUserId]);

  const applyPenalty = async () => {
    if (!user) return;
    setIsPenalizing(true);
    try {
      const updated = await api.triggerGhostPenalty(user.id);
      setUser(updated);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsPenalizing(false);
    }
  };

  return { user, applyPenalty, isPenalizing, isUserLoading };
}

export function useUsers() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  return { users, loading, fetchUsers };
}

