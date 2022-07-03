import { SetMetadata } from "@nestjs/common";
import { Permission } from "src/entities/role.entity";


export const RolePermissions = (permission:Permission[]) => SetMetadata('permissions',permission);