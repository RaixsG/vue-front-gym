<script setup>
import axios from 'axios';
import { useMessage } from 'naive-ui'; // Para las alertas
import { ref, onMounted, h } from "vue"; // Reactivity to Vue
import {
    NButton,
    NForm,
    NFormItem,
    NInput,
    NCard,
    NGrid,
    NGi,
    NDataTable,
    NSelect,
} from 'naive-ui'; // Componentes de Naive UI

// Mensajes de alertas
const message = useMessage();

// Valores para el formulario y limpiarlo
const formValueDefault = ref({
    nombres: null,
    apellidos: null,
    dni: null,
    celular: null,
    turno: null,
    sueldo: null,
});
const formValue = ref({ ...formValueDefault.value });

// Cargar datos para dropdown
const turno = ref([
    { label: 'Seleccione un turno', value: null, disabled: true },
    { label: 'Mañana', value: 'M' },
    { label: 'Tarde', value: 'T' },
    { label: 'Noche', value: 'N' },
]);

// Obtener datos del backend
const data = ref([]);
const getDatosClientes = () => {
    const url = 'http://localhost:8000/api/vista/empleados/'
    axios
        .get(url)
        .then((response) => {
            data.value = response.data;
            message.success('Datos cargados correctamente');
        })
        .catch(function (error) {
            message.error('Error al cargar los datos de los clientes')
            console.log(error);
        });
}
// Enviar datos al backend
const submitForm = () => {
    const url = 'http://localhost:8000/api/vista/empleados/'
    axios
        .post(url,
            {
                ...formValue.value
            }
        )
        .then((response) => {
            message.success('Cliente creado correctamente')
            getDatosClientes();
            formValue.value = { ...formValueDefault.value };
        })
        .catch(function (error) {
            message.error('Error al crear el cliente')
            console.log(error);
        });
}
// Editar datos de empleado
const editEmpleado = () => {
    const url = `http://localhost:8000/api/vista/empleados/${formValue.value.id}/`
    axios
        .put(url,
            {
                ...formValue.value
            }
        )
        .then((response) => {
            message.success('Empleado editado correctamente')
            getDatosClientes();
            formValue.value = { ...formValueDefault.value };
        })
        .catch(function (error) {
            message.error('Error al editar el empleado')
            console.log(error);
        });
}
// Eliminar empleado
const deleteEmpleado = (id) => {
    const url = `http://localhost:8000/api/vista/empleados/${id}/`
    axios
        .delete(url)
        .then((response) => {
            message.success('Empleado eliminado correctamente')
            getDatosClientes();
        })
        .catch(function (error) {
            message.error('Error al eliminar el empleado')
            console.log(error);
        });
}

onMounted(() => {
    getDatosClientes();
});
</script>
<template>
    <div class="container">
        <n-card title="Sección Empleados">
            <n-form label-placement="left">
                <n-grid x-gap="10" :cols="2">
                    <n-gi>
                        <n-form-item>
                            <n-input placeholder="Nombre" v-model:value="formValue.nombres" />
                        </n-form-item>
                        <n-form-item>
                            <n-input placeholder="Apellido" v-model:value="formValue.apellidos" />
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
                            <n-select :options="turno" v-model:value="formValue.turno" />
                        </n-form-item>
                        <n-form-item>
                            <n-input placeholder="Sueldo a Pagar" v-model:value="formValue.sueldo" />
                        </n-form-item>
                    </n-gi>
                </n-grid>
            </n-form>
            <n-grid :cols="2">
                <n-gi v-if="formValue.id">
                    <n-button type="primary" @click="editEmpleado">Modificar</n-button>
                    <n-button type="error" @click="">Cancelar</n-button>
                </n-gi>
                <n-gi v-else>
                    <n-button type="primary" @click="submitForm">Crear</n-button>
                </n-gi>
            </n-grid>
        </n-card>
        <n-data-table :columns="[
            { title: 'Nombre', key: 'nombres' },
            { title: 'Apellido', key: 'apellidos' },
            { title: 'DNI', key: 'dni' },
            { title: 'Celular', key: 'celular' },
            { title: 'Turno Asignado', key: 'turno' },
            { title: 'Sueldo', key: 'sueldo' },
            {
                title: 'Action', key: 'actions', render(row) {
                    const { id, nombres } = row;
                    return [
                        h(
                            NButton,
                            {
                                strong: true,
                                tertiary: true,
                                size: 'small',
                                onClick: () => {
                                    message.info('Empleado seleccionado: ' + nombres);
                                    formValue = { ...row };
                                }
                            },
                            { default: () => 'Editar' }
                        ),
                        h(
                            NButton,
                            {
                                strong: true,
                                tertiary: true,
                                size: 'small',
                                onClick: () => { deleteEmpleado(id) }
                            },
                            { default: () => 'Eliminar' }
                        )]
                }
            },
        ]" :data="data" />
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