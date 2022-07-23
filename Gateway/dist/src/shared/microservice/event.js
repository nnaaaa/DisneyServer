"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePatternEvent = exports.UserPatternEvent = void 0;
var UserPatternEvent;
(function (UserPatternEvent) {
    UserPatternEvent["CREATE"] = "user-create";
    UserPatternEvent["UPDATE"] = "user-update";
})(UserPatternEvent = exports.UserPatternEvent || (exports.UserPatternEvent = {}));
var MessagePatternEvent;
(function (MessagePatternEvent) {
    MessagePatternEvent["CREATE"] = "message-create";
    MessagePatternEvent["UPDATE"] = "message-update";
    MessagePatternEvent["DELETE"] = "message-delete";
})(MessagePatternEvent = exports.MessagePatternEvent || (exports.MessagePatternEvent = {}));
//# sourceMappingURL=event.js.map