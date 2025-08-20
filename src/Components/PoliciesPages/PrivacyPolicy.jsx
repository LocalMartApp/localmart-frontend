import React from "react";
import { NavLink } from "react-router-dom";

const PrivacyPolicy = () => {
  const updatedOn = "06 Aug 2025"; // keep this current

  return (
    <div className="policy-pages-main-sec privacy-policy">
      <div className="inner-policy-section">
        {/* Header / Breadcrumb */}
        <section className="policy-breadcrumb py-20 bg-LightBlue">
          <div className="inner-policy-bread-crumb">
            <div className="container">
              <div className="main-policy-head mb-3">
                <h1 className="uppercase font-bold text-5xl text-Black text-center">
                  Privacy Policy
                </h1>
              </div>
              <div className="bottom-navigation-breadcrumb">
                <ul className="flex items-center gap-x-2 justify-center">
                  <li>
                    <NavLink className="text-Secondary" to={"/"}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <i className="ri-arrow-right-s-line text-xl" />
                  </li>
                  <li>Privacy Policy</li>
                </ul>
                <p className="text-center mt-2 text-sm opacity-70">
                  Last updated: {updatedOn}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="policy-main-content border-b border-Black border-opacity-20 py-16">
          <div className="inner-policy-main-content">
            <div className="container">
              <div className="inner-paragraphs flex flex-col gap-8 w-11/12 md:w-9/12 mx-auto leading-7">
                <p className="text-lg opacity-80">
                  LocalMart (“<strong>LocalMart</strong>”, “<strong>we</strong>
                  ”, “<strong>our</strong>” or “<strong>us</strong>”) respects
                  your privacy. This Privacy Policy explains what information we
                  collect when you use our website and mobile apps
                  (collectively, the “<strong>Services</strong>”), how we use
                  it, and the choices you have. By using our Services, you agree
                  to this Policy.
                </p>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    1. Information We Collect
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 opacity-80">
                    <li>
                      <strong>Account & Profile Data:</strong> name, email,
                      phone, password (hashed).
                    </li>
                    <li>
                      <strong>Business Listing Data:</strong> business name,
                      category, address, description, media.
                    </li>
                    <li>
                      <strong>Usage & Device Data:</strong> IP, browser, OS, app
                      version, pages visited.
                    </li>
                    <li>
                      <strong>Location Data:</strong> if you grant permission.
                    </li>
                    <li>
                      <strong>Payments:</strong> transaction details via payment
                      partners.
                    </li>
                    <li>
                      <strong>Cookies & Similar Tech:</strong> used to improve
                      services.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    2. How We Use Information
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 opacity-80">
                    <li>Provide and improve our Services.</li>
                    <li>Create and manage accounts and listings.</li>
                    <li>Process payments and subscriptions.</li>
                    <li>Send important updates and notifications.</li>
                    <li>Prevent fraud and ensure security.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    3. Sharing Information
                  </h2>
                  <p className="opacity-80">
                    We do <strong>not sell</strong> personal data. We may share
                    information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 opacity-80">
                    <li>
                      Trusted service providers (hosting, payments, analytics).
                    </li>
                    <li>Legal authorities when required by law.</li>
                    <li>Business transfers (mergers/acquisitions).</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    4. Data Retention
                  </h2>
                  <p className="opacity-80">
                    We keep personal data as long as your account is active or
                    required by law. When you request deletion, we delete or
                    anonymize your data unless legally required to retain it.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    5. Your Rights
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 opacity-80">
                    <li>Access or correct your personal info.</li>
                    <li>
                      Control permissions (location, notifications, etc.).
                    </li>
                    <li>Opt-out of marketing emails.</li>
                    <li>
                      <strong>Delete your account:</strong> visit{" "}
                      <a
                        href="https://www.localmart.app/profile/delete-account/"
                        className="text-Secondary underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        localmart.app/profile/delete-account/
                      </a>{" "}
                      or email{" "}
                      <a
                        href="mailto:support@localmart.app"
                        className="text-Secondary underline"
                      >
                        support@localmart.app
                      </a>
                      .
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    6. Cookies & Analytics
                  </h2>
                  <p className="opacity-80">
                    We use cookies and analytics to improve user experience. You
                    can disable cookies in your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    7. Children’s Privacy
                  </h2>
                  <p className="opacity-80">
                    Our Services are not directed to children under local legal
                    age. We do not knowingly collect data from children.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">8. Security</h2>
                  <p className="opacity-80">
                    We take reasonable steps to protect your data, but no system
                    is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    9. Changes to Policy
                  </h2>
                  <p className="opacity-80">
                    We may update this Privacy Policy from time to time.
                    Continued use of our Services means you accept updates.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-2xl mb-2">
                    10. Contact Us
                  </h2>
                  <p className="opacity-80">
                    For questions, email us at{" "}
                    <a
                      href="mailto:support@localmart.app"
                      className="text-Secondary underline"
                    >
                      support@localmart.app
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
