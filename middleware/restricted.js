module.exports = () => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        message: "You shall not pass!"
      })
    }
    next()
  }
}

// const bcrypt = require('bcryptjs');
// const Users = require('../users/users-model');

// function restricted() {
//   const authError = {
//     message: 'You shall not pass!'
//   }

//   return async (req, res, next) => {
//     try {
//       const { username, password } = req.headers
//       if (!username || !password) {
//         return res.status(401).json(authError)
//       }

//       const user = await Users.findBy({ username }).first()
//       if (!user) {
//         return res.status(401).json(authError)
//       }

//       const passwordValid = await bcrypt.compare(password, user.password)
//       if (!passwordValid) {
//         return res.status(401).json(authError)
//       }

//       next()

//     } catch (err) {
//       next(err)
//     }
//   }
// };

// module.exports = {
//   restricted
// };