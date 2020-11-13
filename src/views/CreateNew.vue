<template>
  <div class="modifynews">
   <h1>¡Crea tu Noticia!</h1>
     <v-card max-width="1000">
        <v-card-title>
          <span class="headline">Editar Noticia</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="6"
                
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
export default {
    data () {
      return {
        items: [
          { title: 'Crear Noticia', icon: 'mdi-file-plus', route: '/CreateNew' },
          { title: 'Modificar Noticias', icon: 'mdi-file-edit', route: '/ModifyNews' },
        ],
      }
    },
  }
</script>