<template>
<div>
  <div class= "pa-13">
<h1>Bienvenido al modo Editor</h1>
<p>Elige que es lo que quieres hacer en el tablero derecho</p>
  
  <div >
    <v-alert
      outlined
      color="purple"
    >
      <div class="title">
        El Modo Editor te permitira:
      </div>
      <div class="pa-3">
        <li>Crear Noticias Nuevas</li>
        <li>Modificar Noticias Existentes</li>
        <li>Eliminar noticias propias</li>
      </div>

    </v-alert>
    <v-alert
      outlined
      type="success"
      text
    >
      Puedes modificar, crear, eliminar y editar las veces que quieras.
    </v-alert>
    <v-alert
      outlined
      type="warning"
      prominent
      border="left"
    >
      Si haces mal uso del modo editor un administrador tomara cartas en el asunto, recuerda que tenemos registro de todo lo que modificas y todo lo que eliminas.
    </v-alert>
  </div>
  </div>
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
export default {
    data () {
      return {
        author:this.$store.state.user.username,
        items: [
          { title: 'Crear Noticia', icon: 'mdi-file-plus', route: '/CreateNew' },
          { title: 'Modificar Noticias', icon: 'mdi-file-edit', route: '/ModifyNews' },
        ],
      }
    },
  }
</script>
