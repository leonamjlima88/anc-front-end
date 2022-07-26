/**
 * date: 14/05/2022
 * description: Inicializar 'axios' e as requisições HTTP da Api
 * author: Leonam J. Lima <leonamjlima88@gmail.com>
 */

import axios from 'axios'

export default () => axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'X-Locale': process.env.VUE_APP_LOCALE,
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYW5jLWJhY2tlbmQudGVzdC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTY1ODcyNDI3MSwiZXhwIjoxNjU4NzM4NjcxLCJuYmYiOjE2NTg3MjQyNzEsImp0aSI6Ijd0YW1UaExFdWtuZllrWG8iLCJzdWIiOiIzIiwicHJ2IjoiMDNkMmQwZmIyMDkyOTA1ZmUxYzUyYjljOTM2OTlmNGU0OTM2MDAxOSJ9.iDDXHs0CycjI8kE-kvl5jJuB8ogY8IPYd-FzTGpKyS0'
  }
})

/**
 * Carregar parâmetros do axios com pageConfig (Default)
 * @param {object} pageConfig 
 */
export function loadPageConfig(pageConfig) {
  const page = {
		isPaginate: true, // Paginação
		limit: pageConfig.limit ? pageConfig.limit : 15, // Limite de registros p/ página
		current: pageConfig.current ? pageConfig.current : 1, // Posição da Página a ser exibida
		columns: [], // Colunas a serem exibidas
  }

  return page;
}