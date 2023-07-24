<template>
  <div class="container">
    <h4>CONSULTAR CONTACTO INDIVIDUAL TIPO CLIENTE</h4>
    <form>
      <div class="container-shop">
        <!-- Button trigger modal -->
        <button
          type="button"
          ref="btncarrito"
          class="btn btn-outline-info"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {{ personascount }}
          <img src="../assets/iconcar.svg" alt="" id="icon" />
        </button>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Lista de Contactos: ({{ personascount }})
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  id="cotainer-contact"
                  v-for="(item, index) in Personas"
                  :key="index"
                >
                  <p>Nombre: {{ item.name }}</p>
                  <button
                    class="btn btn-outline-danger"
                    id="btn-clean"
                    @click="eliminarObjeto(index)"
                    type="button"
                  >
                    <img src="../assets/clean.svg" alt="" />
                  </button>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  <img src="../assets/close.svg" alt="" />
                </button>
                <button
                  v-if="this.Personas.length"
                  type="button"
                  class="btn btn-outline-primary"
                  v-on:click="callbtnresumen"
                  id="btnex"
                >
                  <img src="../assets/save.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div class="label">
          <label class="form-label">Dni:</label>
        </div>
        <input
          type="number"
          class="form-control"
          id="dni"
          maxlength="8"
          @input="handleInput"
        />
        <p id="advertencia" hidden>
          *Debe Ingresar por lo menos 8 digitos para realizar la busqueda...*
        </p>
      </div>

      <div v-if="intspiner"  class="cargaspiner">
        <br />
        <br />
        <br />
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="mb-3">
        <div class="label">
          <label id="label1" class="form-label" hidden>Nombres:</label>
        </div>
        <input
          v-model="nombres"
          type="text"
          class="form-control"
          id="nombres"
          disabled
          hidden
        />
      </div>
      <div class="mb-3">
        <div class="label">
          <label id="label2" class="form-label" hidden>Apellido Paterno:</label>
        </div>
        <input
          v-model="appaterno"
          type="text"
          class="form-control"
          id="appaterno"
          disabled
          hidden
        />
      </div>
      <div class="mb-3">
        <div class="label">
          <label id="label3" class="form-label" hidden>Apellido Materno:</label>
        </div>
        <input
          v-model="apmaterno"
          type="text"
          class="form-control"
          id="apmaterno"
          disabled
          hidden
        />
      </div>
      <router-link to="/" custom v-slot="{ navigate }">
        <button
          id="btnnavind"
          @click="navigate"
          role="link"
          
        >
        <img id="icohome" src="../assets/iconhome.svg" alt="home">
        </button>
      </router-link>
      <button v-on:click="Limpiar" type="button" id="clean" hidden>
        Limpiar
      </button>
      <button v-on:click="Agregar" type="button" id="agr" hidden>
        Agregar
      </button>

      <!-- Button trigger modal -->
      <button
        v-if="this.Personas.length"
        type="button"
        ref="btnresumen"
        id="btform"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Exportar
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Confirmar Descarga:
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Dni</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in Personas" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.vat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>

              <button
                type="button"
                @click="callbtncarrito"
                class="btn btn-outline-warning"
                data-bs-dismiss="modal"
                id="btn-editar"
              >
                Editar
              </button>

              <button
                type="button"
                class="btn btn-outline-success"
                v-on:click="exportToExcel"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
//function solicitud al api
function consultarDNI(dni) {
  const url = `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJlcm51aWplc3VzMzYzQGdtYWlsLmNvbSJ9.VxWlJpfwF3s-bsk2S9-dYWkX8_RmadNiXfK11-nUgFM`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data); //solo para probar
      return data;
    })
    .catch((error) => {
      console.log("Hubo un error al consultar el DNI:", error);
    });
}

function Habilitar() {
  const nomhab = document.getElementById("nombres");
  const appahab = document.getElementById("appaterno");
  const apmahab = document.getElementById("apmaterno");

  nomhab.removeAttribute("hidden");
  appahab.removeAttribute("hidden");
  apmahab.removeAttribute("hidden");

  const lbl1 = document.getElementById("label1");
  const lbl2 = document.getElementById("label2");
  const lbl3 = document.getElementById("label3");

  lbl1.removeAttribute("hidden");
  lbl2.removeAttribute("hidden");
  lbl3.removeAttribute("hidden");
}

function desHabilitar() {
  const nomhab = document.getElementById("nombres");
  const appahab = document.getElementById("appaterno");
  const apmahab = document.getElementById("apmaterno");
  nomhab.setAttribute("hidden", "true");
  appahab.setAttribute("hidden", "true");
  apmahab.setAttribute("hidden", "true");
  const lbl1 = document.getElementById("label1");
  const lbl2 = document.getElementById("label2");
  const lbl3 = document.getElementById("label3");
  lbl1.setAttribute("hidden", "true");
  lbl2.setAttribute("hidden", "true");
  lbl3.setAttribute("hidden", "true");
}

function habagr() {
  const bntagr = document.getElementById("agr");
  bntagr.removeAttribute("hidden");
}

function deshabagr() {
  const bntagr = document.getElementById("agr");
  bntagr.setAttribute("hidden", "true");
}

function habclean() {
  const bnthab = document.getElementById("clean");
  bnthab.removeAttribute("hidden");
}

function desclean() {
  const bnthab = document.getElementById("clean");
  bnthab.setAttribute("hidden", "true");
}

function Habilitaradvert() {
  const advert = document.getElementById("advertencia");
  advert.removeAttribute("hidden");
}
function desHabilitaradvert() {
  const advert = document.getElementById("advertencia");
  advert.setAttribute("hidden", "true");
}
/*function desexp() {
  const bntagr = document.getElementById("btnex");
  bntagr.setAttribute("hidden", "true");
}*/

export default {
  data() {
    return {
      Personas: [],
      personascount: 0,
      intspiner: false,
    };
  },
  watch: {
    Personas: {
      handler: function () {
        this.personascount = this.Personas.length;
      },
      deep: true,
    },
  },
  methods: {
    handleInput(event) {
      var dnibus = event.target.value;
      if (dnibus.length < 8) {
        Habilitaradvert();
      } else if (dnibus.length === 8) {
        desHabilitaradvert();
        this.intspiner = true;
        consultarDNI(dnibus).then((data) => {
          setTimeout(() => {
            if (data.success == false) {
              alert("Dni no encontrado o Dni Invalido 'Intente Nuevamente'");
              this.Limpiar();
            } else {
              Habilitar();
              document.getElementById("dni").value = `${data.dni}`;
              document.getElementById("nombres").value = `${data.nombres}`;
              document.getElementById(
                "appaterno"
              ).value = `${data.apellidoPaterno}`;
              document.getElementById(
                "apmaterno"
              ).value = `${data.apellidoMaterno}`;
              habagr();
              habclean();
            }
          }, 100);
          this.intspiner = false;
        });
      }
    },
    Limpiar() {
      document.getElementById("dni").value = ``;
      document.getElementById("nombres").value = ``;
      document.getElementById("appaterno").value = ``;
      document.getElementById("apmaterno").value = ``;

      deshabagr();
      desHabilitar();
      desclean();
    },
    Agregar() {
      const Dni = document.getElementById("dni").value;
      const nom = document.getElementById("nombres").value;
      const appa = document.getElementById("appaterno").value;
      const apma = document.getElementById("apmaterno").value;
      const nombrusu = `${nom} ${appa} ${apma}`;

      var mycontact = {
        name: nombrusu,
        vat: Dni,
        Is_a_company: 0,
        Street: "",
      };
      this.Personas.push(mycontact);

      deshabagr();
      this.Limpiar();
      desHabilitar();
      desclean();
    },
    eliminarObjeto(index) {
      this.Personas.splice(index, 1);
    },
    callbtncarrito() {
      this.$refs.btncarrito.click();
    },
    callbtnresumen() {
      this.$refs.btnresumen.click();
    },
    exportToExcel() {
      const XLSX = require("xlsx");
      const dataalm = this.Personas;

      // crea un nuevo objeto `Date`
      var today = new Date();

      // obtener la fecha y la hora
      var now = today.toLocaleString();

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(dataalm);
      XLSX.utils.book_append_sheet(wb, ws, "Lista Nueva");

      XLSX.writeFile(wb, `Contactos-Clientes-Individuales${now}.xlsx`);
      alert(`Lista De Contactos Guardada`);
      location.reload();
    },
  },
};
</script>
<style scoped>
label {
  color: #3c388e;
  font-weight: bold;
  margin: 0px 20px;
}
.label {
  display: flex;
}
input {
  border-color: #a6a0c9;
  margin: 10px 0px;
  background-color: white;
  border-radius: 15px;
}

.form-control:disabled {
  background-color: #ffffff;
}
.container {
  max-width: 1140px;
}
.container-shop {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
}
#cotainer-contact {
  display: flex;
  padding: 5px;
  justify-content: space-between;
  border-radius: 5px;
}
#cotainer-contact:hover {
  background-color: #dee2e6;
}

#btnnavind,
#agr,
#clean,
#btform {
  background-color: rgb(216, 213, 232);
  height: 35px;
  width: 200px;
  margin: 30px 50px;
  border-radius: 15px;
  border-color: rgb(173, 167, 204);
  color: #3c388e;
  font-weight: bold;
}
#clean:hover {
  background-color: #a6a0c9e3;
}
#btnnavind:hover {
  background-color: #a6a0c9e3;
}
#agr:hover {
  background-color: #a6a0c9e3;
}
#btform:hover {
  background-color: #a6a0c9e3;
}
#advertencia {
  font-size: small;
  color: rgba(255, 0, 0, 0.639);
  text-shadow: 0.1em 0.1em 0.2em rgba(202, 0, 0, 0.683);
}
#icohome{
  width: 20px;
  vertical-align: middle;
}
#icohome:hover{
  width: 25px;
}
#btn-editar{
  color: black;
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #8179b7;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
  opacity: 50%;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
  opacity: 60%;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
  opacity: 70%;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
  opacity: 80%;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
  opacity: 90%;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

h4 {
  color: #3c388e;
  font: normal medium;
  opacity: 1;
  font-weight: bold;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
input[type=number] { -moz-appearance:textfield; }
</style>
