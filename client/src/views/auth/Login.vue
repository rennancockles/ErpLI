<template>
  <v-row align="center" justify="center">

    <v-col cols="12" sm="8" md="6">
      <v-card id="login-card">
        <v-card-title class="primary white--text title">
          LOGIN
        </v-card-title>

        <v-card-text>
          <v-col cols=12>
            <v-alert color="danger" v-model="showAlert" dense dark dismissible>{{ alertText }}</v-alert>
          </v-col>

          <v-form>
            <v-text-field
            prepend-icon="mdi-account"
            name="email"
            label="Email"
            v-model="payload.email"
            :error-messages="errorMessage"
            autofocus
            ></v-text-field>

            <v-text-field
            label="Senha"
            name="password"
            prepend-icon="mdi-lock"
            v-model="payload.password"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="errorMessage"
            @click:append="showPassword = !showPassword"
            @keyup.enter="onSubmit()"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <div class="ml-3">
            <!-- <p class="caption mb-0">
              Esqueceu sua senha?
              <a href="" @click.prevent="recover()">Recupere</a>
            </p> -->
            <p class="caption mb-0">
              Não possui conta?
              <router-link tag="a" to="/auth/register">Cadastre-se</router-link>
            </p>
          </div>
          <v-spacer />
          <v-btn type="button" @click="onSubmit()" color="primary">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/auth'

export default {
  name: 'AuthLogin',
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  data () {
    return {
      showAlert: false,
      alertText: '',
      showPassword: false,
      errorMessage: '',
      payload: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    this.setIsLoggedIn(this.$storage.isLoggedIn())

    if (this.isLoggedIn) this.$goHome()
  },
  methods: {
    ...mapActions(['logIn', 'setIsLoggedIn']),

    onSubmit () {
      this.setLoading(true)
      this.showAlert = false

      API.login(this.payload)
        .then((response) => {
          this.setLoading(false)

          const responseData = {
            user: response.data,
            authToken: response.headers['x-authtoken']
          }

          this.logIn(responseData)
          this.$goHome()
        })
        .catch(err => {
          if (err.request.status === 404) {
            this.alertText = 'Usuário ou senha incorretos!'
          } else {
            this.alertText = 'Ocorrreu um erro. Tente novamente em alguns minutos!'
          }

          this.showAlert = true
          this.setIsLoggedIn(false)
          this.setLoading(false)
        })
    },
    recover () {
      console.info('Recover not implemented!')
      // if (!this.payload.email || this.payload.email === '') {
      //   this.$message('O campo email precisa estar preenchido')
      // } else if ((!/.+@.+\..+/.test(this.payload.email))) {
      //   this.$message('E-mail inválido')
      // } else {
      //   this.$message('Um e-mail será enviado com as informações para recuperar a senha', 'info')

      //   this.setLoading(true)

      //   API.recoverEmail(this.payload.email)
      //     .then(({ data }) => {
      //       this.setLoading(false)
      //       this.$goHome()
      //     })
      //     .catch(this.$throwException)
      // }
    }
  }
}
</script>
