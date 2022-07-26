import NProgress from 'nprogress'
import { productStore } from '@/store'

export default {
  name: "ProductList",
  components: {
    NProgress,    
  },
  data() {
    return {
      isLoading: true,
      pageConfig: {
        limit: null,
        current: null,
      },
      filterConfig: {
        customSearch: null,
        orderBy: null,
      },      
    }
  },
  computed: {    
    s_productList: () => productStore().getItemList,    
  },   
  mounted() {
    this.init()
  },
  methods: {
    async init(){
      try {
        NProgress.start()
        this.isLoading = true
        await this.getProductList(true, true)
      } finally {
        NProgress.done()
        this.isLoading = false
      }      
    },
    
    /**
     * Listar Registros
     */
    async getProductList(resetPageConfig, resetFilterConfig){
      // Resetar Configuração de Página
      if (resetPageConfig) {
        this.pageConfig = {
          isPaginate: true,
          limit: +process.env.VUE_APP_PAGE_CONFIG_LIMIT,
          current: 1,
        }  
      }

      // Resetar Filtro de Pesquisa
      if (resetFilterConfig) {
        this.filterConfig = {
          customSearch: null,
          orderBy: 'product.name',
        }
      }
      
      // Efetuar Pesquisa
      try {
        await productStore().query(this.pageConfig, this.filterConfig)
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * Incluir Novo Registro
     */
    openProductCreateRoute(){
      this.$router.push({
        name: 'product.create',
        params: {}
      })
    },

    /**
     * Editar Registro
     * @param {Integer} id 
     */
    openProductEditRoute(id) {
      this.$router.push({
        name: 'product.edit',
        params: {id}
      })
    },


    /**
     * Deletar Registro
     * @param {integer} id 
     */
    destroyProduct(id){
      this.$helper.swal.confirmDelete().then( async (result) => {
        if (result.isConfirmed) {
          try {
            await productStore().destroy(id)
          } catch (error) {
            this.$helper.swal.error(error.response.data.data)
            throw error
          }              
        }
      })
    },

    /**
     * Trocar de Página
     * [first, next, prior, last]
     * @param {string} direction 
     */
     changePage(direction){
      if (direction === 'first') this.pageConfig.current = 1
      if (direction === 'next')  this.pageConfig.current++
      if (direction === 'prior') this.pageConfig.current--
      if (direction === 'last')  this.pageConfig.current = this.s_productList.meta.last_page
      this.getProductList()
    },
  }
}