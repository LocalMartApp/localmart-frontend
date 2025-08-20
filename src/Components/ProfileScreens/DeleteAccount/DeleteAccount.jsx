import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { config } from "../../../env-services";

const SUPPORT_EMAIL = "Incrosyscare@gmail.com";
const DELETION_DAYS = 30;

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [rawToken, setRawToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // read token safely from localStorage (supports raw JWT or JSON string)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("authToken");
      if (!stored) return;
      let parsed = stored;
      // if it was JSON.stringified object, parse and extract .token or .accessToken
      if (stored.startsWith("{")) {
        const obj = JSON.parse(stored);
        parsed = obj?.accessToken || obj?.token || obj?.jwt || obj;
      }
      setRawToken(typeof parsed === "string" ? parsed : null);
    } catch (e) {
      console.warn("Failed to parse authToken from localStorage", e);
      setRawToken(null);
    }
  }, []);

  const authHeader = useMemo(
    () => (rawToken ? { Authorization: `Bearer ${rawToken}` } : {}),
    [rawToken]
  );

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account and personal data? This action cannot be undone."
    );
    if (!confirmed || !rawToken) return;

    try {
      setIsSubmitting(true);

      await axios.delete(`${config.api}auth/delete-account`, {
        headers: {
          ...authHeader,
          "Content-Type": "application/json",
        },
      });

      toast.success("Your account has been deleted.");
      // best-effort client cleanup
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    } catch (err) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message ||
        (status === 401
          ? "Your session expired. Please log in and try again."
          : "Failed to delete account.");

      toast.error(message);

      if (status === 401) {
        // token invalid/expired
        localStorage.removeItem("authToken");
        navigate("/login");
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const LoggedOutView = () => (
    <div className="space-y-6 text-center max-w-2xl">
      <h1 className="text-2xl font-bold">Delete your LocalMart account</h1>
      <p className="text-gray-700">
        To delete your account, please sign in first. After signing in you can
        permanently delete your account and personal data from your profile
        page.
      </p>

      <div className="text-left bg-gray-50 rounded-xl p-6 space-y-3">
        <h2 className="font-semibold text-xl">How to delete</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Log in to your account.</li>
          <li>
            Go to{" "}
            <span className="font-medium">Profile &gt; Delete Account</span>.
          </li>
          <li>Read the notice and confirm deletion.</li>
        </ol>
      </div>

      <div className="text-left bg-gray-50 rounded-xl p-6 space-y-3">
        <h2 className="font-semibold text-xl">What happens next</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Your account and profile data are permanently removed.</li>
          <li>
            Business listings and media you created are deleted or anonymized.
          </li>
          <li>
            We may retain limited records if required by law (e.g.,
            invoices/fraud prevention).
          </li>
          <li>
            Deletion is typically completed within{" "}
            <strong>{DELETION_DAYS} days</strong>.
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => navigate("/login")}
          className="bg-primary px-6 py-2 text-white rounded hover:bg-primary-dark"
        >
          Login to delete
        </button>
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=Account%20Deletion%20Request`}
          className="px-6 py-2 rounded border border-primary text-primary hover:bg-primary/5"
        >
          Can’t log in? Email support
        </a>
      </div>

      <p className="text-sm text-gray-600">
        For more details, see our{" "}
        <a
          className="underline text-primary"
          href="https://www.localmart.app/privacy-policy/"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );

  const LoggedInView = () => (
    <div className="space-y-6 text-center max-w-xl">
      <h1 className="text-2xl font-bold">Delete Account</h1>
      <p className="text-gray-700">
        This will permanently delete your account and all personal data. This
        action cannot be undone.
      </p>
      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-60"
        disabled={!rawToken || isSubmitting}
      >
        {isSubmitting ? "Deleting…" : "Confirm Delete Account"}
      </button>
      <p className="text-sm text-gray-600">
        Need help? Contact{" "}
        <a className="underline text-primary" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </div>
  );

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center p-6">
      {rawToken ? <LoggedInView /> : <LoggedOutView />}
    </div>
  );
};

export default DeleteAccount;
