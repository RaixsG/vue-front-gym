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
    NDatePicker,
    NDataTable,
} from 'naive-ui';
// Reactivity to Vue
import { ref } from "vue";
import { onMounted } from 'vue';

const formValue = ref({
    nombre: null,
    apellido: null,
    dni: null,
    celular: null,
    fechaFinalizacion: null,
    mensualidad: null,
});
const submitForm = () => {
    const url = 'http://localhost:8000/api/vista/clientes/'
    axios
        .post(url,
            {
                nombres: formValue.value.nombre,
                apellidos: formValue.value.apellido,
                dni: formValue.value.dni,
                celular: formValue.value.celular,
                fecha_final: formValue.value.fechaFinalizacion,
                mensualidad: formValue.value.mensualidad,
            }
        )
        .then((response)=> {
            message.success('Cliente creado correctamente')
            console.log(response);
        })
        .catch(function (error) {
            message.error('Error al crear el cliente')
            console.log(error);
        });
    console.log(formValue.value);
}

const data = ref([]);

const message = useMessage();

const alertLoad = () => {
    message.success('Datos cargados correctamente')
}

const getDatosClientes = () => {
    const url = 'http://localhost:8000/api/vista/clientes/'
    axios
        .get(url)
        .then((response)=> {
            data.value = response.data.map((item) => {
                return {
                    nombres: item.nombres,
                    apellidos: item.apellidos,
                    dni: item.dni,
                    celular: item.celular,
                    fechaFinalizacion: item.fecha_final,
                    mensualidad: item.mensualidad,
                }
            });
            alertLoad();
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
        <n-card title="Sección Clientes">
            <n-form label-placement="left">
                <n-grid x-gap="10" :cols="2">
                    <n-gi>
                        <n-form-item>
                            <n-input placeholder="Nombre" v-model:value="formValue.nombre" />
                        </n-form-item>
                        <n-form-item>
                            <n-input placeholder="Apellido" v-model:value="formValue.apellido" />
                        </n-form-item>
                        <n-form-item>
                            <n-input placeholder="DNI" v-model:value="formValue.dni" />
                        </n-form-item>
                    </n-gi>
                    <n-gi>
                        <n-form-item>
                            <n-input placeholder="Número de Celular" v-model:value="formValue.celular" />
                        </n-form-item>
                        <n-form-item>
                            <n-date-picker type="date" v-model:formatted-value="formValue.fechaFinalizacion" />
                        </n-form-item>
                        <n-form-item>
                            <n-input placeholder="Pago de Mensualdiad" v-model:value="formValue.mensualidad" />
                        </n-form-item>
                    </n-gi>
                </n-grid>
            </n-form>
            <n-grid :cols="2">
                <n-gi>
                    <NButton type="primary" @click="submitForm">Crear</NButton>
                </n-gi>
                <n-gi>
                    <NButton type="info" @click="getDatosClientes">Recargar Datos Clientes</NButton>
                </n-gi>
            </n-grid>
        </n-card>
        <n-data-table :columns="[
            { title: 'Nombre', key: 'nombres' },
            { title: 'Apellido', key: 'apellidos' },
            { title: 'DNI', key: 'dni' },
            { title: 'Celular', key: 'celular' },
            { title: 'Fecha de Finalización', key: 'fechaFinalizacion' },
            { title: 'Mensualidad', key: 'mensualidad' },
        ]"
        :data="data"
        >
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