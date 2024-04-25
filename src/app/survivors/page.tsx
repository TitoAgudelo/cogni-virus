"use client";

import React, { useState } from "react";
import { CircleAlert, CirclePlus, ChevronDown, UserRound } from "lucide-react";
import { useSurvivors } from "../contexts/SurvivorsContext";
import { Infected, Gender } from "../dataTypes";

import Modal from "../components/Modal";

interface FormData {
  fullName: string;
  infected: "infected" | "healthy" | "";
}

export default function Survivors() {
  const { addSurvivor, survivors } = useSurvivors();
  const TABLE_HEAD = ["Name", "Status", "Date Added", ""];
  const TABLE_ROWS = [
    {
      name: "John Michael",
      status: "Healthy",
      date: "May 14, 2023",
    },
    {
      name: "Alexa Liras",
      status: "Healthy",
      date: "Feb 8, 2023",
    },
    {
      name: "Laurent Perrier",
      status: "Healthy",
      date: "Feb 4, 2023",
    },
    {
      name: "Michael Levi",
      status: "Healthy",
      date: "Dec 12, 2022",
    },
    {
      name: "Richard Gran",
      status: "Infected",
      date: "Dec 12, 2022",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    infected: "",
  });
  const [resources, setResources] = useState({
    water: 0,
    food: 0,
    medication: 0,
    cVirusVaccine: 0,
  });

  const closeModal = () => setIsModalOpen(false);
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let latitude = 0;
    let longitude = 0;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    const newSurvivor = {
      id: Math.random(),
      age: "",
      fullName: formData.fullName,
      infected:
        formData.infected === "infected" ? Infected.Infected : Infected.Healthy,
      lastLocation: `Latitude: ${latitude | 4.7487082} Longitude: ${
        longitude | -74.0690837
      }`,
      gender: Math.floor(Math.random() * 2) == 1 ? Gender.Female : Gender.Male,
      resources: resources,
      createdDate: new Date().toDateString(),
    };

    addSurvivor(newSurvivor);
    setFormData({
      fullName: "",
      infected: "",
    });
    setResources({
      water: 0,
      food: 0,
      medication: 0,
      cVirusVaccine: 0,
    });
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="container mx-auto">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xl text-indigo-950">List of Survivors</p>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 tracking-tighter">
              You have 1205 healthy survivors
            </p>
            <CircleAlert className="ml-1" color="#5F5F61" size={16} />
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="flex flex-row items-center text-indigo-950 font-semibold border border-gray-border p-4 rounded-lg shadow"
            onClick={() => setIsModalOpen(true)}
          >
            <CirclePlus className="mr-1" color="#312244" size="19" />
            Add Survivor
          </button>
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
              {survivors.map(({ fullName, infected, createdDate }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={fullName + index}>
                    <td className={classes + " flex flex-row items-center"}>
                      <div className="bg-gray-icon flex flex-row items-center justify-center rounded-full w-10 h-10 mr-3">
                        <UserRound size="17" color="#A1A0A3" />
                      </div>
                      <p className="text-indigo-950 font-semibold">
                        {fullName}
                      </p>
                    </td>
                    <td className={classes}>
                      {infected === Infected.Healthy ? (
                        <span className="font-normal text-[#01A63E] rounded-full px-3 py-2.5 bg-[#E8F6ED]">
                          {infected}
                        </span>
                      ) : (
                        <span className="font-normal text-[#E73F3F] rounded-full px-3 py-3 bg-[#FCEAEA]">
                          {infected}
                        </span>
                      )}
                    </td>
                    <td className={classes}>
                      <p className="font-normal text-gray-500">{createdDate}</p>
                    </td>
                    <td className={classes}></td>
                  </tr>
                );
              })}
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
      <Modal isOpen={isModalOpen} title="Add Survivor" onClose={closeModal}>
        <div className="flex flex-col">
          <form onSubmit={handleAdd}>
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="fullName"
                className="text-gray-header-item text-xs"
              >
                Full Name of Survivor
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-950 focus:border-indigo-950 text-gray-500 h-10"
              />
            </div>
            <div className="flex flex-col w-full mb-6">
              <label htmlFor="status" className="text-gray-header-item text-xs">
                Status
              </label>
              <select
                id="infected"
                name="infected"
                value={formData.infected}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-950 focus:border-indigo-950 text-gray-500 h-10"
              >
                <option value="">Select</option>
                <option value="healthy">Healthy</option>
                <option value="infected">Infected</option>
              </select>
            </div>
            <div>
              <label className="text-gray-header-item text-sm mb-2">
                Resources
              </label>
              <div className="grid grid-rows-2 grid-flow-col gap-4">
                <div className="flex flex-col w-full mb-2">
                  <label
                    className="text-gray-header-item text-xs"
                    htmlFor="water"
                  >
                    Water:
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    id="water"
                    value={resources.water}
                    onChange={(e) =>
                      setResources({
                        ...resources,
                        water: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col w-full mb-2">
                  <label
                    className="text-gray-header-item text-xs"
                    htmlFor="food"
                  >
                    Food:
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    id="food"
                    value={resources.food}
                    onChange={(e) =>
                      setResources({
                        ...resources,
                        food: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col w-full mb-2">
                  <label
                    className="text-gray-header-item text-xs"
                    htmlFor="medication"
                  >
                    Medication:
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    id="medication"
                    value={resources.medication}
                    onChange={(e) =>
                      setResources({
                        ...resources,
                        medication: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col w-full mb-2">
                  <label
                    className="text-gray-header-item text-xs"
                    htmlFor="cVirusVaccine"
                  >
                    C-Virus Vaccine:
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    id="cVirusVaccine"
                    value={resources.cVirusVaccine}
                    onChange={(e) =>
                      setResources({
                        ...resources,
                        cVirusVaccine: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={closeModal}
                className="w-1/2 mr-2 border border-gray-border bg-white hover:bg-gray-header text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-indigo-alt hover:bg-indigo-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Survivor
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
}
