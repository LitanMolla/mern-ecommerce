const columns = [
    {
        header: "Product ID",
        cell: (product) => ({ value: product._id?.toString() || "" }),
        width: 25,
    },
    {
        header: "Title",
        cell: (product) => ({ value: product.title || "" }),
        width: 30,
    },
    {
        header: "Slug",
        cell: (product) => ({ value: product.slug || "" }),
        width: 30,
    },
    {
        header: "SKU",
        cell: (product) => ({ value: product.sku || "" }),
        width: 20,
    },
    {
        header: "Short Description",
        cell: (product) => ({
            value: product.shortDescription || "",
        }),
        width: 35,
    },
    {
        header: "Description",
        cell: (product) => ({ value: product.description || "" }),
        width: 50,
    },
    {
        header: "Price",
        cell: (product) => ({
            value: product.price ?? 0,
            type: Number,
        }),
    },
    {
        header: "Discount Price",
        cell: (product) => ({
            value: product.discountPrice ?? 0,
            type: Number,
        }),
    },
    {
        header: "Main Image",
        cell: (product) => ({
            value:
                product.images?.find((image) => image.isMain)?.url || "",
        }),
        width: 45,
    },
    {
        header: "All Images",
        cell: (product) => ({
            value:
                product.images?.map((image) => image.url).join(", ") || "",
        }),
        width: 60,
    },
    {
        header: "Category ID",
        cell: (product) => ({
            value: product.category?.toString() || "",
        }),
        width: 25,
    },
    {
        header: "SubCategory ID",
        cell: (product) => ({
            value: product.subCategory?.toString() || "",
        }),
        width: 25,
    },
    {
        header: "Owner ID",
        cell: (product) => ({
            value: product.owner?.toString() || "",
        }),
        width: 25,
    },
    {
        header: "Status",
        cell: (product) => ({ value: product.status || "" }),
    },
    {
        header: "Created At",
        cell: (product) => ({
            value: product.createdAt
                ? new Date(product.createdAt).toLocaleString("en-GB")
                : "",
        }),
        width: 25,
    },
    {
        header: "Updated At",
        cell: (product) => ({
            value: product.updatedAt
                ? new Date(product.updatedAt).toLocaleString("en-GB")
                : "",
        }),
        width: 25,
    },
];

const schema = {
    title: {
        column: "title",
        type: String,
    },
    slug: {
        column: "slug",
        type: String,
    },
    sku: {
        column: "sku",
        type: String,
    },
    shortDescription: {
        column: "shortDescription",
        type: String,
    },
    description: {
        column: "description",
        type: String,
    },
    price: {
        column: "price",
        type: Number,
    },
    discountPrice: {
        column: "discountPrice",
        type: Number,
    },
    stock: {
        column: "stock",
        type: Number,
    },
    images: {
        column: "images",
        type: String,
    },
};


module.exports = { schema, columns }