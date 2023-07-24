<template>
  <br />
  <br />
  <div class="PageUno">
    <h1>SELECCIONE UNA OPCIÓN</h1>
    <br />
    <br />
    <br />
    <div class="botones">
      <form action="">
      <router-link to="/page2" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          ref="btnindividual"
          role="link"
          class="btn btn-info"
          id="btnrouter"
        >
          Individual
        </button>
      </router-link>
      <router-link to="/page3" custom v-slot="{ navigate }">
        <button
          @click="navigate"
          ref="btnempresa"
          role="link"
          class="btn btn-info"
          id="btnrouter"
        >
          Empresa
        </button>
      </router-link>  
    </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "PageUno",
  components: {},
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
  justify-content: center;
  display: flex;
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



</style>
