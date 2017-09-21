// Users
export function create_user_permission(user, obj = null) { return authenticated(user, obj) }
export function list_user_permission(user, obj = null) { return anyone(user, obj) }
export function details_user_permission(user, obj = null) { return anyone(user, obj) }
export function update_user_permission(user, obj = null) { return owner(user, obj) }
export function delete_user_permission(user, obj = null) { return owner(user, obj) }
