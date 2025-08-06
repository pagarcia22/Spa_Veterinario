document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")

  // Mapeo ESTRICTO de emails a roles permitidos
  const EMAIL_ROL_MAP = {
    "cliente@prueba.com": "cliente",
    "doctor@prueba.com": "doctor",
    "admin@prueba.com": "admin",
  }

  // Autocompletar campos para pruebas rápidas
  setupQuickLogin()

  // Validación en tiempo real del rol según el email
  setupRealTimeValidation()

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(loginForm)
    const loginData = {
      email: formData.get("email").trim().toLowerCase(),
      password: formData.get("password"),
      rol: formData.get("rol"),
    }

    // Validación básica
    if (!loginData.email || !loginData.password || !loginData.rol) {
      showMessage("Por favor completa todos los campos", "error")
      return
    }

    // VALIDACIÓN ULTRA-ESTRICTA: Verificar que el email esté autorizado
    const rolEsperado = EMAIL_ROL_MAP[loginData.email]

    if (!rolEsperado) {
      showMessage("❌ Email no autorizado en el sistema", "error")
      return
    }

    // BLOQUEO TOTAL: El rol seleccionado DEBE coincidir exactamente
    if (loginData.rol !== rolEsperado) {
      const mensaje =
        `🚫 ACCESO DENEGADO 🚫\n\n` +
        `El email "${loginData.email}" está registrado como "${getRoleLabel(rolEsperado)}".\n` +
        `No puedes acceder como "${getRoleLabel(loginData.rol)}".\n\n` +
        `⚠️ SOLO puedes usar tu rol asignado: ${getRoleLabel(rolEsperado)}`

      showMessage(mensaje, "error")

      // Resaltar el campo de rol como incorrecto
      const rolSelect = document.getElementById("rol")
      rolSelect.style.borderColor = "#ef4444"
      rolSelect.style.backgroundColor = "#fee2e2"

      setTimeout(() => {
        rolSelect.style.borderColor = ""
        rolSelect.style.backgroundColor = ""
      }, 3000)

      return
    }

    // Mostrar indicador de carga
    const submitBtn = loginForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando acceso...'
    submitBtn.disabled = true

    try {
      const response = await fetch("login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(loginData),
      })

      const result = await response.json()

      if (result.success) {
        localStorage.setItem("currentUser", JSON.stringify(result.usuario))
        showMessage("✅ ¡Acceso autorizado! Redirigiendo...", "success")

        setTimeout(() => {
          window.location.href = "dashboard.html"
        }, 1500)
      } else {
        showMessage(result.message, "error")
      }
    } catch (error) {
      console.error("Error:", error)
      showMessage("💥 Error de conexión con el servidor. Verifica que el servidor esté ejecutándose.", "error")
    } finally {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  })

  function setupRealTimeValidation() {
    const emailInput = document.getElementById("email")
    const rolSelect = document.getElementById("rol")

    emailInput.addEventListener("input", () => {
      const email = emailInput.value.trim().toLowerCase()
      const rolEsperado = EMAIL_ROL_MAP[email]

      if (rolEsperado) {
        // Auto-seleccionar el rol correcto
        rolSelect.value = rolEsperado
        rolSelect.style.borderColor = "#10b981"
        rolSelect.style.backgroundColor = "#d1fae5"

        // Deshabilitar otras opciones
        Array.from(rolSelect.options).forEach((option) => {
          if (option.value && option.value !== rolEsperado) {
            option.disabled = true
            option.style.color = "#9ca3af"
          } else {
            option.disabled = false
            option.style.color = ""
          }
        })

        showValidationMessage(`✅ Email válido. Rol asignado: ${getRoleLabel(rolEsperado)}`, "success")
      } else if (email) {
        rolSelect.value = ""
        rolSelect.style.borderColor = "#ef4444"
        rolSelect.style.backgroundColor = "#fee2e2"

        // Deshabilitar todas las opciones de rol
        Array.from(rolSelect.options).forEach((option) => {
          if (option.value) {
            option.disabled = true
            option.style.color = "#9ca3af"
          }
        })

        showValidationMessage("❌ Email no autorizado", "error")
      } else {
        // Limpiar validación
        rolSelect.style.borderColor = ""
        rolSelect.style.backgroundColor = ""
        Array.from(rolSelect.options).forEach((option) => {
          option.disabled = false
          option.style.color = ""
        })
        clearValidationMessage()
      }
    })
  }

  function setupQuickLogin() {
    const demoUsers = document.querySelectorAll(".user-demo")

    demoUsers.forEach((userDemo, index) => {
      userDemo.style.cursor = "pointer"
      userDemo.title = "Clic para autocompletar"

      userDemo.addEventListener("click", () => {
        const emails = ["cliente@prueba.com", "doctor@prueba.com", "admin@prueba.com"]
        const roles = ["cliente", "doctor", "admin"]

        document.getElementById("email").value = emails[index]
        document.getElementById("password").value = "password123"
        document.getElementById("rol").value = roles[index]

        // Disparar evento de validación
        document.getElementById("email").dispatchEvent(new Event("input"))

        // Efecto visual
        userDemo.style.background = "#dbeafe"
        setTimeout(() => {
          userDemo.style.background = "white"
        }, 300)
      })
    })
  }

  function showValidationMessage(message, type) {
    clearValidationMessage()

    const messageDiv = document.createElement("div")
    messageDiv.className = `validation-message ${type}`
    messageDiv.innerHTML = message
    messageDiv.style.cssText = `
      padding: 0.5rem;
      border-radius: 6px;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      ${
        type === "error"
          ? "background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;"
          : "background: #d1fae5; color: #065f46; border: 1px solid #86efac;"
      }
    `

    const rolGroup = document.getElementById("rol").parentElement
    rolGroup.appendChild(messageDiv)
  }

  function clearValidationMessage() {
    const existing = document.querySelector(".validation-message")
    if (existing) {
      existing.remove()
    }
  }

  function showMessage(message, type) {
    const existingMessage = document.querySelector(".error-message, .success-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    const messageDiv = document.createElement("div")
    messageDiv.className = type === "error" ? "error-message" : "success-message"
    messageDiv.innerHTML = `
      <i class="fas fa-${type === "error" ? "exclamation-triangle" : "check-circle"}"></i>
      <span style="white-space: pre-line;">${message}</span>
    `

    const loginForm = document.getElementById("loginForm")
    loginForm.parentNode.insertBefore(messageDiv, loginForm.nextSibling)

    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove()
      }
    }, 8000)
  }

  function getRoleLabel(role) {
    switch (role) {
      case "cliente":
        return "Cliente"
      case "doctor":
        return "Doctor"
      case "admin":
        return "Administrador"
      default:
        return role
    }
  }
})
