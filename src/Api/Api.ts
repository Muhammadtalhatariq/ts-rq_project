import axios from "axios";
import type { Product } from "../Types";

const api = axios.create({
    baseURL: "https://fakestoreapi.com"
})

export const featchProducts = async (): Promise<Product[] | null> => {
    try {
        const res = await api.get<Product[] | null>("/products")
        return res.status === 200 ? res.data : []
    } catch (error) {
        console.log("error : ", error);
    }
}

export const featchProduct = async (id: number): Promise<Product | null> => {
    try {
        const res = await api.get<Product>(`/products/${id}`)
        return res.status === 200 ? res.data : null
    } catch (error) {
        console.log("error : ", error);
    }
}

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await api.delete(`/products/${id}`)
        console.log(`product delete successfully with id ${id}`);
    } catch (error) {
        console.log(`Failed to delete product with id ${id}`, error);
    }

}
export const updateProduct = (id: number) => {
    try {
        return api.patch(`/products/${id}`, { title: "I have updated" });
    } catch (error) {
        console.log(`Failed to update product with id ${id}`, error);
    }
};