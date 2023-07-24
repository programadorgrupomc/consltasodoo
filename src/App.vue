<template>
  <div class="cont-head">
    <div class="cont-logo">
      <router-link to="/" custom v-slot="{ navigate }">
        <img class="logo-img" src="./assets/logomc.png" alt="LogoMc" @click="navigate" role="link"/>
      </router-link>
      <router-link to="/" custom v-slot="{ navigate }">
        <button id="iconbtn" @click="navigate" role="link">
          <img id="icono" src="./assets/chevron-left.svg" alt="" />
        </button>
      </router-link>
    </div>
    <div class="cont-body">
      <router-link to="/"></router-link>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-right: 20px;
}
::-webkit-scrollbar {display: none;}
.logo-img {
  top: 79px;
  left: 81px;
  width: 255px;
  height: 108px;
  display: flex;
  align-content: flex-start;
  padding: 0px 30px 0px;
  margin: 50px 60px 80px;
  object-fit: contain;
}
.dis-img {
  top: 689px;
  left: 1058px;
  width: 757px;
  height: 1265px;
}

.cont-head {
  height: 1500px;
  background-image: url(./assets/diseñomc.png);
  background-size: 40%;
  background-position-x: right;
  background-position-y: 500px;
  background-repeat: no-repeat;
}
.cont-logo {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: space-between;
  height: 160px;
  align-items: center;
  margin: 30px 0px 0px 0px;
}

#icono {
  width: 25px;
  opacity: 50%;
}
#iconbtn {
  border: none;
  background-color: white;
  margin: 65px 80px 65px 0px;
  height: fit-content;
  width: fit-content;
}
#iconbtn:hover {
  background-color: #2c3e5053;
  border-radius: 5px;
}
</style>
