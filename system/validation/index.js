const validators = require("./validators");
const { ApolloServer, gql, ApolloError } = require("apollo-server-express");

module.exports = (data, validation) => {
  const check = item => {
    const [key, validator, options] = item;
    return [
      key,
      validators[validator](data[key], {
        ...options,
        parent: options.parent ? data[options.parent] : null
      })
    ];
  };

  const errors = validation.map(check).filter(item => item[1]);
  if (errors.length) {
    const form_errors = errors.reduce((obj, item) => {
      obj[item[0]] = item[1];
      return obj;
    }, {});

    // throw { status: 400, text: "Niepoprawne dane formularza", form_errors };
    throw new ApolloError("Niepoprawne dane formularza", 400, { form_errors });
  }
};