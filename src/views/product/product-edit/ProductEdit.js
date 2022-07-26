import ProductService from "@/services/product/ProductService"
import NProgress from 'nprogress'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { productStore } from '@/store'

export default {
  name: "ProductEdit",
  components: {
    NProgress,    
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      isLoadingZipCode: false,
    }
  },
  computed: {
    s_product: () => productStore().getItem,
  },
  validations () {
    return {
      s_product: {
        name: { required },
        sku: { required },
      }
    }
  },
  mounted(){
    this.init()    
  },
  methods: {
    async init(){
      try {
        NProgress.start()
        this.isLoading = true
        await this.getProductById(this.$route.params.id)        
      } finally {
        NProgress.done()
        this.isLoading = false
      }
      window.scrollTo(0, 0)
      this.$refs.name.focus()
    },

    /**
     * Localizar Registro por Id
     */
     async getProductById(id){
      try {
        await productStore().show(id)
        ProductService.formatNumbers(this.s_product)        
      } catch (error) {
        console.log(error)
      }
    },
    
    /**
     * Atualizar e fechar formulário
     */
    async submitAndClose()
    {      
      // Atualizar Registro
      await this.updateProduct(this.s_product)         
      
      // Ir para página de Listagem
      this.$router.push({
        name: 'product.list',
        params: {}
      })
    },

    /**
     * Atualizar Registro
     * @param {product} product 
     */
    async updateProduct(product){
      try {
        this.isLoading = true
        await productStore().update(product.id, {...product})
        this.$helper.swal.updatedWithSuccess()
      } catch (error) {
        // Interromper execução posterior
        this.$helper.swal.error(this.$helper.util.arrayToStr(error.response.data.data))       
        throw error
      } finally {
        this.isLoading = false
      }
    },    
  }    
}