<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8">
      <v-card id="login-card">
        <v-card-title class="primary white--text title">
          CADASTRO
        </v-card-title>

        <v-card-text>
          <v-col cols=12>
            <v-alert color="danger" v-model="showAlert" dense dark dismissible>{{ alertText }}</v-alert>
          </v-col>

          <v-form v-model="frmValid">
            <v-row wrap>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                label="Nome"
                v-model="payload.name"
                :rules="$rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                label="Sobrenome"
                v-model="payload.lastname"
                :rules="$rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                label="Email"
                v-model="payload.email"
                :rules="[...$rules.required, ...$rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                label="Nome da Loja"
                v-model="payload.storeName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                label="Api Key da Loja"
                v-model="payload.apiKey"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                label="Senha"
                name="password"
                v-model="payload.password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                :rules="$rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                label="Confirmar Senha"
                name="passwordConfirm"
                v-model="payload.passwordConfirm"
                :append-icon="showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPasswordConfirm = !showPasswordConfirm"
                :type="showPasswordConfirm ? 'text' : 'password'"
                :rules="[...$rules.required, equalPasswords]"
                @keyup.enter="onSubmit()"
                ></v-text-field>
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="danger" @click="onCancel" dark>Cancelar</v-btn>
          <v-btn color="primary" @click="onSubmit($event)" :disabled="!frmValid">Cadastrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/auth'

export default {
  name: 'Register',
  data () {
    return {
      frmValid: true,
      alertText: '',
      showAlert: false,
      showPassword: false,
      showPasswordConfirm: false,
      payload: {
        name: '',
        lastname: '',
        email: '',
        storeName: '',
        apiKey: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
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

      API.register(this.payload)
        .then(response => {
          this.setLoading(false)
          this.$goHome()
        })
        .catch(err => {
          if (err.request.status === 409) {
            this.alertText = `Cadastro já existente com a seguinte informação: ${err.response.data.entry}`
          } else {
            this.alertText = 'Ocorrreu um erro. Tente novamente em alguns minutos!'
          }

          this.showAlert = true
          this.setLoading(false)
        })
    },
    onCancel () {
      this.$goHome()
    },
    equalPasswords (v) {
      return v === this.payload.password || 'As senhas devem ser iguais!'
    }
  }
}
</script>
