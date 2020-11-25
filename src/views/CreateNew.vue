<template>
  <div class="modifynews">
   <h1>¡Crea tu Noticia!</h1>
     <v-card max-width="1000">
        <v-card-title>
          
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="6"
                
              >
                <v-text-field
                  label="Titulo*"
                  v-model="title"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              
              
              <v-col cols="12">
                <v-select
                  :items="['Policiaca', 'Estatal', 'Espectaculos', 'Nacional','Internacional','Deportes']"
                  label="Sección*"
                  v-model="section"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    name="input-7-1"
                    label="Cuerpo de la Noticia*"
                    v-model="body"
                    hint="Escribe el cuerpo de la noticia"
                    :rules="[rules.required]"
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                
              >
                <v-file-input
                    label="Imagen de la Nota"
                    filled
                    prepend-icon="mdi-camera"
                    :rules="[rules.required]"
                ></v-file-input>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*parametros obligatorios</small>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        
        <v-btn
          color="blue darken-1"
          text
          @click="submit(), (alert = true)"
          :disabled="!isDisableFixed()"
        >
          Create
        </v-btn>
      </v-card-actions>
      <v-alert
        :value="alert"
        color="green"
        dark
        border="top"
        icon="mdi-alert"
        transition="scale-transition"
        >Submited</v-alert>
        
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
import axios from "axios";


export default {
    data () {
      return {
        
        alert: false,
        items: [
          { title: 'Crear Noticia', icon: 'mdi-file-plus', route: '/CreateNew' },
          { title: 'Modificar Noticias', icon: 'mdi-file-edit', route: '/ModifyNews' },
        ],
        title: '',
        author:this.$store.state.user.username,
        body:'',
        image_url:'https://newspaper-images-bootcamp.s3.us-east-2.amazonaws.com/travisbatman.jpg',
        section:'Policiaca',
        rules: {
      required: (value) => !!value || "Required.",
    },
      }
    },
    methods: {
      submit(){
        // const params={
        // title: this.title,
        // author:this.author,
        // body:this.body,
        // image_url:this.image_url,
        // section:this.section

        // }
        // console.log(this.title,this.author,this.body,this.image_url,this.section)
        // console.log(params);
        axios.post('https://b33k9jtxz5.execute-api.us-east-2.amazonaws.com/default/crear_noticia',
                  null,
                  { 
                    params: {
                      // author:this.author,
                      // body:this.body,
                      // image_url:this.image_url,
                      // section:this.section,
                      // title: this.title,

                      author:this.author,
                      body:this.body,
                      image_url:this.image_url,
                      section:this.section,
                      title: this.title,

                    },
                    headers: { 'x-api-key': 'IlFzPiYcXm7SauQWkhZWk3VuI4d89oP34c9W7Bun',
                    "Access-Control-Allow-Origin": "*",
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                    }
                  }
                )
                .then(
          response => {
            console.log(response)
            this.todos= response.data.Items
          })
          .catch(e=> console.log(e))

      },
      isDisableFixed() {
      return this.title.length > 0 && this.body.length > 0;
    },
    },
  }
</script>