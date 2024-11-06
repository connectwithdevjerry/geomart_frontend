import Navbar from "./Navbar";

const Loading = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-900">Loading...</div>
      </div>
    </>
  );
};

export default Loading;
