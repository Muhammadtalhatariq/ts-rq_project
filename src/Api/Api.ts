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
    await api.delete(`/products/${id}`)
}

export const updateProduct = (id: number) => {
    return api.patch(`/products/${id}`, { title: "I have updated" });
};