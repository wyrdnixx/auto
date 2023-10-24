<template>
    <div v-if="showToast" class="toast-message">
      <div class="message">{{ message }}</div>
      <div class="button-container">
        <button @click="handleYes">Yes</button>
        <button @click="handleNo">No</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showToast: false,
        message: '',
        resolve: null,
        reject: null,
      };
    },
    methods: {
      handleYes() {
        this.showToast = false;
        this.resolve(true);
      },
      handleNo() {
        this.showToast = false;
        this.reject(false);
      },
    },
  };
  </script>
  
  <style scoped>
  .toast-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .button-container {
    margin-top: 10px;
  }
  
  button {
    margin: 5px;
    background: #007BFF;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .button-container button:hover {
    background: #0056b3;
  }
  </style>