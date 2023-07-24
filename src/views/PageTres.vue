<template>
  <br />
  <br />
  <div class="PageUno">
    <h4>SELECCIONE EL TIPO DE CONTACTO EMPRESA</h4>
    <br />
    <br />
    <br />

    <div class="botones">
      <form action="">
      <router-link to="/customer" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          ref="cliente"
          role="link"
          class="btn btn-info"
          id="btnrouter"
        >
          Cliente
        </button>
      </router-link>
      <router-link to="/customerpro" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          ref="proveedor"
          role="link"
          class="btn btn-info"
          id="btnrouter"
        >
          Proveedor
        </button>
      </router-link>
      <router-view />
    </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  name: "PageTres",
  components: {},
  methods: {},
};
</script>

<style scoped>
h1 {
  color: #3c388e;
  font: normal medium;
  opacity: 1;
  font-weight: bold;
}
.botones {
  display: flex;
  justify-content: center;
}
button {
  background-color: rgb(216, 213, 232);
  height: 50px;
  width: 350px;
  margin: 30px 60px;
  border-radius: 15px;
  border-color: rgb(173, 167, 204);
  color: #3c388e;
  font-weight: bold;
}

#btnrouter:hover {
  border-color: rgb(173, 167, 204);
  background-color: #a6a0c9;
}

h4 {
  color: #3c388e;
  font: normal medium;
  opacity: 1;
  font-weight: bold;
}
</style>
