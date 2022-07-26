import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { productStore } from '@/store'

export default {
  name: "ProductCreate",
  components:{
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,      
      product: {
        id: null,
        name: null,
        sku: null,
        price: '0,00',
        description: null,        
      },
    }
  },
  validations () {
    return {
      product: {
        name: { required },
        sku: { required },
      }
    }
  },
  mounted(){
    this.init()    
  },
  methods: {
    init(){
      this.v$.$touch()
      window.scrollTo(0, 0)
      this.$refs.name.focus()
    },
    
    /**
     * Salvar e fechar formulário
     */
    async submitAndClose()
    {      
      // Salvar Registro
      await this.storeProduct(this.product)        

      // Ir para página de Listagem
      this.$router.push({
        name: 'product.list',
        params: {}
      })
    },

    /**
     * Incluir Novo Registro
     * @param {product} product 
     */
    async storeProduct(product){
      try {
        this.isLoading = true
        await productStore().store(product)
        this.$helper.swal.savedWithSuccess()
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