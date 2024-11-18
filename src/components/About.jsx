import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const About = () => {

  const myStore = useSelector((state) => state.crud.myStoreDetails);
  
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            About Us
          </h1>

          <section className="bg-white rounded-lg shadow p-6 mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to {myStore.name}, your one-stop shop for high-quality
              products that make life better. Our journey started with a simple
              vision: to create a seamless shopping experience for customers
              around the world. From electronics to fashion, home essentials to
              beauty products, we’ve curated a selection that caters to all your
              needs.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Our team is passionate about providing you with the best shopping
              experience, with a focus on customer service, reliability, and
              fast delivery. We believe in making shopping easy and enjoyable,
              and our goal is to offer products that you’ll love.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to bring high-quality products to your doorstep,
                while delivering exceptional customer service. We strive to
                continuously improve our store and provide our customers with an
                experience that is convenient, trustworthy, and enjoyable.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our vision is to be the leading online shopping destination for
                quality and affordable products. We envision a world where
                shopping is not just a transaction, but an experience that
                inspires joy and satisfaction.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
              <li>
                <span className="font-semibold text-gray-800">
                  Customer Satisfaction:
                </span>{" "}
                We place our customers at the heart of everything we do, and we
                are committed to ensuring they have a positive experience every
                time they shop with us.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Integrity:</span>{" "}
                We believe in building trust through honesty and transparency in
                our business practices.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Quality:</span> We
                curate a selection of products that are built to last and
                provide true value to our customers.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Innovation:</span>{" "}
                We constantly explore new ways to improve our services,
                embracing technology to make shopping better for everyone.
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We’re a team of passionate individuals dedicated to making your
              shopping experience great. We work tirelessly behind the scenes to
              bring you the best products and ensure your orders are processed
              smoothly. Here’s what some of our customers have to say:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myStore.teamMembers.map((member, ind) => (
                <div key={ind} className="bg-gray-50 rounded-lg p-4 shadow">
                  <p className="text-gray-600 italic">{member.message}</p>
                  <p className="text-gray-800 mt-4 font-semibold">
                    - {member.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
