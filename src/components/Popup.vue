<template>
  <!--<v-dialog max-width="600px">
        <v-btn flat slot= "activator" class="success">Editar</v-btn>
        <v-card>
            <v-card-title>
                <h2>Editar</h2>
            </v-card-title>

        </v-card>
    </v-dialog>-->

  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Editar </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Editar Noticia</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Titulo*"
                v-model="todo.news_title"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                :items="[
                  'Policiaca',
                  'Estatal',
                  'Espectaculos',
                  'Nacional',
                  'Internacional',
                  'Deportes',
                ]"
                label="Sección*"
                v-model="todo.news_section"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                name="input-7-1"
                label="Cuerpo de la Noticia*"
                v-model="todo.news_body"
                hint="Escribe el cuerpo de la noticia"
                :rules="[rules.required]"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-file-input
                label="Imagen de la Nota*"
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
          @click="(dialog = false), (alert = !alert)"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="submit(), (alert = true)"
          :disabled="!isDisableFixed()"
        >
          Save
        </v-btn>
      </v-card-actions>
      <v-alert
        :value="alert"
        color="green"
        dark
        border="top"
        icon="mdi-alert"
        transition="scale-transition"
        >Submited</v-alert
      >
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    alert: false,
    
    rules: {
      required: (value) => !!value || "Required.",
    },
    // params : {
    //                 id:this.todo.newID,
    //                 author:this.todo.news_author,
    //                 body:this.todo.news_body,
    //                 date:this.todo.news_date,
    //                 image_url:this.todo.news_image_url,
    //                 section:this.todo.news_section,
    //                 title:this.todo.news_title
    // }
    // post:[
    //   id=this.todo.newID,
    //   author=this.todo.news_author,
    //   body=this.todo.news_body,
    //   date=this.todo.news_date,
    //   image_url=this.todo.news_image_url,
    //   section=this.todo.news_section,
    //   title=this.todo.news_title
    // ]
  }),
  methods: {
    submit() {
      // console.log(this.todo.newID);
      // console.log(this.todo.news_title);
      // console.log(this.todo.news_section);
      // console.log(this.todo.news_image_url);
      // console.log(this.todo.news_date);
      // console.log(this.todo.news_body);
      // console.log(this.todo.news_author);

      const body= JSON.stringify({
            id: this.todo.newID,
            author: this.todo.news_author,
            body: this.todo.news_body,
            date: this.todo.news_date,
            image_url: this.todo.news_image_url,
            section: this.todo.news_section,
            title: this.todo.news_title,
    });
    console.log(body);


      axios.post(`https://yxywaszoe7.execute-api.us-east-2.amazonaws.com/default/actualizar_noticia`,
          
            null,
          {
            params: {
              id: this.todo.newID,
            author: this.todo.news_author,
            body: this.todo.news_body,
            date: this.todo.news_date,
            image_url: this.todo.news_image_url,
            section: this.todo.news_section,
            title: this.todo.news_title,
            },
            headers: {
              "x-api-key": "IlFzPiYcXm7SauQWkhZWk3VuI4d89oP34c9W7Bun",
              "Access-Control-Allow-Origin": "*",
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e.message));
    },
    isDisableFixed() {
      return this.todo.news_title.length > 0 && this.todo.news_body.length > 0;
    },
  },
};
</script>