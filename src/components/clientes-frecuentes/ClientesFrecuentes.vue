<script setup>
import axios from 'axios';
// ...
import { useMessage } from 'naive-ui';

// Componentes de Naive UI
import {
    NButton,
    NForm,
    NFormItem,
    NInput,
    NCard,
    NGrid,
    NGi,
    NDataTable,
} from 'naive-ui';
// Reactivity to Vue
import { ref } from "vue";
import { onMounted } from 'vue';

const formValue = ref({
    nombre: null,
    celular: null,
    fechaIngresada: null,
    pago: null,
});
const submitForm = () => {
    const url = 'http://localhost:8000/api/vista/frecuente/crear/'
    axios
        .post(url,
            {
                nombres: formValue.value.nombre,
                celular: formValue.value.celular,
                pago: formValue.value.pago
            }
        )
        .then((response)=> {
            message.success('Cliente creado correctamente');
            getDatosClientes();
        })
        .catch(function (error) {
            message.error('Error al crear el cliente');
            console.log(error);
        });
}

const data = ref([]);

const message = useMessage();

const alertLoad = () => {
    message.success('Datos cargados correctamente')
}

const getDatosClientes = () => {
    const url = 'http://localhost:8000/api/vista/frecuente/lista/'
    axios
        .get(url)
        .then((response) => {
            data.value = response.data.map((item) => {
                return {
                    nombres: item.nombres,
                    celular: item.celular,
                    fechaIngresada: item.fecha_ingresada,
                    pago: item.pago
                }
            });
            alertLoad();
            console.log(response.data);
        })
        .catch(function (error) {
            message.error('Error al cargar los datos de los clientes')
            console.log(error);
        });
}

onMounted(() => {
    getDatosClientes();
})

</script>
<template>
    <div class="container">
        <n-card title="Sección Clientes Diarios">
            <n-form label-placement="left">
                <n-grid x-gap="10" :cols="2">
                    <n-gi>
                        <n-form-item>
                            <n-input placeholder="Nombre" v-model:value="formValue.nombre" />
                        </n-form-item>
                        <n-form-item>
                            <n-input placeholder="Número de Celular" v-model:value="formValue.celular" />
                        </n-form-item>
                    </n-gi>
                    <n-gi>
                        <n-form-item>
                            <n-input placeholder="Pago Diarío" v-model:value="formValue.pago" />
                        </n-form-item>
                    </n-gi>
                </n-grid>
            </n-form>
            <NButton type="primary" @click="submitForm">Crear</NButton>
        </n-card>
        <n-data-table :columns="[
            { title: 'Nombre', key: 'nombres' },
            { title: 'Celular', key: 'celular' },
            { title: 'Fecha Ingresada', key: 'frechaIngresada' },
            { title: 'Pago', key: 'pago' }
        ]" :data="data">
        </n-data-table>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.n-card {
    font-weight: bold;
    margin: 20px 0;
    width: 75%;
}
</style>