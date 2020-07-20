"use strict";

class FSController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
    socket.on("create", (data) => {
      console.log(data);
    });
  }
}

module.exports = FSController;
