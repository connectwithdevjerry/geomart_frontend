import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import customFetch from "./axiosObject";

const initialState = {
  products: [],
  productsError: "",
  loading: false,
  inappLoading: false,
  prevPath: "/",
  productCategories: {
    physical: [],
    digital: [],
    bestselling: [],
    electronics: [],
    fashion: [],
    home_and_garden: [],
    featured: [],
  },
  orderDetails: {
    orderId: "",
    subtotal: 0,
    total: 0,
    shipping: 0,
    tax: 0,
    items: [],
    access_code: "",
  },
  myStoreDetails: {
    name: "GeoMart",
    email: "mystore@geomart.com",
    phone: "+23491-etc-123",
    address: "Olopemarun, Abuja, Nigeria",
    teamMembers: [
      {
        name: "Adebayo",
        message: `"I love the variety of items they offer. The customer service
                  team is very helpful and responsive. Definitely my go-to
                  online store."`,
      },
      {
        name: "Bolatito",
        message: `"I love the variety of items they offer. The customer service
                  team is very helpful and responsive. Definitely my go-to
                  online store."`,
      },
      {
        name: "Adewumi",
        message: `"Great products at affordable prices. I've purchased from them
                  multiple times, and I'm always satisfied."`,
      },
    ],
  },
};

const updateOrderDetails = (cartItems) => {
  let subtotal = 0;
  let total = 0;
  let shipping = 0;
  let tax = 0;
  const updatedItems = cartItems.map((item) => {
    let totalPrice = item.productPrice * item.quantity;
    subtotal += totalPrice;
    return item;
  });
  total = subtotal + shipping + tax;
  return { subtotal, total, shipping, tax, items: cartItems };
};

// slice
export const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      console.log({ pay: state.products });
    },
    handleCheckOut: (state, action) => {
      console.log("this is handlecheckout function!");
    },
    handleProductCategories: (state, action) => {
      const limit = action.payload;
      const physical = state.products
        ?.filter(({ category }) => category === "physical")
        ?.slice(0, limit.physical);

      const digital = state.products
        ?.filter(({ category }) => category === "digital")
        ?.slice(0, limit.digital);

      const electronics = state.products
        ?.filter(({ category }) => category === "electronics")
        ?.slice(0, limit.electronics);

      const fashion = state.products
        ?.filter(({ category }) => category === "fashion")
        ?.slice(0, limit.fashion);

      const home_and_garden = state.products
        ?.filter(({ category }) => category === "home_and_garden")
        ?.slice(0, limit.home_and_garden);

      const bestselling = state.products
        ?.filter(({ bestSelling }) => bestSelling === true)
        ?.slice(0, limit.bestselling);

      const featured = state.products
        ?.filter(({ featured }) => featured === true)
        ?.slice(0, 4);

      state.productCategories = {
        physical,
        digital,
        bestselling,
        electronics,
        fashion,
        home_and_garden,
        featured,
      };
    },
    getCartItems: (state, action) => {
      state.orderDetails.items = cart;
      // console.log(cart)
      const updatedOrderDetails = updateOrderDetails(cart);

      state.orderDetails = updatedOrderDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        console.log("getting all products...");
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("getting all products...");
        state.loading = false;
        state.products = action.payload?.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        console.log("getting all products...");
        state.loading = false;
        state.productsError = "Error Loading Product";
      })

      .addCase(searchAsync.pending, (state) => {
        console.log("getting search results...");
        state.loading = true;
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        console.log({ act: action.payload?.data?.data });
        state.products = action.payload?.data?.data;
        state.loading = false;
        if (action.payload?.data?.status) {
          state.prevPath = `/viewproduct/${action.payload?.searchWord}`;
        }
      })
      .addCase(searchAsync.rejected, (state) => {
        state.loading = false;
        state.productsError = "Error Loading Product";
      })

      .addCase(getMyCartItems.pending, (state, action) => {
        state.loading = true;
        state.productsError = "";
      })
      .addCase(getMyCartItems.fulfilled, (state, action) => {
        // format data coming from backend
        // let
        console.log(action?.payload);
        state.orderDetails.items = action.payload?.data;
        state.orderDetails.orderId = action.payload?.orderId;
        state.orderDetails.subtotal = action.payload?.total;
        state.loading = false;
      })
      .addCase(getMyCartItems.rejected, (state, action) => {
        state.loading = false;
        state.productsError = "Error Loading Product";
      })
      .addCase(incrementDecrement.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(incrementDecrement.fulfilled, (state, action) => {
        state.loading = false;
        console.log({ sutotal: action.payload });
        state.orderDetails.subtotal = action.payload?.total;
      })
      .addCase(incrementDecrement.rejected, (state, action) => {
        state.loading = false;
        state.productsError =
          "Error performing db increamentment, please refresh!";
        // console.log(action.payload);
      })
      .addCase(addShippingDetails.pending, (state, action) => {
        state.loading = true;
        state.productsError = "";
      })
      .addCase(addShippingDetails.fulfilled, (state, action) => {
        if (action.payload.checkoutStatus) {
          state.orderDetails.access_code = action.payload.access_code;
        } else {
          state.productsError =
            "Error performing db getting checkout page, please refresh!";
        }
        state.loading = false;
      })
      .addCase(addShippingDetails.rejected, (state, action) => {
        state.loading = false;
        state.productsError =
          "Error performing db getting checkout page, please refresh!";
      })
      .addCase(handleAddToCart.pending, (state) => {
        state.productsError = "";
        state.inappLoading = true;
      })
      .addCase(handleAddToCart.fulfilled, (state, action) => {
        if (!action.payload.status) {
          state.productsError = "Product already in cart!";
          alert(state.productsError);
        } else {
          state.orderDetails.items = action.payload?.data.items;
        }
        state.inappLoading = false;
      })
      .addCase(handleAddToCart.rejected, (state) => {
        state.inappLoading = false;
        state.productsError = "Couldn't add product to cart!";
        alert(state.productsError);
      })
      .addCase(handleRemoveFromCart.pending, (state) => {
        state.productsError = "";
        state.inappLoading = true;
      })
      .addCase(handleRemoveFromCart.fulfilled, (state, action) => {
        console.log(action.payload);
        if (!action.payload.data.status) {
          state.productsError = "Product already in cart!";
          alert(state.productsError);
        } else {
          const updated = state.orderDetails.items.filter(
            (item) => item.id._id != action.payload.productId
          );
          state.orderDetails.items = updated;
          state.orderDetails.subtotal = action.payload.data?.totalPrice;
        }
        state.inappLoading = false;
      })
      .addCase(handleRemoveFromCart.rejected, (state) => {
        state.inappLoading = false;
        state.productsError = "Couldn't remove product from cart!";
        alert(state.productsError);
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        alert("Ticket created successfully");
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.productsError = "could not send request";
      });
  },
});

export const handleAddToCart = createAsyncThunk(
  "crud/handleAddToCart",
  async (productId) => {
    try {
      const response = await customFetch.get(
        `http://localhost:5000/order/add-to-cart/${productId}`
      );
      console.log({ addToCart: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const handleRemoveFromCart = createAsyncThunk(
  "crud/handleRemoveFromCart",
  async (values) => {
    try {
      const response = await customFetch.post(
        "http://localhost:5000/order/remove-from-cart",
        values
      );
      console.log({ removeFromCart: response.data });
      return { productId: values.productId, data: response.data };
    } catch (error) {
      console.error(error);
    }
  }
);

// export const getAllProducts = createAsyncThunk(
//   "crud/getAllProducts",
//   async ({ limit }) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/product/get_products",
//         {
//           params: { limit },
//         }
//       );
//       console.log({ products: response.data });
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

export const createTicket = createAsyncThunk(
  "crud/createTicket",
  async (ticket) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/ticket/create_ticket",
        ticket
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getMyCartItems = createAsyncThunk(
  "crud/getMyCartItems",
  async () => {
    try {
      const response = await customFetch.get(
        "http://localhost:5000/order/cart-items"
      );
      // console.log({ cart: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const incrementDecrement = createAsyncThunk(
  "crud/incrementDecrement",
  async (values) => {
    try {
      const response = await customFetch.post(
        "order/increment-decrement",
        values
      );

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const addShippingDetails = createAsyncThunk(
  "crud/addShippingDetails",
  async (values) => {
    try {
      const response = await customFetch.post(
        "http://localhost:5000/order/add-shipping-details",
        values
      );
      console.log({ shippingDetails: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getPaymentStatus = createAsyncThunk(
  "crud/getPaymentStatus",
  async (orderId) => {
    try {
      const response = await customFetch.get(
        "http://localhost:5000/order/payment-status",
        {
          params: {
            orderId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const searchAsync = createAsyncThunk(
  "crud/searchAsync",
  async (params) => {
    console.log({ params });
    try {
      const response = await customFetch.get(
        "http://localhost:5000/product/search_products",
        { params }
      );
      return { searchWord: params.searchWord, data: response.data };
    } catch (error) {
      console.error(error);
    }
  }
);

export const {
  setChecked,
  setFilter,
  incrementByAmount,
  setProducts,
  handleDecrement,
  handleIncrement,
  getCartItems,
  filterCart,
  handleProductCategories,
  handleCheckOut,
} = crudSlice.actions;

export default crudSlice.reducer;
