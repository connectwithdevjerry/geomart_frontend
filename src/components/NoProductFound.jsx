import Navbar from "./Navbar";

const NoProductFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-900">No Product Found</div>
      </div>
    </>
  );
};

export default NoProductFound;
