const User = require('../../models/User.js')


module.exports = function authenticate(strategy, email, displayName, done) {

  if (!email) return done(null, false, 'Не указан email')
  
  User.findOne({email}, async (err, user) => {
    if (err)  {
      console.log(err)
      return done(err)
    }
    if (!user) {
      let newUser = new User({email, displayName})
      await newUser.save()
                   .then(() => done(null, newUser))
                   .catch(done)
    }
    done(null, user)
  })
};
