import { defineStore } from "pinia";
import { getProducts, getProductsById } from "../service/productServices";

export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
        product: null,
        loading: false,
        error: null
    }),
    actions: {
        async fetchProducts () {
            if(this.products.length > 0) return;
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
                this.product = res;
            }catch (err){
                this.error = err.message;
            }finally{
                this.loading = false
            }
        }
    }
})