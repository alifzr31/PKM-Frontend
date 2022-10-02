<template>
    <h1>List Data HP</h1>
    <hr>
    <div>
        <nav>
            <div>
                <a href="/">Beranda</a>
            </div>
            <div>
                <a href="/hp">Data Handphone</a>
            </div>
            <div>
                <a href="/review">Review</a>
            </div>
        </nav>
    </div>

    <div>
        <br/>
        <router-link :to="{ name: 'hp.create' }">Tambah HP</router-link>
        <table border="1">
            <thead>
                <tr>
                    <th>Merk</th>
                    <th>Model</th>
                    <th>Opsi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(hp, index) in hps" :key="index">
                    <td>{{ hp.merk }}</td>
                    <td>{{ hp.model }}</td>
                    <td>
                        <!-- <router-link :to="{ name: 'hp.edit', params:{id: hp,id}}">Edit</router-link> -->
                        <router-link :to="{ name : 'hp.edit', params:{id: hp.id} }" class="btn btn-success">Edit</router-link>
                        <button class="btn btn-danger">Hapus</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    setup() {
        let hps = ref([])
        onMounted(() => {
            axios.get('http://localhost:8000/api/hp')
            .then(response => {
                hps.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        return {
            hps
        }
    }
}
</script>