import { createSlice } from "@reduxjs/toolkit";

const getLocalCartData = () => {
  const cartData = localStorage.getItem("cart");

  // Eğer localStorage'da veri yoksa ya da 'undefined' saklandıysa boş dizi döndür
  if (cartData && cartData !== "undefined") {
    try {
      return JSON.parse(cartData);
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return [];
    }
  }

  return [];
};

const initialState = {
  products: getLocalCartData(),
  drawer: false,
  totalAmount: 0,
};

const writeLocalStorage = (products) => {
  localStorage.setItem("cart", JSON.stringify(products));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Eger True dönerse ürün vardır
      const findProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        // Bizim Varolan Ürünümüze eşit olmayanları filtreleyip çıkarttık
        const extractedProduct = state.products.filter(
          (product) => product.id !== action.payload.id
        );
        // Ve burda ise üstte buldugumuz ürünün adetine yeni gönderdigimiz action.payload.count ile üstüne tekrar adet eklemiş olduk
        findProduct.count += action.payload.count;
        // State Ürünlerimize tekrardan çıkarttıgımız ürünü ekleyip Ve ek olarak adetini arttırdıgımız ürünüde eklemiş olduk
        state.products = [...extractedProduct, findProduct];
        // Ürünü localde setledik
        writeLocalStorage();
      } else {
        // Ürün yeni ekleniyor

        state.products = [...state.products, action.payload];
      }
      // Yeni ürünler tekrar eklendi
      writeLocalStorage(state.products);
    },

    calculateBasket: (state) => {
      state.totalAmount = 0;
      state.products &&
        state.products.forEach((product) => {
          state.totalAmount += product.count * product.price;
        });
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      writeLocalStorage(state.products);
    },

    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
  },
});

export const { addToBasket, setDrawer, calculateBasket, deleteProduct } =
  basketSlice.actions;
export default basketSlice.reducer;
