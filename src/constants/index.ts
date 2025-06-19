export const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRyLnRpZW5hbTEyM0BnbWFpbC5jb20iLCJpYXQiOjE3NTAyODIzMzJ9.uuble_A8f8DPDWi_x4UCio8lf0ZXcCVA8H9zMPlegDU"
export const BASE_URL = `https://notehub-public.goit.study/api`

export const routes = {
    all: '/notes',
    create: '/notes',
    getById: (id:number) => `/notes/${id}`,
    update: (id:number) => `/notes/${id}`,
    delete: (id:number) => `/notes/${id}`,
}