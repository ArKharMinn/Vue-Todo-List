<template>
  <div class="">
    <div class="flex items-center relative justify-center h-screen">
      <div
        v-if="showBox"
        class="absolute bg-black bg-opacity-50 flex items-center justify-center p-5 w-full h-full"
      >
        <div class="bg-white p-5 w-1/4">
          <div class="flex justify-end items-center">
            <button
              @click="closeBtn()"
              class="bg-red-500 hover:bg-red-400 rounded px-3 py-1 text-white"
            >
              x
            </button>
          </div>
          <div v-if="show">
            <div class="my-4 text-lg">Update Todo-list</div>
            <div>
              <input
                type="text"
                v-model="task"
                placeholder="Enter here...."
                class="w-full rounded p-2 my-3 border"
              />
            </div>
            <button
              @click="updateHandlingBtn(show)"
              class="text-white rounded bg-yellow-600 hover:bg-yellow-400 w-full p-2"
            >
              update
            </button>
          </div>
          <div v-else>
            <div class="my-4 text-lg">Create Todo-list</div>
            <div>
              <input
                type="text"
                v-model="task"
                placeholder="Enter here...."
                class="w-full rounded p-2 my-3 border"
              />
            </div>
            <button
              @click="createBtn()"
              class="text-white rounded bg-yellow-600 hover:bg-yellow-400 w-full p-2"
            >
              create
            </button>
          </div>
        </div>
      </div>
      <div class="w-1/3 shadow-lg bg-white p-5 rounded-md">
        <div class="">
          <div class="flex justify-end">
            <button @click="addBtn()" class="bg-violet-500 text-white px-8 py-2 rounded">
              Add
            </button>
          </div>
          <div class="text-center text-xl font-bold my-3">Todo-List</div>
          <ul class="">
            <li v-for="list in list" :key="list.id" class="flex justify-between p-2 border">
              <span class="">{{ list.name }}</span>
              <div class="flex gap-2">
                <button
                  @click="deleteBtn(list.id)"
                  class="text-red-500 underline hover:text-red-400"
                >
                  Delete
                </button>
                <button
                  @click="updateBtn(list.id)"
                  class="text-blue-500 underline hover:text-blue-400"
                >
                  Update
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      task: '',
      show: '',
      showBox: false,
    }
  },
  methods: {
    async fetchList() {
      const res = await axios.get('http://localhost:5000/api/list')
      this.list = res.data
    },
    async updateBtn(id) {
      const res = await axios.post('http://localhost:5000/api/update-list', { id })
      this.task = res.data.name
      this.show = id
      this.showBox = true
    },
    closeBtn() {
      this.showBox = false
    },
    async deleteBtn(id) {
      const res = await axios.post('http://localhost:5000/api/delete', { id })
      this.list = res.data
    },
    async updateHandlingBtn(id) {
      const res = await axios.post('http://localhost:5000/api/update', {
        id: id,
        name: this.task,
      })

      this.list = res.data
      this.showBox = false
      this.task = ''
      this.show = ''
    },
    addBtn() {
      this.showBox = true
      this.task = ''
      this.show = ''
    },
    async createBtn() {
      if (this.task !== '') {
        const res = await axios.post('http://localhost:5000/api/create', { name: this.task })
        this.list = res.data
        this.task = ''
        this.showBox = false
      }
    },
  },
  mounted() {
    this.fetchList()
  },
}
</script>

<style></style>
