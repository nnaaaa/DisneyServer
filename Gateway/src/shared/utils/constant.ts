import { Permission } from 'src/entities/role.entity'

export class Constant {
    static userAvatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg0TvzLdISKVVtNk9XTFlKS8_4dn4dzYcvlo-YtNb_33-prHxuDnLHSuk8GNnBWw3awb8&usqp=CAU'
    static botAvatar =
        'https://cdn4.iconfinder.com/data/icons/usa-elements-solid-patriotic-and-freedom-1/512/Disneyland-512.png'
    static guildAvatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvStjNt3EQmPzunDVN26PQEB-o2p_luRyMMg&usqp=CAU'

    static everyOneRoleName = '@everyone'
    static everyOnePermission: Permission[] = [
        'CREATE_CHANNEL',
        'UPDATE_CHANNEL',
        'DELETE_CHANNEL',
        'CREATE_EMOJI',
        'UPDATE_EMOJI',
        'DELETE_EMOJI',
        'CREATE_MESSAGE',
        'UPDATE_MESSAGE',
        'DELETE_MESSAGE',
        'CUD_REACT',
    ]

    static roleColor = '#000000'

    static adminPermission: Permission[] = this.everyOnePermission.concat([
        'UPDATE_GUILD',
        'DELETE_GUILD',
        'CREATE_ROLE',
        'UPDATE_ROLE',
        'DELETE_ROLE',
    ])
    static adminRoleName = '@admin'
}
