import { useState } from "react";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { useCatalog } from "@/hooks/useAdminLogic";
import { CatalogItem, MenuPayload } from "@/utils/api";
import { Status } from "../shared/Status";

interface MenuCatalogPanelProps {
  title?: string;
}

type MenuType = "BENTO" | "BEVERAGE";

const initialForm = {
  itemType: "BENTO" as MenuType,
  name: "",
  skuCode: "",
  basePrice: "",
  calorieCount: "",
  isRefrigerated: false,
};

export function MenuCatalogPanel({ title = "Menu" }: MenuCatalogPanelProps) {
  const {
    items,
    loading,
    isSubmitting,
    handleReserve,
    createMenu,
    deleteMenu,
    editMenu,
  } = useCatalog();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setForm(initialForm);
    setFormError(null);
    setIsAddMenuOpen(false);
  };

  const handleCreateMenu = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const basePrice = Number(form.basePrice);
    const calorieCount = form.calorieCount.trim()
      ? Number(form.calorieCount)
      : undefined;

    if (!form.name.trim() || !form.skuCode.trim()) {
      setFormError("Name and SKU Code are required.");
      return;
    }

    if (Number.isNaN(basePrice) || basePrice <= 0) {
      setFormError("Base price must be greater than 0.");
      return;
    }

    if (
      form.itemType === "BENTO" &&
      calorieCount !== undefined &&
      (Number.isNaN(calorieCount) || calorieCount < 0)
    ) {
      setFormError("Calorie count must be 0 or higher.");
      return;
    }

    try {
      setFormError(null);
      await createMenu({
        itemType: form.itemType,
        name: form.name.trim(),
        skuCode: form.skuCode.trim(),
        basePrice,
        ...(form.itemType === "BENTO" && calorieCount !== undefined
          ? { calorieCount }
          : {}),
        ...(form.itemType === "BEVERAGE"
          ? { isRefrigerated: form.isRefrigerated }
          : {}),
      });
      resetForm();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Failed to create menu.",
      );
    }
  };

  if (loading) {
    return (
      <section className="flex w-full flex-col gap-4 animate-pulse">
        {/* Placeholder matching your general table/header dimensions */}
        <div className="h-8 w-48 rounded-md bg-surface-shell border border-border-subtle" />
        <div className="h-12 w-full rounded-xl bg-surface-panel border border-border-subtle" />
        <div className="h-[380px] w-full rounded-2xl bg-surface-card border border-border-subtle" />
      </section>
    );
  }

  return (
    <section className="flex flex-col items-start gap-4">
      <div className="flex items-end gap-4">
        <div>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            {title}
          </h2>
        </div>
        <Status variant="PENDING">{items.length}</Status>
      </div>
      <div className="w-full min-h-148 mt-6 space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
        <div className="flex w-full justify-between gap-auto">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                if (isAddMenuOpen) {
                  resetForm();
                  return;
                }
                setFormError(null);
                setIsAddMenuOpen(true);
              }}
              size="sm"
              variant="primary"
            >
              {isAddMenuOpen ? "Close Form" : "Add Menu"}
            </Button>
            {formError ? (
              <p className="text-sm text-red-500">{formError}</p>
            ) : null}
          </div>
          <div className="flex w-48 px-2 gap-1 justify-start items-center border border-border-subtle rounded-full text-text-caption">
            <span className="material-symbols-outlined">search</span>
            <p>Find items...</p>
          </div>
        </div>
        {isAddMenuOpen ? (
          <form
            className="grid w-full grid-cols-1 gap-3 rounded-2xl border border-border-subtle bg-white/80 p-4 md:grid-cols-5"
            onSubmit={handleCreateMenu}
          >
            <Input
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Menu name"
              value={form.name}
            />
            <Input
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  skuCode: event.target.value,
                }))
              }
              placeholder="SKU code"
              value={form.skuCode}
            />
            <Input
              min="0"
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  basePrice: event.target.value,
                }))
              }
              placeholder="Base price"
              step="0.01"
              type="number"
              value={form.basePrice}
            />
            <div className="flex w-full items-center rounded-full border border-gray-300 bg-white px-3">
              <select
                className="w-full bg-transparent py-2 text-sm text-slate-700 outline-none"
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    itemType: event.target.value as MenuType,
                    calorieCount: "",
                    isRefrigerated: false,
                  }))
                }
                value={form.itemType}
              >
                <option value="BENTO">Bento</option>
                <option value="BEVERAGE">Beverage</option>
              </select>
            </div>
            {form.itemType === "BENTO" ? (
              <Input
                min="0"
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    calorieCount: event.target.value,
                  }))
                }
                placeholder="Calorie count"
                type="number"
                value={form.calorieCount}
              />
            ) : (
              <label className="flex min-h-11 items-center justify-between rounded-full border border-gray-300 bg-white px-4 text-sm text-slate-700">
                Refrigerated
                <input
                  checked={form.isRefrigerated}
                  className="h-4 w-4 accent-[#f45d0c]"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isRefrigerated: event.target.checked,
                    }))
                  }
                  type="checkbox"
                />
              </label>
            )}
            <div className="md:col-span-5 flex justify-end gap-3">
              <Button
                onClick={resetForm}
                size="sm"
                type="button"
                variant="adminSecondary"
              >
                Cancel
              </Button>
              <Button
                loading={isSubmitting}
                loadingText="Saving..."
                size="sm"
                type="submit"
                variant="primary"
              >
                Save Menu
              </Button>
            </div>
          </form>
        ) : null}
        <div className="flex w-full flex-col gap-1 flex-1 self-start">
          <div className="flex justify-center items-start gap-2 self-stretch font-semibold">
            <p className="w-20">Menu ID</p>
            <p className="w-56">Menu</p>
            <p className="w-28">Base Price</p>
            <p className="w-28">Current Price</p>
            <p className="flex-1">SKU Code</p>
            <p className="w-28">Packaging Type</p>
            <p className="w-28">Actions</p>
          </div>
          <div className="border border-border-subtle"></div>
          <div className="flex flex-col items-start gap-1 self-stretch">
            {items.length === 0 ? (
              <div className="flex min-h-28 w-full items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-white/70 px-6 text-center text-sm text-text-caption">
                Queue is empty right now.
              </div>
            ) : (
              items.map((item) => <QueueRow key={item.id} item={item} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function QueueRow({ item }: { item: CatalogItem }) {
  const {
    items,
    loading,
    isSubmitting,
    handleReserve,
    createMenu,
    deleteMenu,
    editMenu,
  } = useCatalog();
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  const handleRemoveMenu = async (id: number, itemName: string) => {
    // Prevent accidental clicks with a native browser confirmation
    if (
      !window.confirm(
        `Perhatian: Apakah Anda yakin ingin menghapus ${itemName} dari sistem?`,
      )
    )
      return;

    try {
      await deleteMenu(id);
      // Optional: Add your custom toast/notification here
      console.log(`Berhasil menghapus ${itemName}`);
    } catch (error: any) {
      alert(`Gagal menghapus menu: ${error.message}`);
    }
  };

  const handleEditMenu = async (id: number, updatedPayload: MenuPayload) => {
    try {
      await editMenu(id, updatedPayload);

      // Clear the editing state to close your modal/form
      setEditingItem(null);
      console.log("Menu berhasil diperbarui!");
    } catch (error: any) {
      alert(`Gagal memperbarui menu: ${error.message}`);
    }
  };

  return (
    <article
      key={item.id}
      className="flex w-full flex-row justify-center items-center gap-2 self-stretch text-text-caption"
    >
      <div className="w-4 h-4 bg-surface-shell border rounded-sm border-border-subtle"></div>
      <div className="flex flex-col gap-4 items-start w-14">
        <p>{item.id}</p>
      </div>
      <div className="flex w-56 flex-col gap-4 items-start justify-center gap-3 self-stretch ">
        <p>{item.name}</p>
      </div>
      <div className="flex w-28 justify-center items-center gap-4">
        <Input
          placeholder={item.basePrice.toString()}
          value={item.basePrice.toString()}
        ></Input>
      </div>
      <div className="flex w-28 items-center gap-2 self-stretch">
        <Input
          readOnly
          placeholder={
            item.currentPrice?.toString() ?? item.basePrice.toString()
          }
          defaultValue={
            item.currentPrice?.toString() ?? item.basePrice.toString()
          }
        ></Input>
      </div>
      <div className="flex flex-1 justify-start items-start gap-3">
        <p>{item.skuCode}</p>
      </div>
      <div className="flex justify-start items-center gap-4 w-28">
        <p>{item.packagingType}</p>
      </div>
      <div className="flex w-28 justify-start items-center gap-2">
        <button
          onClick={() => handleReserve(item.skuCode)}
          className="flex items-center p-1 bg-white border rounded-sm border-border-subtle"
        >
          <span className="material-symbols-outlined p-0">edit</span>
        </button>
        <button
          onClick={() => handleRemoveMenu(item.id, item.name)}
          className="flex items-center p-1 bg-white border rounded-sm border-border-subtle"
        >
          <span className="material-symbols-outlined p-0">delete</span>
        </button>
        <button
          onClick={() => setEditingItem(item)}
          className="flex items-center p-1 bg-white border rounded-sm border-border-subtle"
        >
          <span className="material-symbols-outlined p-0">hand_meal</span>
        </button>
      </div>
    </article>
  );
}
