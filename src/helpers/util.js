/**
 * date: 14/05/2022
 * description: Comandos de auxilio para o projeto
 * author: Leonam J. Lima <leonamjlima88@gmail.com>
 */

/**
 * Converter Proxy para Object
 * @param {JavaScriptValue} proxy 
 * @returns Object
 */
export function proxyToObject(proxy) {
  return JSON.parse(JSON.stringify(proxy))
}

/**
 * Converter array|objeto em string
 * @param {array|object} arr 
 * @param {string} separator 
 * @returns string
 */
export function arrayToStr(arr, separator) {
  if (typeof(arr) === 'object') {
    arr = Object.values(arr)    
  }
  return arr.flat().toString().replaceAll(',', separator ?? ' ')
}

/**
 * Retornar string em branco se parametro null|undefined
 * @param {string|null|undefined} str 
 * @returns string
 */
export function strVal(str){
  if ((str === null) || (str === undefined))
    return str = ''
  return str
}

/**
 * Retorna apenas números da string
 * @param {string} str 
 * @returns string
 */
export function onlyNumbers(str) {
  str = strVal(str)
  return str.replace(/\D/g, "")
}

/**
 * Formatar CPF
 * @param {string} document 
 * @returns string formatada
 */
export function formatCpf(document) {
  document = strVal(document)
  const badchars = /[^\d]/g
  const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/
  const cpf = new String(document).replace(badchars, "")
  return cpf.replace(mask, "$1.$2.$3-$4")
}

/**
 * Formatar CNPJ
 * @param {string} document 
 * @returns string formatada
 */
export function formatCnpj(document) {
  document = strVal(document)
  const badchars = /[^\d]/g
  const mask = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
  const cnpj = new String(document).replace(badchars, "")
  return cnpj.replace(mask, "$1.$2.$3/$4-$5")  
}

/**
 * Formatar CPF/CNPJ
 * @param {string} document 
 * @returns string formatada
 */
export function formatCpfCnpj(document) {
  document = strVal(document)
  return onlyNumbers(document).length > 11 
    ? formatCnpj(document)
    : formatCpf(document)
}

/**
 * Pesquisar endereço por viacep
 * @param {string} zipcode 
 * @returns payload from viacep
 */
export function viacep(zipcode) {
  // Não prosseguir se formato inválido
  zipcode = this.onlyNumbers(zipcode).substring(0,8)
  if (zipcode.length !== 8) 
    return

    // Enviar requisição
  let endPoint = `https://viacep.com.br/ws/${zipcode}/json/`
  return fetch(endPoint, {method: 'get'})
    .then(response => response.json())
    .then((response) => {
      return Promise.resolve({
        data: response
      })
    })
}

/**
 * Verificar se CPF é válido
 * @param {string} cpf 
 * @returns boolean
 */
export function cpfIsValid(cpf) {
  cpf = onlyNumbers(cpf)
  if ( !cpf || cpf.length != 11
      || cpf == "00000000000"
      || cpf == "11111111111"
      || cpf == "22222222222" 
      || cpf == "33333333333" 
      || cpf == "44444444444" 
      || cpf == "55555555555" 
      || cpf == "66666666666"
      || cpf == "77777777777"
      || cpf == "88888888888" 
      || cpf == "99999999999" )
    return false

  var soma = 0
  var resto
  for (var i = 1; i <= 9; i++) 
    soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)

  resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false

  soma = 0
    for (var i = 1; i <= 10; i++) 
      soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)

    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

/**
 * Verificar se cnpj é válido
 * @param {string} cnpj 
 * @returns boolean
 */
export function cnpjIsValid(cnpj) {
  cnpj = onlyNumbers(cnpj)
  if ( !cnpj || cnpj.length != 14
     || cnpj == "00000000000000" 
     || cnpj == "11111111111111" 
     || cnpj == "22222222222222" 
     || cnpj == "33333333333333" 
     || cnpj == "44444444444444" 
     || cnpj == "55555555555555" 
     || cnpj == "66666666666666" 
     || cnpj == "77777777777777" 
     || cnpj == "88888888888888" 
     || cnpj == "99999999999999")
    return false
  var tamanho = cnpj.length - 2
  var numeros = cnpj.substring(0,tamanho)
  var digitos = cnpj.substring(tamanho)
  var soma = 0
  var pos = tamanho - 7

  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(0)) return false
  tamanho = tamanho + 1
  numeros = cnpj.substring(0,tamanho)
  soma = 0
  pos = tamanho - 7
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(1)) return false
  return true
}

/**
 * Verificar se CPF/CNPJ é válido
 * @param {string} document 
 * @returns boolean
 */
export function cpfCnpjIsValid(document) {  
  return onlyNumbers(document).length > 11 
    ? cnpjIsValid(document)
    : cpfIsValid(document)
}

/**
 * Converter String em Number
 * @param {string|number|null} str 
 * @param {integer} def 
 * @returns number
 */
export function strToNum (str, def = 0) {
  // Transformar campo null em 0
  if (str === null) {
    str = 0
  }
  // Retorna se o tipo for number
  if (typeof str === 'number') {
    return str
  }
  // Tratar valor >= milhão Padrão BR
  if (str.split('.').length > 2){
    return parseFloat(str.replaceAll('.', '').replaceAll(',', '.'))
  }
  // Tratar valor >= milhão Padrão EUA
  if (str.split(',').length > 2){
    return parseFloat(str.replaceAll(',', ''))
  }
  // Tratar apenas quando houver uma única casa decimal
  if ((str.toString().charAt(str.length - 2) === '.') || (str.toString().charAt(str.length - 2) === ',')) {
    str += '0'
  }
  // Executar expressão
  const decimalPlaces = (str.split(',').length > 1) ? str.split(',')[1].length : 2
  const exp = /\D*(\d+|\d.*?\d)(?:\D+(\d{2}))?\D*$/
  const cur_re = new RegExp(exp.source.replaceAll('2', decimalPlaces))
  let parts = cur_re.exec(str)
  return (parts === null)
    ? def
    : parseFloat(parts[1].replace(/\D/, '') + '.' + (parts[2] ? parts[2] : '00'))
}

/**
 * Formatar number em string usando toLocaleString
 * @param {number} val 
 * @param {integer} decimal 
 * @param {string} style 
 * @param {string} locale 
 * @returns 
 */
export function formatNumber(val, decimal = 2, style = 'decimal', locale = 'pt-BR') {
  if (typeof val !== 'number') 
    val = strToNum(val)

  return val.toLocaleString(
    locale, { style: style,  minimumFractionDigits: decimal }
  )
}

/**
 * Método para conectar em @keypress. e aceitar apenas números no input
 * Exemplo: @keypress="$helper.util.keyPressJustNumbers($event)"
 * @param {object} event 
 */
  export function keyPressJustNumbers (event) {
    const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const keyPressed = event.key
  
  // Não permitir teclas que são diferentes de keysAllowed
  if ((!keysAllowed.includes(keyPressed)) 
  ){
    event.preventDefault()
  }
}

/**
 * Método para conectar em @keypress. e aceitar apenas decimal no input
 * Exemplo: @keypress="$helper.util.keyPressJustDecimal($event)"
 * @param {object} event 
 */
export function keyPressJustDecimal (event) {
  const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',']
  const keyPressed = event.key
  
  // Não permitir teclas que são diferentes de keysAllowed
  // Não permitir 2 virgulas
  // Não permitir 2 pontos em sequência
  // Não permitir ponto em seguida de virgula
  // Não permitir virgula em seguida de ponto
  // Não permitir ponto como primeiro caracter
  // Não permitir virgula como primeiro caracter
  if ((!keysAllowed.includes(keyPressed)) 
  || ((event.key === ',') && event.target.value.includes(','))
  || ((event.key === '.') && (event.target.value.substr(-1) === '.'))
  || ((event.key === '.') && (event.target.value.substr(-1) === ','))
  || ((event.key === ',') && (event.target.value.substr(-1) === '.')) 
  || ((event.key === '.') && (event.target.value.length <= 0)) 
  || ((event.key === ',') && (event.target.value.length <= 0)) 
  ){
    event.preventDefault()
  }
}

/**
 * Verificar se variavel é um object
 * @param {array|object} mixed_var 
 * @returns boolean
 */
export function is_object(mixed_var) {
  if (mixed_var instanceof Array) {
    return false
  } else {
    return (mixed_var !== null) && (typeof( mixed_var ) == 'object')
  }
}

/**
 * Converter object em array
 * @param {object} obj 
 * @returns array
 */
export function objectToArray(obj) {
  var array = [], tempObject;
  for (var key in obj) {
    tempObject = obj[key];
    if (is_object(obj[key])) {
        tempObject = objectToArray(obj[key]);
    }
    array[key] = tempObject;
  }
  return array;
}

/**
 * Copiar objeto utilizando JSON.stringfy e JSON.parse
 * @param {object} object 
 * @param {boolean} convertToArray 
 * @returns object|array
 */
export function copyObject(object, convertToArray = false){
  const copiedObject = JSON.parse(JSON.stringify(object));  

  // Retornar como array
  if (convertToArray)
    return objectToArray(copiedObject)

  return copiedObject
}


