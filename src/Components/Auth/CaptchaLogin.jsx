import React, { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";


const CaptchaComponent = ({ onVerified }) => {
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  useEffect(() => {
    loadCaptchaEnginge(6, "#a8b4c4", "rgb(107 114 128 / 1)", "upper");
  }, []);

  const validateCaptchaInput = () => {
    const isValid = validateCaptcha(captchaInput);
    if (isValid) {
      setCaptchaError("");
      onVerified(true); // Callback to notify the parent when captcha is verified
    } else {
      setCaptchaError("Invalid CAPTCHA, please try again.");
      onVerified(false);
    }
  };

  return (
    <div className="flex items-center mb-6 backdrop-blur-sm bg-white/30 rounded-lg border border-gray-300">
      <div className="relative flex items-center flex-row-reverse">
        <LoadCanvasTemplate reloadText="" />
      </div>
      <button
        type="button"
        className="flex items-center justify-center p-3 text-blue-v1"
        onClick={() =>
          loadCaptchaEnginge(6, "#a8b4c4", "rgb(107 114 128 / 1)", "upper")
        }
      >
        {/* <FaRedo size={16} /> */}
      </button>
      <div className="flex items-center backdrop-blur-sm bg-white/30 rounded-lg border border-gray-300">
        <input
          type="text"
          placeholder="Enter Captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          className="w-full h-12 px-4 shadow-lg backdrop-blur-sm bg-white/30 bg-blue-50 border border-gray-300 rounded-lg outline-none focus:border-blue-v1 focus:bg-gray-100 transition duration-300"
        />
      </div>
      <button
        type="button"
        onClick={validateCaptchaInput}
        className="ml-4 bg-blue-v1 text-white px-4 py-2 rounded-lg"
      >
        Verify
      </button>
      {captchaError && (
        <small className="text-red-500 text-center mb-4">{captchaError}</small>
      )}
    </div>
  );
};
