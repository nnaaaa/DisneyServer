"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = void 0;
const common_1 = require("@nestjs/common");
const RolePermissions = (permission) => (0, common_1.SetMetadata)('permissions', permission);
exports.RolePermissions = RolePermissions;
//# sourceMappingURL=role-permission.decorator.js.map