import { Permission } from "src/entities/role.entity"

export class Default {
    static userAvatar =
        'https://i.pinimg.com/474x/7c/8f/47/7c8f476123d28d103efe381543274c25.jpg'
    static botAvatar = 'https://i.pinimg.com/474x/7c/8f/47/7c8f476123d28d103efe381543274c25.jpg'
    static guildAvatar =
        'https://st2.depositphotos.com/47577860/46213/v/380/depositphotos_462132810-stock-illustration-amusement-park-castle-disney-icon.jpg?forcejpeg=true'

    static everyOneRoleName = '@everyone'
    static everyOnePermission: Permission[] = ['CREATE_CHANNEL', 'UPDATE_CHANNEL', 'DELETE_CHANNEL', 'CREATE_EMOJI', 'UPDATE_EMOJI', 'DELETE_EMOJI', 'CREATE_MESSAGE', 'UPDATE_MESSAGE', 'DELETE_MESSAGE', 'CUD_REACT']

    static roleColor = '#000000'

    static adminPermission: Permission[] = this.everyOnePermission.concat(["UPDATE_GUILD", "DELETE_GUILD", "CREATE_ROLE", "UPDATE_ROLE", "DELETE_ROLE"])
    static adminRoleName = '@admin'
}
