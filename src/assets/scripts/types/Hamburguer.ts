import { Ingredient } from "./Ingredient";

 export type Hamburguer = {
    id?: number;
    description: string;
    price: number;
    ingredients?: Ingredient[];
 }