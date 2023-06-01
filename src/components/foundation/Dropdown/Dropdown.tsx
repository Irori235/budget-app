import React from "react";
import { Menu } from "@headlessui/react";

interface DropdownProps {
  options: { label: string; action: () => void }[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  return (
    <div className="shadow-sm">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="px-3 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white hover:bg-gray-200 border-black text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Menu.Button>
            {open && (
              <Menu.Items className="absolute w-24 py-1 mt-1 overflow-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        } block px-4 py-2 text-sm`}
                        onClick={option.action}
                      >
                        {option.label}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};

export default Dropdown;
