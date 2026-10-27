import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
} from "lucide-react";

function About() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Quality You Can Trust",
      description:
        "We believe great shopping starts with great products. Every choice is made with quality and value in mind.",
    },
    {
      icon: Heart,
      title: "Shopping Made Personal",
      description:
        "Your preferences matter. We want every visit to ShopNest to feel simple, comfortable, and enjoyable.",
    },
    {
      icon: Truck,
      title: "Convenience at Every Step",
      description:
        "From discovering your favorites to placing an order, we aim to make your shopping journey effortless.",
    },
  ];

  const values = [
    "Quality products for everyday needs",
    "A simple and enjoyable shopping experience",
    "A customer-first approach",
    "A commitment to continuous improvement",
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#193c30]">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#e7eee4] opacity-70 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#f0e9d9] opacity-60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce5d9] bg-white px-4 py-2 text-sm font-medium text-[#426454]">
              <Leaf size={16} />
              More than just shopping
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A Better Way
              <br />
              to <span className="text-[#5e8669]">Shop.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-[#68776d] sm:text-lg">
              Welcome to ShopNest — your space to discover everyday
              essentials, explore new favorites, and enjoy a simpler shopping
              experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-[#174638] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#174638]/15 transition hover:-translate-y-0.5 hover:bg-[#205b49]"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-2 rounded-xl border border-[#dce3d9] bg-white px-6 py-3.5 font-semibold text-[#244b3b] transition hover:border-[#174638]"
              >
                Our Story
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-[#65776a]">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fcfaf6] bg-[#e2eadf]">
                  <Heart size={16} />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fcfaf6] bg-[#f1e6d3]">
                  <ShoppingBag size={16} />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fcfaf6] bg-[#e3e9ef]">
                  <Star size={16} />
                </div>
              </div>

              <span>Thoughtful choices. Better shopping.</span>
            </div>
          </motion.div>

          {/* Decorative Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-[#e5e4d9] bg-[#f0eee5] p-5 sm:p-8">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#dce8d9]" />

              <div className="relative rounded-[1.5rem] bg-white p-6 shadow-sm sm:p-9">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf2e7] text-[#174638]">
                    <ShoppingBag size={25} />
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-[#f5f2e9] px-3 py-1.5 text-xs font-semibold text-[#8b7952]">
                    <Sparkles size={13} />
                    Made for you
                  </div>
                </div>

                <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-[#8b9b8e]">
                  The ShopNest feeling
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-[#193c30] sm:text-4xl">
                  Find what
                  <br />
                  feels right.
                </h2>

                <p className="mt-4 leading-7 text-[#788379]">
                  Discover useful essentials and little things that make
                  everyday life better.
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-[#eeeee7] pt-5">
                  <div>
                    <p className="text-sm font-semibold text-[#244b3b]">
                      Your everyday store
                    </p>
                    <p className="mt-1 text-xs text-[#8b968d]">
                      Simple. Thoughtful. Convenient.
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#174638] text-white">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-2 flex items-center gap-3 rounded-2xl border border-[#e8e7de] bg-white p-4 shadow-lg sm:-left-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf2e7] text-[#174638]">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#244b3b]">
                    Shopping, simplified
                  </p>
                  <p className="mt-1 text-xs text-[#7a887d]">
                    Every step matters
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="scroll-mt-24 px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#64816b]">
              Our Story
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Good shopping should feel
              <span className="text-[#6b9273]"> effortless.</span>
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#68776d]">
            <p>
              ShopNest was built around a simple idea: online shopping should
              be easy to explore, comfortable to use, and enjoyable from
              beginning to end.
            </p>

            <p>
              We bring products together in one place so you can discover what
              you need without making the experience complicated. Whether
              you're looking for everyday essentials or something new, we're
              here to make the journey easier.
            </p>

            <p className="font-medium text-[#315744]">
              Our goal is simple — make every shopping experience a little
              better.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-y border-[#ece9df] bg-white/70 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#64816b]">
              Why ShopNest?
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              A little more care in every detail.
            </h2>

            <p className="mt-4 leading-7 text-[#758177]">
              We're focused on the things that make a difference to your
              everyday shopping experience.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-[#e9e7dd] bg-[#fcfaf6] p-7 transition-shadow hover:shadow-xl hover:shadow-[#193c30]/5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f0e5] text-[#174638]">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>

                  <p className="mt-3 leading-7 text-[#758177]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#174638] px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-16"
        >
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-8 h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Heart size={25} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#c4d9c6]">
                Our Promise
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Your experience matters. Always.
              </h2>

              <p className="mt-5 max-w-lg leading-8 text-white/75">
                We're committed to creating a shopping experience built on
                simplicity, thoughtful choices, and a genuine focus on what
                matters to you.
              </p>
            </div>

            <div className="space-y-5">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-[#c4d9c6]"
                  />
                  <p className="leading-7 text-white/90">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f0e5] text-[#174638]">
            <ShoppingBag size={27} />
          </div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Your next favorite is waiting.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#758177]">
            Take a look around, explore our collection, and find something
            you'll love.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#174638] px-7 py-4 font-semibold text-white transition hover:bg-[#205b49]"
          >
            Start Exploring
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;