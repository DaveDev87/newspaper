<template>
    <!--<v-dialog max-width="600px">
        <v-btn flat slot= "activator" class="success">Editar</v-btn>
        <v-card>
            <v-card-title>
                <h2>Editar</h2>
            </v-card-title>

        </v-card>
    </v-dialog>-->

    
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Editar
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Editar Noticia</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                
              >
                <v-text-field
                  label="Titulo*"
                  required
                ></v-text-field>
              </v-col>
              
              
              <v-col cols="12">
                <v-select
                  :items="['Policiaca', 'Estatal', 'Espectaculos', 'Nacional','Internacional','Deportes']"
                  label="Sección*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    name="input-7-1"
                    label="Cuerpo de la Noticia"
                    value=""
                    hint="Escribe el cuerpo de la noticia"
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                
              >
                <v-file-input
                    label="Imagen de la Nota"
                    filled
                    prepend-icon="mdi-camera"
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
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
</template>

<script>
export default {
    data: () => ({
      dialog: false,
    }),
}
</script>