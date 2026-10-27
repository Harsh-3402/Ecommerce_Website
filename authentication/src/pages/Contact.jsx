import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Mail,
  MessageCircle,
  Headphones,
  Clock,
  ArrowRight,
  Send,
  ShoppingBag,
  Package,
  ChevronDown,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";

function Contact() {
  const [openFaq, setOpenFaq] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    orderId: "",
    message: "",
  });

  const contactOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Have a question? We're happy to help.",
      detail: "Customer enquiries",
      color: "bg-[#e8f0e5] text-[#174638]",
    },
    {
      icon: Package,
      title: "Order Assistance",
      description: "Need help understanding your order?",
      detail: "Order-related questions",
      color: "bg-[#f4ebd9] text-[#8a6c35]",
    },
    {
      icon: MessageCircle,
      title: "General Enquiries",
      description: "Share your feedback or suggestions.",
      detail: "We value your feedback",
      color: "bg-[#e9edf6] text-[#4d6493]",
    },
  ];

  const faqs = [
    {
      question: "How can I check my order status?",
      answer:
        "Visit the My Orders section of ShopNest to review your available order information and current order status.",
    },
    {
      question: "How can I cancel an order?",
      answer:
        "Open My Orders and check whether the order has a cancellation option. Cancellation availability depends on the order's current status.",
    },
    {
      question: "Can I update my shipping address?",
      answer:
        "Address changes may depend on the order status. Review your order details before contacting support about an address update.",
    },
    {
      question: "How can I share feedback?",
      answer:
        "You can use the contact form on this page to prepare your feedback. Contact form submission will be connected to our support system in a future update.",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // UI only for now.
    // Backend submission will be implemented later.
    alert("Contact form functionality will be available soon.");
  };

  const inputClass =
    "w-full rounded-xl border border-[#e5e6dc] bg-[#fcfaf6] px-4 py-3.5 text-sm text-[#193c30] outline-none transition placeholder:text-[#a0a69d] focus:border-[#174638] focus:ring-4 focus:ring-[#174638]/5";

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#193c30]">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#e6eee2] opacity-70 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#f2e9d9] opacity-60 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#dce5d9] bg-white px-4 py-2 text-sm font-medium text-[#426454]">
            <MessageCircle size={16} />
            We'd love to hear from you
          </div>

          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            We're Here
            <br className="sm:hidden" /> to{" "}
            <span className="text-[#668c6d]">Help.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#758177] sm:text-lg">
            Questions, feedback, or need a little assistance? Whatever is on
            your mind, we're here to make your ShopNest experience better.
          </p>
        </motion.div>
      </section>

      {/* Contact Information Cards */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[#e9e7dd] bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-[#193c30]/5 sm:p-7"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${option.color}`}
                >
                  <Icon size={23} />
                </div>

                <h2 className="mt-5 text-lg font-bold">{option.title}</h2>

                <p className="mt-2 text-sm leading-6 text-[#758177]">
                  {option.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#426454]">
                  <CheckCircle2 size={16} />
                  {option.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form + Support Sidebar */}
      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.7fr]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-[#e9e7dd] bg-white p-6 shadow-sm sm:p-9 lg:p-10"
          >
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#64816b]">
                Get in Touch
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Send us a message
              </h2>

              <p className="mt-3 leading-7 text-[#758177]">
                Fill in the details below. We'll connect this form to our
                support system when we implement the backend.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-[#315744]"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#315744]"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#315744]"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Order Enquiry">Order Enquiry</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="orderId"
                    className="mb-2 block text-sm font-semibold text-[#315744]"
                  >
                    Order ID{" "}
                    <span className="font-normal text-[#9aa197]">
                      (Optional)
                    </span>
                  </label>

                  <input
                    id="orderId"
                    name="orderId"
                    type="text"
                    value={formData.orderId}
                    onChange={handleChange}
                    placeholder="Enter your order ID"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#315744]"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  maxLength={1500}
                  className={`${inputClass} resize-y`}
                  required
                />

                <p className="mt-2 text-right text-xs text-[#9aa197]">
                  {formData.message.length}/1500 characters
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#174638] px-6 py-4 font-semibold text-white shadow-lg shadow-[#174638]/10 transition hover:-translate-y-0.5 hover:bg-[#205b49] sm:w-auto"
              >
                Send Message
                <Send size={17} />
              </button>

              <p className="text-xs leading-5 text-[#9aa197]">
                This form is currently a UI preview. Messages are not sent or
                stored yet.
              </p>
            </form>
          </motion.div>

          {/* Support Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#174638] p-7 text-white sm:p-9">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/10" />
              <div className="absolute -right-2 -top-2 h-28 w-28 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Headphones size={25} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Every question matters.
                </h3>

                <p className="mt-4 leading-7 text-white/75">
                  We're building ShopNest with one thing in mind: making
                  shopping simpler and more comfortable for everyone.
                </p>

                <div className="mt-7 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Clock size={20} className="mt-0.5 shrink-0 text-[#c4d9c6]" />

                  <div>
                    <p className="font-semibold">Here for your questions</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      Support features and response times will be configured
                      when the contact backend is implemented.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e9e7dd] bg-white p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f0e5] text-[#174638]">
                <ShoppingBag size={24} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Need help with an order?
              </h3>

              <p className="mt-3 leading-7 text-[#758177]">
                Visit your order history to review order details and check
                available order actions.
              </p>

              <Link
                to="/my-orders"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#174638] transition hover:gap-3"
              >
                Go to My Orders
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="rounded-3xl border border-[#e9e7dd] bg-[#f3f0e7] p-7">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#174638]">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h3 className="font-bold">Your feedback inspires us.</h3>
                  <p className="mt-2 text-sm leading-6 text-[#758177]">
                    Every suggestion helps us think about how to make ShopNest
                    better.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-[#ece9df] bg-white/60 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#64816b]">
              Quick Answers
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Frequently asked questions.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-[#758177]">
              Looking for a quick answer? Here are some common questions about
              shopping and managing your orders.
            </p>

            <div className="mt-7 flex items-center gap-3 text-sm text-[#537064]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f0e5] text-[#174638]">
                <MessageCircle size={20} />
              </div>
              <span>Still have questions? Use the contact form above.</span>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                    isOpen ? "border-[#cbd9c8]" : "border-[#e9e7dd]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? -1 : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="font-semibold text-[#244b3b]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[#64816b] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 leading-7 text-[#758177] sm:px-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f0e5] text-[#174638]">
            <MapPin size={26} />
          </div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Let's make shopping better.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#758177]">
            Explore the collection and discover what ShopNest has to offer.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#174638] px-7 py-4 font-semibold text-white transition hover:bg-[#205b49]"
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Contact;