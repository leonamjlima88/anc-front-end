import ProductRoute from "./product/product-route"
import UserRoute from "./user/user-route"

// Demais Rotas
const routes = [  
  ...UserRoute,
  ...ProductRoute,
]
export default routes