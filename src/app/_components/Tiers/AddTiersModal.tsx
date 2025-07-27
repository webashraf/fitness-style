import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function AddTiersForm({
  defaultData,
  onClose,
}: {
  defaultData: any;
  onClose: () => void;
}) {
  // You can initialize form states like this:
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    icon: File | null;
    description: string;
    promoPrice: string;
    discountLabel: string;
  }>({
    name: defaultData?.name || "",
    price: defaultData?.price || "",
    icon: null,
    description: defaultData?.description || "",
    promoPrice: defaultData?.promoPrice || "",
    discountLabel: defaultData?.discountLabel || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      icon: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle submit logic here
    onClose();
  };

  return (
    <form className="tiers-form">
      {" "}
      <div className=" rounded p-4 w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-center justify-center mb-4">
          <FaPlus className="text-brand-!border-brand-primary" /> Add New Tiers
        </h2>

        {/* Tiers Name and Monthly Price */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter tiers name"
            value={formData.name}
            onChange={handleChange}
            className="w-1/2 border !border-brand-primary rounded px-3 py-2 focus:outline-none"
          />
          <input
            type="text"
            name="price"
            placeholder="Monthly Price ($)"
            value={formData.price}
            onChange={handleChange}
            className="w-1/2 border !border-brand-primary rounded px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Upload Icon */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Upload Tiers Icon
          </label>
          <div className="relative">
            <input
              type="file"
              name="icon"
              onChange={handleFileChange}
              className="w-full border !border-brand-primary rounded px-3 py-2 pr-10 cursor-pointer file:mr-2"
            />
            <span className="absolute right-3 top-2.5 text-brand-!border-brand-primary">
              <FaPlus />
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full border !border-brand-primary rounded px-3 py-2 resize-none h-20 focus:outline-none"
          />
        </div>

        {/* Promo Price & Discount Label */}
        <div className="mb-4 !space-y-3">
          <input
            type="text"
            name="promoPrice"
            placeholder="Promotional Price"
            value={formData.promoPrice}
            onChange={handleChange}
            className="w-full border !border-brand-primary rounded px-3 py-2 mb-3 focus:outline-none"
          />
          <input
            type="text"
            name="discountLabel"
            placeholder="Discount Label"
            value={formData.discountLabel}
            onChange={handleChange}
            className="w-full border !border-brand-primary rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-brand-primary hover:bg-green-900 !text-white py-3 rounded"
        >
          Add Tiers
        </button>
      </div>
    </form>
  );
}
