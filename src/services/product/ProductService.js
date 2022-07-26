import Api from '@/services/Api'
import * as apiFunctions from '@/services/Api'
import * as helper from '@/helpers'
 
export default {
  /**
   * Deletar registro
   * (DELETE): baseURL/stock/product/:id
   * 
   * @param {integer} id 
   * @returns Promise<AxiosResponse<any, any>>
   */
  async destroy(id){
    const response = await Api().delete(`stock/product/${id}`)
    return response.data
  },

  /**
   * Listar todos os registros com QUERY
   * (POST): baseURL/stock/product/query
   * 
   * @returns Promise<AxiosResponse<any, any>>
  */
  async query(pageConfig, filterConfig){
    // Configuração de página e Filtro
    const payload = {
      page: apiFunctions.loadPageConfig(pageConfig),
      filter: {
        orderBy: [],
        where: [],
        orWhere: [],
      }
    }

    if (filterConfig) {
      // Pesquisa customizada
      if (filterConfig.customSearch) {
        [ 
          'product.id',
          'product.name',
          'product.description',
          'product.sku',
        ].forEach(el => {
          payload.filter.orWhere.push({
            fieldName: el,
            operator: 'likeAnywhere',
            fieldValue: [filterConfig.customSearch]
          })
        })        
      }
      
      // Ordenação dos registros
      if (filterConfig.orderBy) {
        payload.filter.orderBy = [{
          fieldName: filterConfig.orderBy,
          direction: 'asc',
        }]
      }
    }

    // Enviar Requisição
    const response = await Api().post('stock/product/query', payload)
    return response.data
  },

  /**
   * Localizar registro por Id
   * (GET): baseURL/product/:id
   * 
   * @param {integer} id 
   * @returns Promise<AxiosResponse<any, any>>
   */ 
  async show(id){
    const response = await Api().get(`/stock/product/${id}`)    
    return response.data     
  },

  /**
   * Incluir um novo registro
   * (POST): baseURL/product
   * 
   * @param {data?} payload 
   * @returns Promise<AxiosResponse<any, any>>
   */
  async store(payload){
    this.beforeSaveProduct(payload)
    const response = await Api().post('/stock/product/', payload)
    return response.data
  },

  /**
   * Atualizar registro
   * (PUT): baseURL/product/:id
   * 
   * @param {integer} id 
   * @param {data?} payload 
   * @returns Promise<AxiosResponse<any, any>>
   */
  async update(id, payload){
    this.beforeSaveProduct(payload)
    const response = await Api().put(`/stock/product/${id}`, payload)
    return response.data
  },

  /**
   * Antes de salvar/enviar requisição 
   * @param {object} product 
   */
  beforeSaveProduct(product){
    // Converter numbers que possam estar como string
    let strToNum = helper.util.strToNum
    product.price = strToNum(product.price)    
  },

  /**
   * Converter numbers em string
   * @param {object} product 
   */
  formatNumbers(product){
    let formatNumber = helper.util.formatNumber
    product.price = formatNumber(product.price)    
  },
}