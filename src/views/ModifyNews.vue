<template>
    <div class="modifynews">
        <h1>Tus Noticias</h1>
        <v-btn color="success" class="ma-2" @click="refresh()"> Actualizar </v-btn>
        <v-divider></v-divider>
        <v-card flat class="pa-3"  v-for="todo in todos" v-bind:key="todo.newID" >
            <v-layout row wrap >
                <v-flex xs12 md3>
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
                   v-bind:todo="todo"
                   />
                    <!-- <v-btn
                    depressed
                    color="error"
                    @click="deleted(todo.newID)"
                    >
                    Eliminar
                    </v-btn> -->
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
            <v-list-item-title>{{author}}</v-list-item-title>
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
// import Vue from "vue";

import Popup from '../components/Popup.vue'
import axios from 'axios'
// import Vue from 'vue';
//  Vue.forceUpdate();





export default {
  components: { Popup },
    data () {
      return {
        author:this.$store.state.user.username,
       
        items: [
          { title: 'Crear Noticia', icon: 'mdi-file-plus', route: '/CreateNew' },
          { title: 'Modificar Noticias', icon: 'mdi-file-edit', route: '/ModifyNews' },
        ],
        todos: [],
        componentKey:1,
        

      }
    },
    mounted() {
      this.getTodos();
      
    },
    methods: {
      refresh(){
        axios.get('https://glycqj1sod.execute-api.us-east-2.amazonaws.com/default/Noticia_author',
                  { 
                    params: {
                            author: this.author
                            }
                    // 'headers': { 'x-api-key': 'IlFzPiYcXm7SauQWkhZWk3VuI4d89oP34c9W7Bun' }
                    }
                ).then(
          response => {
            console.log(response)
            this.todos= response.data.Items
            // for (let index = 0; index < this.todos.length; index++) {
            //     console.log(this.todos.[index].newID)
            //     this.todos.[index].newID= index
            //     console.log(this.todos.[index].newID)
            // }
            //  this.$forceUpdate();

          })
          .catch(e=> console.log(e))
        
        
          
      },
      getTodos(){
        axios.get('https://glycqj1sod.execute-api.us-east-2.amazonaws.com/default/Noticia_author',
                  { 
                    params: {
                            author: this.author
                            }
                    // 'headers': { 'x-api-key': 'IlFzPiYcXm7SauQWkhZWk3VuI4d89oP34c9W7Bun' }
                    }
                ).then(
          response => {
            console.log(response)
            this.todos= response.data.Items
          })
          .catch(e=> console.log(e))
      },
       deleted(deletedID){
         console.log(deletedID)
        axios.delete(`https://xrh6ds3ujf.execute-api.us-east-2.amazonaws.com/default/eliminar_noticia?id=${deletedID}`, 
          {
            headers: {
              "x-api-key": "IlFzPiYcXm7SauQWkhZWk3VuI4d89oP34c9W7Bun",
              "Access-Control-Allow-Origin": "*",
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e.message));

        this.getTodos();
        // this.methodThatForcesUpdate();
      },
      
    },
  }
</script>