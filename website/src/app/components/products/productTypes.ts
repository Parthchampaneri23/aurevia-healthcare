export interface ProductSpecification {
    label: string;
    value: string;
}

export interface Product {
    _id?: string;
    name: string;
    slug: string;
    category: string;
    shortDescription: string;
    description: string;
    applications: string[];
    specifications: ProductSpecification[];
    image: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}