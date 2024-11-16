import { useState, useRef } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";


const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [url, setUrl] = useState("");
  const [fileDisabled, setFileDisabled] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const inputFile = useRef(null);

  const initialValues = {
    productName: "",
    productPrice: "",
    description: "",
    productSku: "",
    productImage: "",
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];

    // convert to base64
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      axios
        .post("http://localhost:5000/uploadimage", { image: fileReader.result })
        .then((res) => {
          console.log({ res });
          let image_url = res?.data?.data?.url;
          let secure_url = res?.data?.data?.secure_url;
          if (image_url) {
            setUrl(image_url);
            setFileDisabled(true);
          }
          setSaveDisabled(false);
          // alert("Image uploaded Succesfully");
        })
        .catch((err) => console.log(err));
    };
  };

  const renderError = (touched, errors, url = "") =>
    (touched?.email && errors?.email && (
      <span className="val-error">{errors.email}</span>
    )) ||
    (touched?.password && errors?.password && (
      <span className="val-error">{errors.password}</span>
    )) ||
    (touched?.firstName && errors?.firstName && (
      <span className="val-error">{errors.firstName}</span>
    )) ||
    (touched?.lastName && errors?.lastName && (
      <span className="val-error">{errors.lastName}</span>
    )) ||
    (touched?.productImage && (url == "" || url == undefined) && (
      <span className="val-error">
        {"Please upload/reupload an image before submitting!"}
      </span>
    ));

  const validationSchema = yup.object({
    productName: yup.string().required("Product Name cannot be blank!"),
    productPrice: yup.number().required("Product Price cannot be blank!"),
    description: yup.string().required("Description cannot be blank!"),
    productSku: yup.string().required("Product SKU cannot be blank"),
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, { resetForm }) => {
        if (url === "" || url === undefined) {
          // alert("Please upload/reupload an image before submitting!");
          return;
        }
        setSaveDisabled(true);
        axios
          .post("http://localhost:5000/product/create_product", {
            ...values,
            productImage: url,
          })
          .then((res) => {
            console.log({ res });
            setSaveDisabled(false);
            setFileDisabled(false);
            setImage("");
            resetForm();
            if (inputFile.current) {
              inputFile.current.value = "";
              inputFile.current.type = "text";
              inputFile.current.type = "file";
            }
          })
          .catch((err) => console.log(err));
      },
    });

  // console.log(values);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {renderError(touched, errors, url)}
      {/* <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Enter New Product
        </h2>

        <form
          className="flex flex-col"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Product Name"
            name="productName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.productName}
          />
          <input
            type="number"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="product Price"
            name="productPrice"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.productPrice}
          />
          <input
            type="text"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Product SKU"
            name="productSku"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.productSku}
          />
          <textarea
            name="description"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          ></textarea>
          <input
            type="file"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Product Image"
            onChange={uploadImage}
            disabled={fileDisabled}
            ref={inputFile}
            name="productImage"
            accept="image/*"
          />

          <button
            type="submit"
            disabled={saveDisabled}
            className={`bg-gradient-to-r ${
              !saveDisabled ? "bg-blue-500" : "bg-gray-300"
            } text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150`}
          >
            Save Product
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default AddProduct;
