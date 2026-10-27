import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ShoppingBag,
  ClipboardCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

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

    if (!address.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!address.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(address.phone)) {
      newErrors.phone = "Phone Number must be 10 digits";
    }

    if (!address.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!address.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!address.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    } else if (!/^[0-9]{6}$/.test(address.postalCode)) {
      newErrors.postalCode = "Postal Code must be exactly 6 digits";
    }

    if (!address.country.trim()) {
      newErrors.country = "Country is required";
    }

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

  // Common styling for all inputs
  const inputClass = (field) =>
    `w-full rounded-xl border bg-[#fcfaf6] px-4 py-3.5
    text-[#263b30] placeholder:text-[#9a9d93]
    outline-none transition-all duration-200
    ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : "border-[#e5e1d8] hover:border-[#b8c9bd] focus:border-[#174638] focus:ring-4 focus:ring-[#174638]/10"
    }`;

  // Reusable field component
  const renderField = ({
    name,
    label,
    placeholder,
    type = "text",
    maxLength,
    inputMode,
    fullWidth = false,
    onChange,
  }) => (
    <motion.div
      key={name}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={fullWidth ? "sm:col-span-2" : ""}
    >
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#344b3e]"
      >
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={address[name]}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={onChange || handleChange}
        className={inputClass(name)}
        placeholder={placeholder}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        autoComplete={
          {
            fullName: "name",
            phone: "tel",
            address: "street-address",
            city: "address-level2",
            state: "address-level1",
            postalCode: "postal-code",
            country: "country-name",
          }[name]
        }
      />

      {errors[name] && (
        <motion.p
          id={`${name}-error`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-sm text-red-600"
        >
          {errors[name]}
        </motion.p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#fcfaf6] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">

        {/* Back Navigation */}
        <motion.button
          type="button"
          onClick={() => navigate("/cart")}
          whileHover={{ x: -3 }}
          className="mb-8 inline-flex cursor-pointer items-center gap-2
          text-sm font-semibold text-[#537064] transition-colors
          hover:text-[#174638]"
        >
          <ArrowLeft size={18} />
          Back to cart
        </motion.button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center"
        >
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center
            justify-center rounded-2xl bg-[#174638]/10 text-[#174638]"
          >
            <MapPin size={27} strokeWidth={1.8} />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#668373]">
            Almost there
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#174638] sm:text-4xl">
            Shipping Address
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#69736c] sm:text-base">
            Tell us where to deliver your order. Please make sure
            your details are correct.
          </p>
        </motion.div>

        {/* Checkout Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mx-auto mb-10 max-w-2xl"
        >
          <div className="flex items-center justify-center">

            {/* Cart Step */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#174638] text-white">
                <ShoppingBag size={18} />
              </div>

              <span className="mt-2 text-xs font-semibold text-[#174638] sm:text-sm">
                Cart
              </span>
            </div>

            <div className="mx-3 mb-5 h-px flex-1 bg-[#174638]/30 sm:mx-5" />

            {/* Shipping Step */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#174638] bg-[#174638]/10 text-[#174638]">
                <MapPin size={18} />
              </div>

              <span className="mt-2 text-xs font-bold text-[#174638] sm:text-sm">
                Shipping
              </span>
            </div>

            <div className="mx-3 mb-5 h-px flex-1 bg-[#e5e1d8] sm:mx-5" />

            {/* Order Step */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e1d8] bg-white text-[#9a9d93]">
                <ClipboardCheck size={18} />
              </div>

              <span className="mt-2 text-xs font-medium text-[#92988f] sm:text-sm">
                Order
              </span>
            </div>

          </div>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-2xl
          border border-[#e9e5dc] bg-white shadow-[0_8px_35px_rgba(23,70,56,0.06)]"
        >

          {/* Card Header */}
          <div className="border-b border-[#e9e5dc] px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f5ef] text-[#174638]">
                <MapPin size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#174638] sm:text-xl">
                  Delivery Information
                </h2>

                <p className="mt-1 text-sm text-[#7a827b]">
                  Fields marked with{" "}
                  <span className="font-semibold text-red-500">*</span>{" "}
                  are required.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleContinue}
            noValidate
            className="p-5 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">

              {/* Full Name */}
              {renderField({
                name: "fullName",
                label: "Full Name",
                placeholder: "Enter your full name",
              })}

              {/* Phone */}
              {renderField({
                name: "phone",
                label: "Phone Number",
                placeholder: "10-digit phone number",
                maxLength: 10,
                inputMode: "numeric",
                onChange: (e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  setAddress({
                    ...address,
                    phone: value,
                  });

                  setErrors({
                    ...errors,
                    phone: "",
                  });
                },
              })}

              {/* Address */}
              {renderField({
                name: "address",
                label: "Street Address",
                placeholder: "House no., street, area",
                fullWidth: true,
              })}

              {/* City */}
              {renderField({
                name: "city",
                label: "City",
                placeholder: "Enter your city",
              })}

              {/* State */}
              {renderField({
                name: "state",
                label: "State",
                placeholder: "Enter your state",
              })}

              {/* Postal Code */}
              {renderField({
                name: "postalCode",
                label: "Postal Code",
                placeholder: "6-digit postal code",
                maxLength: 6,
                inputMode: "numeric",
                onChange: (e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  setAddress({
                    ...address,
                    postalCode: value,
                  });

                  setErrors({
                    ...errors,
                    postalCode: "",
                  });
                },
              })}

              {/* Country */}
              {renderField({
                name: "country",
                label: "Country",
                placeholder: "Enter your country",
              })}

            </div>

            {/* Delivery Notice */}
            <div className="mt-7 flex items-start gap-3 rounded-xl border border-[#e5eadd] bg-[#f5f7f1] p-4">
              <Truck
                size={20}
                className="mt-0.5 shrink-0 text-[#174638]"
              />

              <div>
                <p className="text-sm font-semibold text-[#174638]">
                  Delivery details matter
                </p>

                <p className="mt-1 text-xs leading-5 text-[#69736c] sm:text-sm">
                  Please provide a complete address so your order
                  can reach you without unnecessary delays.
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mt-7 flex w-full cursor-pointer items-center
              justify-center gap-2 rounded-xl bg-[#174638] px-5 py-4
              font-semibold text-white shadow-sm transition-colors
              hover:bg-[#205b49] focus:outline-none focus:ring-4
              focus:ring-[#174638]/20"
            >
              Continue to Order
              <ArrowRight size={19} />
            </motion.button>

            {/* Trust Message */}
            <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#7a827b]">
              <ShieldCheck size={15} className="shrink-0 text-[#537064]" />
              Your delivery information is used to process your order.
            </div>

          </form>
        </motion.div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs leading-5 text-[#92988f]">
          Review your details before continuing to the next step.
        </p>

      </div>
    </div>
  );
}

export default Checkout;