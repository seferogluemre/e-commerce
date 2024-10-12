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
  cartLength: 0,
};

const writeLocalStorage = (products) => {
  localStorage.setItem("cart", JSON.stringify(products));
  addedProductToCart();
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
      calculateBasket();
      addedProductToCart();
    },

    calculateBasket: (state) => {
      state.totalAmount = 0;
      state.products &&
        state.products.forEach((product) => {
          state.totalAmount += product.count * product.price;
        });
    },

    addedProductToCart: (state) => {
      // Sepet uzunluğunu güncelle
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      state.cartLength = cartData.length;
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      if (state.products.length == 0) {
        state.totalAmount = 0;
      }
      writeLocalStorage(state.products);
    },

    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
  },
});

export const {
  addToBasket,
  setDrawer,
  calculateBasket,
  deleteProduct,
  addedProductToCart,
} = basketSlice.actions;
export default basketSlice.reducer;
