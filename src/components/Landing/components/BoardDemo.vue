<template>
  <div class="w-80 border border-kanban-lines-dark rounded-3xl px-6 py-10">
    <h5 class="text-base text-kanban-medium-grey mb-7 px-7">ALL Boards (8)</h5>

    <div>
      <ul class="board-list">
        <li class="active">
          <img src="@/assets/icon-board-white.svg" alt="" />Platform Launch
        </li>
        <li><img src="@/assets/icon-board.svg" alt="" />Marketing Plan</li>
        <li><img src="@/assets/icon-board.svg" alt="" />Roadmap</li>
      </ul>

      <button class="text-kanban-main-purple text-lg flex">
        <img src="@/assets/purple-board.svg" alt="" /> Create New Board
      </button>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.board-list li {
  display: flex;
  @apply text-lg py-3 px-7 rounded-3xl items-center text-kanban-medium-grey;
}

li.active {
  @apply bg-kanban-main-purple text-kanban-white;
}

.board-list li img,
button img {
  margin-right: 10px;
}

button {
  @apply px-7 py-3;
}
</style>
