<template>
  <div class="d-flex justify-content-center">
    <form
      class="w-30 form shadow p-3 bg-white rounded"
      @submit.prevent="submit"
    >
      <h1 class="text-center fs-2 text-primary m-0">Авторизация</h1>
      <hr />
      <div class="form-floating mb-3" :class="{ errors: emailErrors[0] }">
        <input
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          placeholder="Enter e-mail..."
          class="form-control"
          id="email"
          type="email"
          v-model="email"
        />
        <label for="floatingInput">Email address</label>
        <div
          v-if="emailErrors[0]"
          :class="{ 'invalid-feedback': emailErrors[0] }"
        >
          {{ emailErrors[0] }}
        </div>
      </div>
      <div class="form-floating mb-3" :class="{ errors: passwordErrors[0] }">
        <input
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          class="form-control"
          id="password"
          v-model="password"
          placeholder="Enter password..."
          type="password"
        />
        <label for="floatingInput">Password</label>
        <div
          v-if="passwordErrors[0]"
          :class="{ 'invalid-feedback': passwordErrors[0] }"
        >
          {{ passwordErrors[0] }}
        </div>
      </div>
      <div class="form-check mb-3">
        <input
          type="checkbox"
          class="form-check-input"
          v-model="saveUserParams"
          id="saveUserParams"
        />
        <label class="form-check-label" for="saveUserParams">
          запомнить меня
        </label>
      </div>
      <div class="row">
        <div class="col-12">
          <button
            type="button"
            class="mb-2 mb-md-0 btn btn-primary btn-lg w-100"
            @click="submit"
          >
            Войти
          </button>
        </div>
        <div class="col-12 mt-4 text-center">
          <router-link class="" to="/TechWebShop/registration"
            >Создать аккаунт</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data () {
    return {
      email: '',
      password: '',
      saveUserParams: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  created () {
    if (localStorage.getItem('userParams')) {
      const user = JSON.parse(localStorage.getItem('userParams'))
      this.email = user.email
      this.password = user.password
      this.saveUserParams = true
    }
  },
  watch: {
    isLogin () {
      this.$router.push('/TechWebShop/profile')
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.getUs
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Min length of password 8 letters')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        var user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
        if (this.saveUserParams) {
          localStorage.setItem('userParams', JSON.stringify(user))
        } else {
          localStorage.removeItem('userParams')
        }
      }
    }
  }
}
</script>

<style lang="scss">
.form {
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
}
.invalid-feedback {
  position: relative;
  display: block;
  margin: 4px 0 0 8px;
}
</style>
