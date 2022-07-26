<template>
  <div class="container p-0">
    <div class="row">
      <div class="col-md-12">
        <!-- INICIO DO card -->
        <div class="card">
          <div class="card-header">
            <h4>
              Produtos
              <button @click="openProductCreateRoute()" class="btn btn-success float-end">
                <fa icon="circle-plus" class="mx-1"></fa>
                Incluir
              </button>
            </h4>
          </div>

          <!-- SIMULAÇÃO DE SKELETON -->
          <div v-if="isLoading" class="text-center m-5">
            <div class="spinner-border text-info" role="status"></div>
            <h4 class="text-info">Carregando...</h4>
          </div>

          <div class="card m-1" v-if="!isLoading">
            <div class="card-header">
              <h5>Filtros</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-10 col-lg-11 mb-2">
                  <input
                    v-model="filterConfig.customSearch"
                    @keyup.enter="getProductList(true)"
                    type="text"
                    class="form-control"
                    placeholder="Pesquise por ID, Nome, Descrição ou Referência"
                  />
                </div>
                <div class="col-md-2 col-lg-1 mb-2">
                  <button @click="getProductList(true)" class="btn btn-button btn-primary float-end">Pesquisar</button>
                </div>
              </div>
            </div>

            <div class="card-body">
              <!-- INICIO DA table -->
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th class="col-sm-1 col-lg-1">ID</th>
                    <th class="col-sm-8 col-lg-9">Nome</th>
                    <th class="col-sm-3 col-lg-2 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="currentProduct in s_productList.result" :key="currentProduct.id">
                    <td>{{ currentProduct.id }}</td>
                    <td>{{ currentProduct.name }}</td>
                    <td class="text-center">
                      <div class="row"></div>
                      <a @click="openProductEditRoute(currentProduct.id)" class="btn btn-button btn btn-outline-primary btn-sm mx-1">
                        <fa icon="pen"></fa>
                      </a>
                      <a @click="destroyProduct(currentProduct.id)" class="btn btn-button btn btn-outline-danger btn-sm mx-1">
                        <fa icon="trash-can"></fa>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- FIM DA table -->
            </div>

            <!-- INICIO DA paginação -->
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <!-- Primeira página -->
                <li :class="s_productList.meta.page_navigation.first ? 'page-item' : 'page-item disabled'" >
                  <a class="page-link" @click="changePage('first')"><fa icon="angles-left" class="mx-1"></fa></a>
                </li>
                <!-- Página Anterior -->
                <li :class="s_productList.meta.page_navigation.prior ? 'page-item' : 'page-item disabled'" >
                  <a class="page-link" @click="changePage('prior')">Anterior</a>
                </li>
                <!-- Página Atual -->
                <li class="page-item disabled">
                  <a class="page-link" href="#">{{ s_productList.meta.current_page }}</a>
                </li>
                <!-- Próxima página -->
                <li :class="s_productList.meta.page_navigation.next ? 'page-item' : 'page-item disabled'" >
                  <a class="page-link" @click="changePage('next')">Próxima</a>
                </li>
                <!-- Última página -->
                <li :class="s_productList.meta.page_navigation.last ? 'page-item' : 'page-item disabled'" >
                  <a class="page-link" @click="changePage('last')"><fa icon="angles-right" class="mx-1"></fa></a>
                </li>
              </ul>
            </nav>
            <!-- FIM DA paginação -->
          </div>
          <!-- FIM DO card -->
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./UserList.js"></script>
<style src="./UserList.css" scoped></style>
