<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <panel title="Votre profil">
          <v-layout>
            <!-- <v-flex xs6>
              <div class="user-firstname text-xs-left">
                Nom: {{user.firstname}}
              </div>
              <div class="user-lastname text-xs-left">
                Prénom: {{user.lastname}}
              </div>
              <div class="user-email text-xs-left">
                Email: {{user.email}}
              </div>
            </v-flex> -->
          </v-layout>
        </panel>
      </v-flex>
    </v-layout>
  <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <!-- <v-img
            src="../assets/Groupomania_Logos/icon-left-font-monochrome-white.png"
            height="300px"
          >
            <v-layout
              column
              fill-height
            >
              <v-card-title>
                <v-btn dark icon>
                  <v-icon>chevron_left</v-icon>
                </v-btn>
  
                <v-spacer></v-spacer>
  
                <v-btn dark icon class="mr-3">
                  <v-icon>edit</v-icon>
                </v-btn>
  
                <v-btn dark icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-card-title>
  
              <v-spacer></v-spacer>
  
              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-5 pt-5">Ali Conners</div>
              </v-card-title>
            </v-layout>
          </v-img> -->
  
          <v-list two-line>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">badge</v-icon>
              </v-list-tile-action>
  
              <v-list-tile-content>
                <v-list-tile-title>{{user.firstname}}</v-list-tile-title>
                <v-list-tile-sub-title>Firstname</v-list-tile-sub-title>
              </v-list-tile-content>
  
              <v-list-tile-action>
                <v-icon>chat</v-icon>
              </v-list-tile-action>
            </v-list-tile>
  
            <v-list-tile @click="">
              <v-list-tile-action></v-list-tile-action>
  
              <v-list-tile-content>
                <v-list-tile-title>{{user.lastname}}</v-list-tile-title>
                <v-list-tile-sub-title>Lastname</v-list-tile-sub-title>
              </v-list-tile-content>
  
              <v-list-tile-action>
                <v-icon>chat</v-icon>
              </v-list-tile-action>
            </v-list-tile>
  
            <v-divider inset></v-divider>
  
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">mail</v-icon>
              </v-list-tile-action>
  
              <v-list-tile-content>
                <v-list-tile-title>{{user.email}}</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
  
            <!-- <v-list-tile @click="">
              <v-list-tile-action></v-list-tile-action>
  
              <v-list-tile-content>
                <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile> -->
  
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
        </v-card>
      </v-flex>
    </v-layout>
  </div>  
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
