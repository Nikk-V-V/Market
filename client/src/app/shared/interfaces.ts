export interface User {
  _id?: string
  email: string
  password: string
  login?: string
  name?: string
  surname?: string
}

export interface Category {
  _id?: string
  title: string
  image: string
}

export interface Product {
  _id?: string
  title: string
  description: string
  image: string
  rating?: number
  price: number
  category: string
  owner?: string
  review?: Array<string>
}

export interface Slide {
  _id?: string
  image: string
}
