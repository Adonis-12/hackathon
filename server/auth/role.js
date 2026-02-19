const Permissions = require('./permissions')

module.exports = {
   owner : [
    Permissions.ADD_MEMBER,
    Permissions.CHANGE_ROLE,
    Permissions.CREATE_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.REMOVE_MEMBER,
    Permissions.INVITE_MEMBER,
    Permissions.UPDATE_PROJECT,
    Permissions.CREATE_TASK,
    Permissions.ASSIGN_TASK,
    Permissions.UPDATE_TASK,
    Permissions.DELETE_TASK
   ],
   admin:[
    Permissions.CREATE_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.UPDATE_PROJECT,
    Permissions.CREATE_TASK,
    Permissions.ASSIGN_TASK,
    Permissions.UPDATE_TASK,
    Permissions.DELETE_TASK
   ],
   member:[]
}