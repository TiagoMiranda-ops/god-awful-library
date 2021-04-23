export interface Book {
    id: string;
    title: string;
    author: string | string[];
    cover: string;
    description?: any;
}