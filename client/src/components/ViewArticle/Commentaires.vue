<template>
  <div>
    <h2 class="display-1">Messages</h2>
    <v-list>
      <v-list-item v-for="message in messages" @click="">
        <v-list-item-content>
          <v-list-item-title v-text="message"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import MessagesService from '@/services/MessagesService'

export default {
  data () {
    return {
      messages: ['My coco', 'First', 'Message']
    }
  },
  async created () {
    this.messages = (await MessagesService.index()).data
  }
}
</script>
