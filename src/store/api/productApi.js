import api from "./api";

export const productApi = api.injectEndpoints({
  reducerPath: "productApi",
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: "products/",
          method: "POST",
          body: data,
        };
      },
    }),

    getAllProducts: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `products/${queryString ? `?${queryString}` : ""}`;
      },
    }),

    getProductById: builder.query({
        query: (id) => `products/${id}`,
    }),

    updateProduct: builder.mutation({
        query: (data) => {
          return {
            url: `products/${data.get("id")}`,
            method: "PATCH",
            body: data,
          };
        },
    }),

    deleteProduct: builder.mutation({
        query: (id) => ({
          url: `products/${id}`,
          method: "DELETE",
        }),
    }),

    
  }),
});

export const { 
    useAddProductMutation, 
    useGetAllProductsQuery,  
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi;
