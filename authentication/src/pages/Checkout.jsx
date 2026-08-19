import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!address.fullName.trim())
      newErrors.fullName = "Full Name is required";

    if (!address.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(address.phone)) {
      newErrors.phone = "Phone Number must be 10 digits";
    }

    if (!address.address.trim())
      newErrors.address = "Address is required";

    if (!address.city.trim())
      newErrors.city = "City is required";

    if (!address.state.trim())
      newErrors.state = "State is required";

    if (!address.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    } else if (!/^[0-9]{6}$/.test(address.postalCode)) {
      newErrors.postalCode = "Postal Code must be exactly 6 digits";
    }

    if (!address.country.trim())
      newErrors.country = "Country is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validate()) return;

    navigate("/order", {
      state: {
        address,
      },
    });
  };

  const inputClass = (field) =>
    `w-full bg-gray-800 text-white border rounded-lg p-3 outline-none transition ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500"
        : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
    }`;

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-12 flex justify-center">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl"
      >

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-8"
        >
          Shipping Address
        </motion.h1>

        {/* Form Card */}

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-6 md:p-8"
        >

          <form onSubmit={handleContinue} className="space-y-5">

            {/* Full Name */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-gray-200 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                className={inputClass("fullName")}
                placeholder="Enter your full name"
              />

              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </motion.div>

            {/* Phone */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-200 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                maxLength={10}
                inputMode="numeric"
                value={address.phone}
                onChange={handleChange}
                className={inputClass("phone")}
                placeholder="10 digit phone number"
              />

              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.phone}
                </motion.p>
              )}
            </motion.div>

            {/* Address */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className="block text-gray-200 mb-2">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
                className={inputClass("address")}
                placeholder="House no, street, area"
              />

              {errors.address && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.address}
                </motion.p>
              )}
            </motion.div>

            {/* City */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-200 mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className={inputClass("city")}
                placeholder="Enter city"
              />

              {errors.city && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.city}
                </motion.p>
              )}
            </motion.div>

            {/* State */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label className="block text-gray-200 mb-2">
                State
              </label>

              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                className={inputClass("state")}
                placeholder="Enter state"
              />

              {errors.state && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.state}
                </motion.p>
              )}
            </motion.div>

            {/* Postal Code */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-200 mb-2">
                Postal Code
              </label>

              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                maxLength={6}
                inputMode="numeric"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  setAddress({
                    ...address,
                    postalCode: value,
                  });

                  setErrors({
                    ...errors,
                    postalCode: "",
                  });
                }}
                className={inputClass("postalCode")}
                placeholder="6 digit postal code"
              />

              {errors.postalCode && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.postalCode}
                </motion.p>
              )}
            </motion.div>

            {/* Country */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
            >
              <label className="block text-gray-200 mb-2">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                className={inputClass("country")}
                placeholder="Enter country"
              />

              {errors.country && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.country}
                </motion.p>
              )}
            </motion.div>

            {/* Continue */}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold mt-4 cursor-pointer"
            >
              Continue
            </motion.button>

          </form>

        </motion.div>

      </motion.div>

    </div>
  );
}

export default Checkout;