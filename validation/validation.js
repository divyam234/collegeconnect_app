const validation = {
  email: {
    presence: {
      message: '^Please enter an email address'
    },
    email: {
      message: '^Please enter a valid email address'
    }
  },

  regno: {
    presence: {
      message: '^Please enter regno'
    },
    length: {
      is:8,
      message: '^Please enter a valid regno'
    }
  },

  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: 6,
      message: '^Your password must be at least 6 characters'
    }
  },
   confirmPassword: {
    equality:'password'
  },
  requestMessage:{
    presence: {
      message: '^Request message is required'
    },
    length:{
      minimum:1,
      message: '^Request message is required'
    }
  }
}

export default validation
