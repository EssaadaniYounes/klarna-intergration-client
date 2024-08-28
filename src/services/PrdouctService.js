import axios from "@/lib/axios"

export default {
    async getProducts() {
        try {
            const { data: {data: products}, status } = await axios.get("products");
            if (status === 200) return products;
            throw new Error("Failed to fetch products");
        } catch (error) { 
            console.log(error);
            throw error;
        }
    }
}