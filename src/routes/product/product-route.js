import ProductCreate from "@/views/product/product-create/ProductCreate.vue"
import ProductEdit from "@/views/product/product-edit/ProductEdit.vue"
import ProductList from "@/views/product/product-list/ProductList.vue"

// Product Routes
const ProductRoute = [
  {
    path: '/product-create',
    name: 'product.create',
    component: ProductCreate
  },
  {
    path: '/product-edit/:id',
    name: 'product.edit',
    component: ProductEdit,
  },
  {
    path: '/product-list',
    name: 'product.list',
    component: ProductList,
  },
]
export default ProductRoute