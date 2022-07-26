<template>
  <div class="container p-0">
    <div class="row">
      <div class="col-md-12">
        <!-- INICIO DO card -->
        <div class="card">
          <div class="card-header p-2">
            <h4>
              Novo Produto
              <a @click="$router.back()" class="btn btn-danger float-end">
                <fa icon="rotate-left" class="mx-1"></fa>
                Voltar
              </a>
            </h4>
            <div class="card-body p-2">
              <!-- INICIO DO form -->
              <form>
                <!-- INICIO DO CAMPO name -->
                <div class="form-group mb-3">
                  <label>* Nome</label>
                  <input
                    v-model="v$.product.name.$model"
                    type="text"
                    class="form-control"
                    ref="name"
                  />
                  <div
                    v-if="v$.product.name.$errors.length"
                    class="alert alert-danger d-flex align-items-center mt-2"
                    role="alert"
                  >
                    <div>* Campo obrigatório!</div>
                  </div>
                </div>
                <!-- FIM DO CAMPO name -->

                <!-- INICIO DO CAMPO sku -->
                <div class="form-group mb-3">
                  <label>* Código de Referência</label>
                  <input
                    v-model="v$.product.sku.$model"
                    type="text"
                    class="form-control"
                    ref="sku"
                  />
                  <div
                    v-if="v$.product.sku.$errors.length"
                    class="alert alert-danger d-flex align-items-center mt-2"
                    role="alert"
                  >
                    <div>* Campo obrigatório!</div>
                  </div>
                </div>
                <!-- FIM DO CAMPO sku -->

                <!-- INICIO DO CAMPO price -->
                <div class="form-group mb-3">
                  <label>Preço</label>
                  <input
                    v-model="product.price"
                    @blur="product.price = $helper.util.formatNumber($event.target.value)"
                    @keypress="$helper.util.keyPressJustDecimal($event)"
                    type="text"
                    class="form-control"
                  />                  
                </div>
                <!-- FIM DO CAMPO price -->

                <!-- INICIO DO CAMPO description -->
                <div class="form-group mb-3">
                  <label>Descrição do Produto</label>
                  <textarea v-model="product.description" type="text" class="form-control" rows="2" />
                </div>
                <!-- FIM DO CAMPO description -->

                <!-- SUBMIT BUTTON -->
                <div class="form-group mb-3">
                  <button :disabled="v$.product.$invalid" @click.prevent="submitAndClose()" class="btn btn-primary">
                    <div v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></div>
                    <fa v-else icon="floppy-disk" class="mx-1"></fa>
                    Salvar                    
                  </button>
                </div>
              </form>
              <!-- FIM DO form -->
            </div>
          </div>
        </div>
        <!-- FIM DO card -->
      </div>
    </div>
  </div>
</template>

<script src="./ProductCreate.js"></script>
<style src="./ProductCreate.css" scoped></style>
