<template>
    <div class="modifynews">
        <h1>Tus Noticias</h1>
        <v-divider></v-divider>
        <v-card flat class="pa-3" v-for="todo in todos" :key="todo.newID">
            <v-layout row wrap>
                <v-flex xs12 md5>
                    <div class="caption grey--text">Titulo</div>
                    <div>{{todo.news_title}}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Autor</div>
                    <div>{{todo.news_author}}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Fecha</div>
                    <div>{{todo.news_date}}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <v-row
                    align="center"
                    justify="space-around">

                   <Popup
                   v-bind:key="todo.newID" 
                   />
                    <v-btn
                    depressed
                    color="error">
                    Eliminar
                    </v-btn>
                  </v-row>
                        
                    
                </v-flex>
               

            </v-layout>
            <v-divider></v-divider>
        </v-card>

        

  
    <v-navigation-drawer
      absolute
      permanent
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title" router :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script>
import Popup from '../components/Popup.vue'
import axios from 'axios'


export default {
  components: { Popup },
    data () {
      return {
        items: [
          { title: 'Crear Noticia', icon: 'mdi-file-plus', route: '/CreateNew' },
          { title: 'Modificar Noticias', icon: 'mdi-file-edit', route: '/ModifyNews' },
        ],
        todos: []
        

      }
    },
    mounted() {
      this.getTodos();
      
    },
    methods: {
      getTodos(){
        axios.get('https://0zvnue8cok.execute-api.us-east-2.amazonaws.com/default/all_noticias',
                  { 'headers': { 'x-api-key': 'IlFzPiYcXm7SauQWkhZWk3VuI4d89oP34c9W7Bun' }}
                ).then(
          response => {
            console.log(response)
            this.todos= response.data.Items
          })
          .catch(e=> console.log(e))
      }
    },
  }
</script>