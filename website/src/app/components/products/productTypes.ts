export type ProductSpecification = {
    label: string;
    value: string;
};

export type Product = {
    _id: string;
    slug: string;
    name: string;
    category: string;
    image: string;
    shortDescription: string;
    description: string;
    applications: string[];
    specifications: ProductSpecification[];
    isActive: boolean;
};