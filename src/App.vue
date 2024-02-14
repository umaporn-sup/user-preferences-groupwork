<script setup>
import { ref, computed, watch } from 'vue'
import SortIcon from './components/icons/Sort.vue'
import SearchIcon from './components/icons/SearchIcon.vue'
import groups from '../data/groups.json'
import {
  sortBySection,
  getLastPage,
  getRowsInPage,
  searchByKeyword
} from './libs/utilities.js'
const newGroup = ref({
  section: '',
  groupName: '',
  repo: '',
  members: []
})

const numOfMembers = ref(0)
const saveNewGroup = () => {
  console.log(newGroup.value)
}

const addNewMember = () => {
  newGroup.value.members = []
  for (let index = 0; index < numOfMembers.value; index++) {
    newGroup.value.members.push({
      projectCo: false,
      studentId: '',
      studentName: ''
    })
  }
}
const addingMode = ref(false)
//paginate
const workGroups = ref(getRowsInPage(groups, 10, 1))
const currentPage = ref(1)
const getRows = (n) => {
  currentPage.value = n
  workGroups.value = getRowsInPage(groups, rowsPerPage.value, n)
}
const searchWords = ref('')

const filteredGroups = computed(() => {
  return searchByKeyword(workGroups.value, searchWords.value)
})

const rowsPerPage = ref(10)
watch(rowsPerPage, (newValue, oldValue) => {
  // console.log(`new rows per page: ${newValue}`)
  // console.log(`old rows per page: ${oldValue}`)
  getRows(1)
})
const preferFontSize = ref(12)
const isPlaying = ref(false)
const player = ref('')
const setMusic = () => {
  console.log(player) //
  console.log(player.value) //<audio>
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) player.value.play()
  else player.value.pause()
}
const doSomething = ref('')
const getDoSomething = () => {
  console.log(`text in textbox`) //input text value
}
</script>

<template>
  <div class="w-full preferFontSize">
    Type Something
    <input
      type="text"
      ref="doSomething"
      class="border border-gray-300"
      @input="getDoSomething"
    />
    <header>
      <section
        class="flex items-center p-2 bg-gradient-to-r from-violet-500 to-fuchsia-500"
      >
        <img src="./assets/vue-icon.png" class="h-14" />
        <div>
          <h1 class="text-white text-4xl">Creative Projects</h1>
          <h2 class="italic text-indigo-200 text-xl">Play and Learn</h2>
        </div>
      </section>
    </header>
    <main class="p-3">
      <section class="flex justify-between">
        <p
          @click="addingMode = true"
          class="italic text-blue-500 hover:text-purple-500 cursor-pointer"
        >
          Add New GroupWork
        </p>
        <!-- 4. Searching -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-end">
            <audio control class="hidden" ref="player">
              <source src="./assets/music/sample.mp3" />
            </audio>
            Music:
            <input type="checkbox" class="toggle toggle-xs" @click="setMusic" />
          </div>
          <div class="flex justify-end">
            Font Size:
            <input
              type="number"
              min="10"
              max="30"
              value="10"
              class="border border-gray-300 outline-none"
              v-model="preferFontSize"
            />
          </div>
          <div>
            <p>
              Number of rows/page
              <input
                type="number"
                min="1"
                v-model="rowsPerPage"
                class="border border-gray-300 outline-none"
              />
            </p>
          </div>
          <div
            class="flex items-center gap-3 border border-gray-300 p-1 rounded-lg"
          >
            <SearchIcon />
            <input
              class="outline-none"
              type="text"
              placeholder="type your keyword..."
              v-model="searchWords"
            />
          </div>
        </div>
      </section>
      <!-- 1. Add New Group -->
      <div v-show="addingMode" class="flex flex-col gap-2 bg-slate-100 p-3">
        <div>
          Section:
          <select v-model="newGroup.section">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          {{ newGroup.section }}
        </div>
        <div>
          Group Name:
          <input
            type="text"
            v-model.trim="newGroup.groupName"
            class="w-1/2 border border-gray-300 p-0.5 outline-none rounded-lg"
          />
          {{ newGroup.groupName }}
        </div>
        <div>
          GitHub Repository:
          <input
            type="text"
            v-model.trim="newGroup.repo"
            class="w-1/2 border border-gray-300 p-0.5 outline-none rounded-lg"
          />
          {{ newGroup.repo }}
        </div>
        <div>
          <div>
            Number of Members:
            <input
              @change="addNewMember"
              id="input-number-members"
              type="number"
              min="0"
              v-model.number="numOfMembers"
              class="border border-gray-300 p-0.5 outline-none rounded-lg"
            />
            {{ numOfMembers }}
          </div>
          <div
            v-for="(member, index) in newGroup.members"
            :key="index"
            class="flex flex-row gap-2 space-y-2 items-center"
          >
            <input type="checkbox" v-model="member.projectCo" />[Project
            Coordinator] {{ member.projectCo }} Student Id:
            <input
              v-model.number="member.studentId"
              type="text"
              class="border border-gray-300 p-0.5 outline-none rounded-lg"
            />{{ member.studentId }}
            Student Name:
            <input
              v-model.trim="member.studentName"
              type="text"
              class="border border-gray-300 p-0.5 outline-none rounded-lg"
            />{{ member.studentName }}
          </div>
          <div class="flex gap-2">
            <button
              class="px-2 py-1 bg-green-600 text-white rounded-lg"
              v-on:click="saveNewGroup"
            >
              OK
            </button>
            <button
              @click="addingMode = false"
              class="px-2 py-1 bg-red-600 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <!-- Display -->
      <section v-show="!addingMode">
        <div class="grid grid-cols-12 gap-2 font-semibold text-xl pb-3">
          <div class="flex items-center">
            <h3>Section</h3>
            <!-- 2. Sorting Groupworks by section (ascending) -->
            <SortIcon
              class="cursor-pointer"
              @click="sortBySection(workGroups)"
            />
          </div>

          <h3 class="col-span-2">Group Name</h3>
          <h3 class="col-span-3">GitHub Repository</h3>
          <h3 class="col-span-4">Members</h3>
          <h3 class="col-span-2">Link</h3>
        </div>
        <div
          v-for="(group, index) in filteredGroups"
          :key="group.ID"
          class="grid grid-cols-12 gap-2 p-2"
          :class="index % 2 === 0 ? 'bg-slate-100' : ''"
        >
          <p>{{ group.section }}</p>
          <p class="col-span-2">{{ group.groupName }}</p>
          <p class="col-span-3">{{ group.repo }}</p>
          <!-- <p class="col-span-4">{{group.members  }}</p> -->
          <ul class="col-span-4 list-disc list-inside">
            <!-- <li v-for="member in group.members">{{ member.studentId }} {{ member.studentName }}</li> -->
            <li
              v-for="({ studentId, studentName }, index) in group.members"
              :key="studentId"
            >
              {{ `${studentId}  ${studentName}` }}
            </li>
          </ul>
          <!-- dynamic images with v-bind src -->
          <img
            :src="`imgs/groupImages/pic-${index + 1}.jpg`"
            class="w-20 h-28 rounded-lg shadow-xl"
          />
        </div>
      </section>
      <!--3. Paginate -->
      <section>
        <div class="flex justify-center gap-2 pt-2">
          <p
            @click="getRows(n)"
            v-for="(n, index) in getLastPage(groups, rowsPerPage)"
            :key="index"
            :class="currentPage === n ? 'bg-white' : 'bg-gray-300'"
            class="px-1 py-0.5 hover:text-white hover:bg-blue-500 cursor-pointer"
          >
            {{ n }}
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.preferFontSize {
  font-size: v-bind(preferFontSize + 'px');
}
</style>
