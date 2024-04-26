"use client";

import React, { useState } from "react";
import { CircleAlert, ChevronDown, UserRound } from "lucide-react";

import Modal from "../components/Modal";
import { useSurvivors } from "../contexts/SurvivorsContext";
import { SurvivorsInventories } from "../dataTypes";

interface FormData {
  item: string;
}

interface SelectedSurvivor {
  id: number;
  fullName: string;
  inventory: {
    item: string;
    quantity: number;
  }[];
}

export default function Inventory() {
  const { survivorsInventories, updateRequestItem } = useSurvivors();

  const TABLE_HEAD = ["Name", "Inventories", "Action"];
  const TABLE_ROWS = [
    {
      name: "Ellie Williams",
      inventories:
        "1 Shotgun, 1 First Aid Kit, 5 Bottled Water, 1 Helmet, 5 Canned Food, 1 Tent, 2 Radios",
      action: "",
    },
    {
      name: "Joel Miller",
      inventories:
        "1 Pistol, 1 Shotgun,  1 First Aid Kit, 12 Bottled Water, 2 Gloves, 15 Canned Food, 2 Radios",
      action: "",
    },
    {
      name: "Tommy Miller",
      inventories: "1 Sniper, 1 Radio",
      action: "",
    },
    {
      name: "Abby Anderson",
      inventories: "1 Pistol, 16 Bottled Water, 1 Radio",
      action: "",
    },
    {
      name: "Lev Cheng",
      inventories: "1 Bow, 15 Arrows, 6 Canned Food",
      action: "",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    item: "",
  });
  const [selectedSurvivor, setSelectedSurvivor] = useState<
    SelectedSurvivor | undefined
  >();

  const closeModal = () => setIsModalOpen(false);

  const submitRequestItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedSurvivor && formData.item) {
      updateRequestItem(selectedSurvivor, formData.item);
    }
    closeModal();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequestItem = (survivor: SurvivorsInventories) => {
    setSelectedSurvivor(survivor);
    setIsModalOpen(true);
  };

  return (
    <section className="container mx-auto">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xl text-indigo-950">
            List of Survivors Inventories
          </p>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 tracking-tighter">
              You have 10,201 Inventories logged
            </p>
            <CircleAlert className="ml-1" color="#5F5F61" size={16} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-gray-header">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 py-4 px-6 cursor-pointer"
                  >
                    <div className="flex flex-row items-center">
                      <p className="text-xs text-gray-header-item mr-2">
                        {head}
                      </p>
                      <ChevronDown color="#A1A0A3" size="12" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {survivorsInventories.length ? (
                survivorsInventories.map((survivor, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={survivor.fullName + "-inventory-" + index}>
                      <td className={classes + " flex flex-row items-center"}>
                        <div className="bg-gray-icon flex flex-row items-center justify-center rounded-full w-10 h-10 mr-3">
                          <UserRound size="17" color="#A1A0A3" />
                        </div>
                        <p className="text-indigo-950 font-semibold">
                          {survivor.fullName}
                        </p>
                      </td>
                      <td className={classes}>
                        <p className="font-normal text-indigo-950">
                          {survivor.inventory
                            .map((item) => item.quantity + " " + item.item)
                            .join(", ")}
                        </p>
                      </td>
                      <td className={classes}>
                        <button
                          type="button"
                          onClick={() => handleRequestItem(survivor)}
                          className="mr-2 border border-gray-border bg-white hover:bg-gray-header text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
                        >
                          Request Item
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>No data please add some survivors</p>
              )}
            </tbody>
          </table>
          <div className="bg-white w-full border-t border-gray-border">
            <div className="flex flex-row justify-between items-center p-5 w-full">
              <p className="text-gray-500 text-sm font-medium">
                Showing <span className="text-gray-900">1</span> to{" "}
                <span className="text-gray-900">5</span> of{" "}
                <span className="text-gray-900">100</span> Results
              </p>
              <div className="flex flex-row">
                <button className="flex flex-row items-center text-sm text-indigo-950 font-semibold border border-gray-border p-3 rounded-lg shadow mr-5">
                  Previous
                </button>
                <button className="flex flex-row items-center text-sm text-indigo-950 font-semibold border border-gray-border p-3 rounded-lg shadow">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        title="Request Item"
        subTitle={"From " + selectedSurvivor?.fullName}
        onClose={closeModal}
      >
        <div className="flex flex-col">
          <form onSubmit={submitRequestItem}>
            <div className="flex flex-col w-full mb-6">
              <label htmlFor="status" className="text-gray-header-item text-xs">
                Choose Item
              </label>
              <select
                id="item"
                name="item"
                data-testid="select"
                value={formData.item}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-950 focus:border-indigo-950 text-gray-500 h-10"
              >
                <option value="">Select</option>
                {selectedSurvivor?.inventory.map((inventory) => {
                  return (
                    inventory.quantity > 0 && (
                      <option
                        value={inventory.item}
                        data-testid="select-option"
                        key={"select-" + inventory.item}
                      >
                        {inventory.item} - {inventory.quantity}
                      </option>
                    )
                  );
                })}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="w-1/2 mr-2 border border-gray-border bg-white hover:bg-gray-header text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                data-testid="submit"
                className="w-1/2 bg-indigo-alt hover:bg-indigo-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                Request Item
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
}
