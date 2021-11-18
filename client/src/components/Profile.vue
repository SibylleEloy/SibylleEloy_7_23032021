<template>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <panel title="Votre profil">
          <v-layout>
            <v-flex>
                <v-list two-line>
                  <v-list-tile @click="">
                    <v-list-tile-action>
                      <v-icon color="indigo">badge</v-icon>
                    </v-list-tile-action>
        
                    <v-list-tile-content>
                      <v-list-tile-title>{{user.firstname}}</v-list-tile-title>
                      <v-list-tile-sub-title>Prénom</v-list-tile-sub-title>
                    </v-list-tile-content>
        
                    <v-list-tile-action>
                      <v-icon>chat</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
        
                  <v-list-tile @click="">
                    <v-list-tile-action></v-list-tile-action>
        
                    <v-list-tile-content>
                      <v-list-tile-title>{{user.lastname}}</v-list-tile-title>
                      <v-list-tile-sub-title>Nom</v-list-tile-sub-title>
                    </v-list-tile-content>
        
                    <v-list-tile-action>
                      <v-icon>chat</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>

                   <v-divider inset></v-divider>

                   <v-list-tile @click="">
                    <v-list-tile-action></v-list-tile-action>
        
                    <v-list-tile-content>
                      <v-list-tile-title>{{user.username}}</v-list-tile-title>
                      <v-list-tile-sub-title>Identifiant</v-list-tile-sub-title>
                    </v-list-tile-content>
        
                    <v-list-tile-action>
                      <v-icon></v-icon>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider inset></v-divider>
        
                  <v-list-tile @click="">
                    <v-list-tile-action>
                      <v-icon color="indigo">mail</v-icon>
                    </v-list-tile-action>
        
                    <v-list-tile-content>
                      <v-list-tile-title>{{user.email}}</v-list-tile-title>
                      <v-list-tile-sub-title>Professionnel</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
        
                  <v-divider inset></v-divider>
        
                  <v-list-tile @click="">
                    <v-list-tile-action>
                      <v-icon color="indigo">admin_panel_settings</v-icon>
                    </v-list-tile-action>
        
                    <v-list-tile-content>
                      <v-list-tile-title>{{user.role}}</v-list-tile-title>
                      <v-list-tile-sub-title>Statut</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
            </v-flex>
          </v-layout>
        </panel>
      </v-flex>
    </v-layout>
</template>

<script>
import {mapState} from 'vuex'

export default {
  // props: [
  //   'user'
  // ],
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async user () {
      if (!this.isUserLoggedIn) {
        return
      }
    }
  }
}

</script>

<style scoped>
.user {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.user-firstname {
  font-size: 20px;
}

.user-lastname {
  font-size: 20px;
}
.bg-img {
  background-image: url("https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  border-radius: 3px;
}
</style>
