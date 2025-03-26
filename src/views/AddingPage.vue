<script setup>
import axios from "axios";

async function sendData(text) {
  try {
    await axios
      .post("http://localhost:3000/send-data", {
        text: text,
      })
      .then((r) => {
        console.log(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
}

import { ref } from "vue";

const email = ref("");

const submitForm = async () => {
  if (!email.value) {
    return;
  }
  await sendData(email.value);
  email.value = "";
};
</script>

<template>
  <div class="form-container">
    <div class="form-image">
      <img
        src="../assets/ikit.png?height=200&width=200"
        alt="Форма регистрации"
      />
    </div>

    <h1 class="form-title">Расписаться на доске</h1>

    <div class="form-content">
      <div class="form-group">
        <input
          id="email"
          v-model="email"
          placeholder="Вот тут..."
          class="form-input"
        />
      </div>

      <p class="form-notice">
        <span class="notice-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </span>
        Вы можете сделать свою роспись ещё круче, если подойдёте к парню с
        ноутбуком, его зовут Кирилл, он добрый :)
      </p>

      <button @click="submitForm" class="form-button">Нажать</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .form-image {
    background-color: #3aa8c3;
    padding: 30px;
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
    }
  }

  .form-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #555;
    }

    .form-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s ease;

      &:focus {
        outline: none;
        border-color: #4a6cf7;
        box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
      }

      &::placeholder {
        color: #aaa;
      }
    }
  }

  .form-notice {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 1.5rem;
    color: #666;
    background-color: #f8f9fa;
    padding: 0.75rem;
    border-radius: 4px;
    border-left: 3px solid #4a6cf7;

    .notice-icon {
      color: #4a6cf7;
      flex-shrink: 0;
      margin-top: 2px;
    }
  }

  .form-button {
    background-color: #4a6cf7;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #3a5ce5;
    }

    &:active {
      background-color: #2a4cd3;
    }
  }
}

// Адаптивность для мобильных устройств
@media (max-width: 480px) {
  .form-container {
    padding: 1.5rem;

    .form-title {
      font-size: 1.5rem;
    }
  }
}
</style>

<style scoped lang="scss"></style>
