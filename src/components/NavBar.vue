<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ title }}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cadastros
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link :to="{name: 'product.list'}"><a class="dropdown-item">Produtos</a></router-link></li>
            </ul>
          </li>         
          <li class="nav-item">
            <router-link :to="{name: 'user.list'}"><a class="nav-link" aria-current="page" href="#">Login</a></router-link>
          </li>
        </ul>        
      </div>
    </div>
  </nav>  
</template>

<script>
export default {
  name: "NavBar",
  props: [
    "src_logo", 
    "alt",
    "title"
  ],
}
</script>

<style>
li a {
  text-decoration: none
}
</style>
