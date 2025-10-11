import React from "react";

const ViewSwitch = ({ viewType, onViewChange }) => {
  return (
    <div className="view-switch-container flex items-center bg-gray-100 rounded-xl p-1 shadow-sm">
      <button
        onClick={() => onViewChange("list")}
        className={`view-switch-btn flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
          viewType === "list"
            ? "bg-white text-Primary shadow-md scale-105"
            : "text-gray-600 hover:text-Primary hover:bg-gray-50"
        }`}
        title="List View"
      >
        <i className="ri-list-check text-lg"></i>
        <span className="text-sm font-medium hidden sm:inline">List</span>
      </button>
      <button
        onClick={() => onViewChange("grid")}
        className={`view-switch-btn flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
          viewType === "grid"
            ? "bg-white text-Primary shadow-md scale-105"
            : "text-gray-600 hover:text-Primary hover:bg-gray-50"
        }`}
        title="Grid View"
      >
        <i className="ri-grid-line text-lg"></i>
        <span className="text-sm font-medium hidden sm:inline">Grid</span>
      </button>
    </div>
  );
};

export default ViewSwitch;
