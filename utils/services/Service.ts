import type { AxiosInstance } from "axios"
import axios from "axios"

export class Service<T> {
    protected readonly instance: AxiosInstance
    protected readonly url: string

    constructor(url: string) {
        this.url = url
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    protected async request<K extends T>(url: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', data?: K | any) {
        try {
            const response = await this.instance.request({
                url,
                method,
                data
            })
            return response.data
        } catch (error) {
            throw error
        }
    }

    protected getById<K extends T>(id: string): Promise<K> {
        return this.request(`${this.url}/${id}`, 'GET')
    }

    protected getAll<K extends T>(): Promise<K[]> {
        return this.request(this.url, 'GET')
    }

    protected post<K extends T>(data: K): Promise<K> {
        return this.request(this.url, 'POST', data)
    }

    protected patch<K extends T>(id: string, data: K): Promise<K> {
        return this.request(`${this.url}/${id}`, 'PATCH', data)
    }

    protected delete<K extends T>(id: string): Promise<K> {
        return this.request(`${this.url}/${id}`, 'DELETE')
    }
}
    
