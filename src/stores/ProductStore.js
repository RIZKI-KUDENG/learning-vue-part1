import { defineStore } from "pinia";
import { getProducts, getProductsById } from "../service/productServices";

export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchProducts () {
            this.loading = true;
            this.error = null;
            try {
                const res = await getProducts();
                this.products = res;
            }catch (err){
                this.error = err.message;
            }finally{
                this.loading = false
            }
        },
        async fetchProductsById (id) {
            this.loading = true;
            this.error = null;
            try {
                const res = await getProductsById(id);
                this.products = res;
            }catch (err){
                this.error = err.message;
            }finally{
                this.loading = false
            }
        }
    }
})