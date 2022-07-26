/**
 * date: 14/05/2022
 * description: SweetAlert (Mensagens)
 * author: Leonam J. Lima <leonamjlima88@gmail.com>
 */

import Swal from 'sweetalert2'

/**
 * Mensagem de registro atualizado com sucesso
 * @returns Promise<SweetAlertResult<any>>
 */
 export function updatedWithSuccess(){
  return Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Registro alterado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  })
}

/**
 * Mensagem de registro salvo com sucesso
 * @returns Promise<SweetAlertResult<any>>
 */
 export function savedWithSuccess(){
  return Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Registro salvo com sucesso!',
    showConfirmButton: false,
    timer: 1500
  })
}

/**
 * Mensagem de erro 
 * @param {string} text 
 * @returns Promise<SweetAlertResult<any>>
 */
export function error(text){
  return Swal.fire({
    title: 'Falha na validação dos dados',
    icon: 'error',
    text: text,
  })
}

/**
 * Confirmação para apagar registro
 * @param {string} text 
 * @param {string} confirmButtonText 
 * @returns 
 */
export const confirmDelete = (
  text = 'Este processo é irreversível!',
  confirmButtonText = 'Sim, eu quero!'
) =>  {
  return Swal.fire({
    title: 'Deseja apagar registro?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: 'NÃO, EU NÃO QUERO!',
    customClass: {
      confirmButton: 'btn btn-success btn-fill mx-1',
      cancelButton: 'btn btn-danger btn-fill mx-1',
    },
    buttonsStyling: false,
  })
}

/**
 * Confirmação para prosseguir
 * @param {string} title 
 * @param {string} text 
 * @param {string} confirmButtonText 
 * @returns 
 */
 export const confirm = (
  title = '',
  text = 'Deseja prosseguir?',
  confirmButtonText = 'Sim, eu quero!'
) =>  {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: 'NÃO, EU NÃO QUERO!',
    customClass: {
      confirmButton: 'btn btn-success btn-fill mx-1',
      cancelButton: 'btn btn-danger btn-fill mx-1',
    },
    buttonsStyling: false,
  })
}