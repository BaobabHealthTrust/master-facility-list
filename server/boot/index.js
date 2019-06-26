
User.create([
  {
    username: 'john',
    email: 'amusukwa@gmail.com',
    password: 'icecream'
  },], function (err, users) {
    if (err) throw err;
    Role.create({
        name: 'trusted'
    }, function (err, role) {
        if (err) cb(err);
        role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
        }, function (err, principal) {
            cb(err);
