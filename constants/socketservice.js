// socketService.js
import React,{useContext,createContext,useEffect,useState} from 'react';
import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  initialize(url) {
    this.socket = io(url);
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const socketService = new SocketService();
export default socketService;
