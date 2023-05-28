import React, { useState, useEffect, MouseEvent } from "react";
import { Transition } from "@headlessui/react";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ show, message, type }) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <Transition show={show}>
      <div
        className={`fixed top-0 right-0 m-6 p-4  rounded-lg text-white ${bgColor}`}
      >
        <div className="flex items-center justify-center">
          <div>{message}</div>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
