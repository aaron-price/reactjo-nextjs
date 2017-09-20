function anyone(user) { return true }
function nobody(user) { return false }
function authenticated(user) { return !!user.id }
function anonymous(user) { return !user.id }
function owner(user, obj) { return user.id == obj.owner }
function superuser(user) { return user.is_superuser }
function staff(user) { return user.is_staff }
function active(user) { return user.is_active }
