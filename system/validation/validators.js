const validators = {
    email: (value, { require }) => {
      const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!require && !value) {
        return false;
      }
      if (require && !value) {
        return "validation.email.empty";
      }
      return !email_regex.test(value) ? "validation.email.format" : false;
    },
    password: (value, { require, parent }) => {
      if (!require && !value) {
        return false;
      }
      if (require && !value) {
        return "validation.password.empty";
      }
  
      if (parent && parent != value) {
        return "validation.password.noReapeatCorrecty";
      }
  
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
        ? false
        : "validation.password.format";
    },
    date: (value, { require, parent }) => {
      if (!require && !value) {
        return false;
      }
      return /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value)
        ? parent && value != parent
          ? "wynik niezgodny z rodzicem"
          : false
        : "Niepoprawna data";
    }
  };
  
  module.exports = validators;