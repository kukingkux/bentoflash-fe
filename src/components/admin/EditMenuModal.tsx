"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { CatalogItem, MenuPayload } from "@/utils/api";
import { useEffect, useState } from "react";

interface EditMenuModalProps {
  item: CatalogItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, payload: MenuPayload) => Promise<void>;
  isSubmitting: boolean;
}

export default function EditMenuModal({
  item,
  isOpen,
  onClose,
  onSave,
  isSubmitting,
}: EditMenuModalProps) {
  // Kesimpulan Tipe: Jika ada packaging botol atau tidak ada kalori, anggap BEVERAGE
  const isBeverage =
    item.packagingType?.includes("Bottle") || item.calories === 0;
  const initialType = isBeverage ? "BEVERAGE" : "BENTO";

  const [formData, setFormData] = useState({
    itemType: initialType as "BENTO" | "BEVERAGE",
    name: item.name || "",
    skuCode: item.skuCode || "",
    basePrice: item.basePrice || 0,
    calorieCount: item.calories || 0,
    isRefrigerated: false,
  });

  useEffect(() => {
    if (isOpen && item) {
      const isBev =
        item.packagingType?.includes("Bottle") || item.calories === 0;
      setFormData({
        itemType: isBev ? "BEVERAGE" : "BENTO",
        name: item.name || "", // Menyesuaikan dengan api.ts baru
        skuCode: item.skuCode || "",
        basePrice: item.basePrice || 0,
        calorieCount: item.calories || 0, // Menyesuaikan dengan api.ts baru
        isRefrigerated: false,
      });
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // 1. Susun payload sesuai dengan interface MenuPayload di api.ts
    const payload: MenuPayload = {
      itemType: formData.itemType,
      name: formData.name,
      skuCode: formData.skuCode,
      basePrice: Number(formData.basePrice),
    };

    // 2. Kirim parameter spesifik subclass (Bento vs Beverage)
    if (formData.itemType === "BENTO") {
      payload.calorieCount = Number(formData.calorieCount);
    } else {
      payload.isRefrigerated = formData.isRefrigerated;
    }

    await onSave(item.id, payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm rounded-3xl">
      <div className="w-full max-w-md rounded-3xl border border-border-subtle bg-surface-card p-6 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text-secondary">
            Edit Menu Item
          </h2>
          <p className="text-sm text-text-muted font-mono mt-1">
            ID: {item.id} • TYPE: {formData.itemType}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Nama Menu"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
          />

          <Input
            label="SKU Code"
            value={formData.skuCode}
            onChange={(e) =>
              setFormData({ ...formData, skuCode: e.target.value })
            }
            disabled={isSubmitting}
          />

          <Input
            label="Harga Normal (Base Price)"
            type="number"
            value={formData.basePrice}
            onChange={(e) =>
              setFormData({ ...formData, basePrice: Number(e.target.value) })
            }
            disabled={isSubmitting}
          />

          {/* Conditional Input: Hanya muncul jika tipe makanan adalah BENTO */}
          {formData.itemType === "BENTO" && (
            <Input
              label="Total Kalori (Kcal)"
              type="number"
              value={formData.calorieCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  calorieCount: Number(e.target.value),
                })
              }
              disabled={isSubmitting}
            />
          )}
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-border-subtle pt-4">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
