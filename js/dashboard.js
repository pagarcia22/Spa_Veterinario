// Variables globales
let currentUser = null
let appointments = []
let pets = []
let payments = []
let medicalRecords = []

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación
  const userData = localStorage.getItem("currentUser")
  if (!userData) {
    window.location.href = "index.html"
    return
  }

  try {
    currentUser = JSON.parse(userData)

    // Validar que el usuario tenga los campos necesarios
    if (!currentUser.id || !currentUser.nombre || !currentUser.rol) {
      throw new Error("Datos de usuario inválidos")
    }

    initializeDashboard()
    loadData()
    setupEventListeners()
  } catch (error) {
    console.error("Error al cargar datos de usuario:", error)
    localStorage.removeItem("currentUser")
    window.location.href = "index.html"
  }
})

function initializeDashboard() {
  // Configurar información del usuario
  document.getElementById("userName").textContent = currentUser.nombre
  document.getElementById("userRole").textContent = getRoleLabel(currentUser.rol)
  document.getElementById("userInitial").textContent = currentUser.nombre.charAt(0).toUpperCase()

  // Configurar perfil
  document.getElementById("profileName").textContent = currentUser.nombre
  document.getElementById("profileRole").textContent = getRoleLabel(currentUser.rol)
  document.getElementById("profileEmail").textContent = currentUser.email
  document.getElementById("profilePhone").textContent = currentUser.telefono || "+1234567890"
  document.getElementById("profileAddress").textContent = currentUser.direccion || "Dirección no especificada"
  document.getElementById("profileInitial").textContent = currentUser.nombre.charAt(0).toUpperCase()

  // Configurar navegación según el rol
  setupRoleBasedNavigation()

  // Configurar mensajes de bienvenida
  setupWelcomeMessages()

  console.log(`Dashboard inicializado para: ${currentUser.nombre} (${currentUser.rol})`)
}

function setupRoleBasedNavigation() {
  const clientOnlyElements = document.querySelectorAll(".client-only")
  const doctorOnlyElements = document.querySelectorAll(".doctor-only")
  const adminOnlyElements = document.querySelectorAll(".admin-only")

  // Ocultar todos los elementos específicos de rol
  clientOnlyElements.forEach((el) => el.classList.remove("show"))
  doctorOnlyElements.forEach((el) => el.classList.remove("show"))
  adminOnlyElements.forEach((el) => el.classList.remove("show"))

  // Mostrar elementos según el rol
  if (currentUser.rol === "cliente") {
    clientOnlyElements.forEach((el) => el.classList.add("show"))
    document.getElementById("paymentsLabel").textContent = "Mis Pagos"
    document.getElementById("medicalLabel").textContent = "Historial Clínico"
  } else if (currentUser.rol === "doctor") {
    doctorOnlyElements.forEach((el) => el.classList.add("show"))
    document.getElementById("paymentsLabel").textContent = "Ingresos"
    document.getElementById("medicalLabel").textContent = "Registros Médicos"
  } else if (currentUser.rol === "admin") {
    adminOnlyElements.forEach((el) => el.classList.add("show"))
    document.getElementById("paymentsLabel").textContent = "Gestión de Pagos"
    document.getElementById("medicalLabel").textContent = "Todos los Registros"
  }
}

function setupWelcomeMessages() {
  const welcomeMessage = document.getElementById("welcomeMessage")
  const welcomeDescription = document.getElementById("welcomeDescription")

  welcomeMessage.textContent = `Bienvenido, ${currentUser.nombre}`

  switch (currentUser.rol) {
    case "cliente":
      welcomeDescription.textContent = "Gestiona las citas y el cuidado de tus mascotas"
      break
    case "doctor":
      welcomeDescription.textContent = "Revisa tu agenda y pacientes del día"
      break
    case "admin":
      welcomeDescription.textContent = "Panel de administración del sistema"
      break
  }
}

function loadData() {
  // Cargar datos simulados (en producción serían llamadas AJAX al servidor)
  loadAppointments()
  loadPets()
  loadPayments()
  loadMedicalRecords()
  updateDashboardStats()
}

function loadAppointments() {
  // Datos simulados de citas basados en el usuario actual
  if (currentUser.rol === "cliente") {
    appointments = [
      {
        id: 1,
        mascota_nombre: "Max",
        propietario: currentUser.nombre,
        doctor: "Doctor Prueba",
        fecha: "2024-01-16",
        hora: "10:00",
        servicio: "Consulta General",
        estado: "confirmada",
        notas: "Revisión rutinaria",
      },
      {
        id: 2,
        mascota_nombre: "Luna",
        propietario: currentUser.nombre,
        doctor: "Doctor Prueba",
        fecha: "2024-01-17",
        hora: "15:30",
        servicio: "Vacunación",
        estado: "pendiente",
        notas: "Vacuna anual",
      },
    ]
  } else if (currentUser.rol === "doctor") {
    appointments = [
      {
        id: 1,
        mascota_nombre: "Max",
        propietario: "Cliente Prueba",
        doctor: currentUser.nombre,
        fecha: "2024-01-16",
        hora: "10:00",
        servicio: "Consulta General",
        estado: "confirmada",
        notas: "Revisión rutinaria",
      },
      {
        id: 2,
        mascota_nombre: "Luna",
        propietario: "Cliente Prueba",
        doctor: currentUser.nombre,
        fecha: "2024-01-17",
        hora: "15:30",
        servicio: "Vacunación",
        estado: "pendiente",
        notas: "Vacuna anual",
      },
    ]
  } else {
    // Admin ve todas las citas
    appointments = [
      {
        id: 1,
        mascota_nombre: "Max",
        propietario: "Cliente Prueba",
        doctor: "Doctor Prueba",
        fecha: "2024-01-16",
        hora: "10:00",
        servicio: "Consulta General",
        estado: "confirmada",
        notas: "Revisión rutinaria",
      },
      {
        id: 2,
        mascota_nombre: "Luna",
        propietario: "Cliente Prueba",
        doctor: "Doctor Prueba",
        fecha: "2024-01-17",
        hora: "15:30",
        servicio: "Vacunación",
        estado: "pendiente",
        notas: "Vacuna anual",
      },
    ]
  }

  renderAppointments()
}

function loadPets() {
  if (currentUser.rol === "cliente") {
    pets = [
      {
        id: 1,
        nombre: "Max",
        especie: "Perro",
        raza: "Golden Retriever",
        edad: 3,
        peso: 28.5,
        color: "Dorado",
        propietario: currentUser.nombre,
      },
      {
        id: 2,
        nombre: "Luna",
        especie: "Gato",
        raza: "Siamés",
        edad: 2,
        peso: 4.2,
        color: "Gris y blanco",
        propietario: currentUser.nombre,
      },
      {
        id: 3,
        nombre: "Rocky",
        especie: "Perro",
        raza: "Bulldog Francés",
        edad: 5,
        peso: 12.8,
        color: "Negro",
        propietario: currentUser.nombre,
      },
    ]

    renderPets()
  }
}

function loadPayments() {
  const basePayments = [
    {
      id: 1,
      cliente: "Cliente Prueba",
      mascota: "Max",
      doctor: "Doctor Prueba",
      servicio: "Consulta General + Vacuna",
      monto: 85.0,
      fecha: "2024-01-15",
      estado: "pendiente",
    },
    {
      id: 2,
      cliente: "Cliente Prueba",
      mascota: "Luna",
      doctor: "Doctor Prueba",
      servicio: "Vacunación Anual",
      monto: 65.0,
      fecha: "2024-01-12",
      estado: "pagado",
      metodo_pago: "Tarjeta de Crédito",
      numero_transaccion: "TXN-001234",
    },
    {
      id: 3,
      cliente: "Cliente Prueba",
      mascota: "Rocky",
      doctor: "Doctor Prueba",
      servicio: "Cirugía Menor",
      monto: 350.0,
      fecha: "2024-01-10",
      estado: "pendiente",
    },
  ]

  // Filtrar según el rol
  if (currentUser.rol === "cliente") {
    payments = basePayments.filter((p) => p.cliente === "Cliente Prueba")
  } else if (currentUser.rol === "doctor") {
    payments = basePayments.filter((p) => p.doctor === "Doctor Prueba")
  } else {
    payments = basePayments
  }

  renderPayments()
  updatePaymentStats()
}

function loadMedicalRecords() {
  const baseRecords = [
    {
      id: 1,
      mascota: "Max",
      propietario: "Cliente Prueba",
      doctor: "Doctor Prueba",
      fecha: "2024-01-15",
      tipo: "consulta",
      diagnostico: "Otitis externa leve en oído derecho",
      tratamiento: "Limpieza auricular y aplicación de gotas antibióticas",
      medicamentos: "Otomax gotas - 1 gota cada 12 horas por 7 días",
      notas: "Control en 1 semana. Evitar que se moje las orejas.",
      costo: 85.0,
    },
    {
      id: 2,
      mascota: "Luna",
      propietario: "Cliente Prueba",
      doctor: "Doctor Prueba",
      fecha: "2024-01-12",
      tipo: "vacunacion",
      diagnostico: "Vacunación preventiva anual",
      tratamiento: "Aplicación de vacuna múltiple (DHPP) y antirrábica",
      medicamentos: "No requiere medicación",
      notas: "Próxima vacunación en 12 meses. Mascota en excelente estado.",
      costo: 65.0,
    },
  ]

  // Filtrar según el rol
  if (currentUser.rol === "cliente") {
    medicalRecords = baseRecords.filter((r) => r.propietario === "Cliente Prueba")
  } else if (currentUser.rol === "doctor") {
    medicalRecords = baseRecords.filter((r) => r.doctor === "Doctor Prueba")
  } else {
    medicalRecords = baseRecords
  }

  renderMedicalRecords()
}

function setupEventListeners() {
  // Navegación
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const section = this.dataset.section
      showSection(section)

      // Actualizar navegación activa
      navItems.forEach((nav) => nav.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
      const response = await fetch("logout", {
        method: "POST",
      })

      const result = await response.json()

      if (result.success) {
        localStorage.removeItem("currentUser")
        window.location.href = "index.html"
      }
    } catch (error) {
      console.error("Error en logout:", error)
      // Forzar logout local si hay error
      localStorage.removeItem("currentUser")
      window.location.href = "index.html"
    }
  })

  // Modales
  setupModalListeners()
}

function setupModalListeners() {
  // Modal de citas
  const newAppointmentBtn = document.getElementById("newAppointmentBtn")
  const appointmentForm = document.getElementById("appointmentForm")

  if (newAppointmentBtn) {
    newAppointmentBtn.addEventListener("click", () => {
      showModal("appointmentModal")
    })
  }

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handleNewAppointment()
    })
  }

  // Modal de pagos
  const paymentForm = document.getElementById("paymentForm")

  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handlePayment()
    })
  }

  // Cerrar modales
  document.querySelectorAll(".modal-close, .modal-cancel").forEach((btn) => {
    btn.addEventListener("click", () => {
      hideAllModals()
    })
  })

  // Cerrar modal al hacer clic fuera
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        hideAllModals()
      }
    })
  })
}

function showSection(sectionName) {
  // Ocultar todas las secciones
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Mostrar la sección seleccionada
  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.classList.add("active")
  }
}

function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
  }
}

function hideAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("active")
  })
}

function renderAppointments() {
  const appointmentsList = document.getElementById("appointmentsList")
  const upcomingAppointments = document.getElementById("upcomingAppointments")

  if (!appointmentsList) return

  appointmentsList.innerHTML = ""

  appointments.forEach((appointment) => {
    const appointmentElement = createAppointmentElement(appointment)
    appointmentsList.appendChild(appointmentElement)
  })

  // Actualizar próximas citas en el dashboard
  if (upcomingAppointments) {
    upcomingAppointments.innerHTML = ""
    appointments.slice(0, 2).forEach((appointment) => {
      const item = document.createElement("div")
      item.className = "appointment-item"
      item.innerHTML = `
                <div>
                    <p class="font-medium">${appointment.servicio} - ${appointment.mascota_nombre}</p>
                    <p class="text-sm text-gray-600">${appointment.doctor}</p>
                </div>
                <span class="badge ${appointment.estado}">${getStatusLabel(appointment.estado)}</span>
            `
      upcomingAppointments.appendChild(item)
    })
  }
}

function createAppointmentElement(appointment) {
  const div = document.createElement("div")
  div.className = "list-item"

  div.innerHTML = `
        <div class="item-header">
            <div class="item-title">
                <i class="fas fa-paw"></i>
                <h3>${appointment.mascota_nombre}</h3>
                <span class="badge ${appointment.estado}">${getStatusLabel(appointment.estado)}</span>
            </div>
            <div class="item-actions">
                ${
                  currentUser.rol !== "cliente" && appointment.estado === "pendiente"
                    ? `
                    <button class="btn-secondary" onclick="updateAppointmentStatus(${appointment.id}, 'confirmada')">
                        <i class="fas fa-check"></i> Confirmar
                    </button>
                `
                    : ""
                }
            </div>
        </div>
        <div class="item-details">
            <div><strong>Propietario:</strong> ${appointment.propietario}</div>
            <div><strong>Doctor:</strong> ${appointment.doctor}</div>
            <div><strong>Fecha:</strong> ${formatDate(appointment.fecha)}</div>
            <div><strong>Hora:</strong> ${appointment.hora}</div>
            <div><strong>Servicio:</strong> ${appointment.servicio}</div>
        </div>
        ${appointment.notas ? `<p class="mt-2 text-sm text-gray-600">${appointment.notas}</p>` : ""}
    `

  return div
}

function renderPets() {
  const petsList = document.getElementById("petsList")
  if (!petsList) return

  petsList.innerHTML = ""

  pets.forEach((pet) => {
    const petElement = createPetElement(pet)
    petsList.appendChild(petElement)
  })
}

function createPetElement(pet) {
  const div = document.createElement("div")
  div.className = "pet-card"

  div.innerHTML = `
        <div class="pet-header">
            <div class="pet-avatar">
                <i class="fas fa-paw"></i>
            </div>
            <div class="pet-info">
                <h3>${pet.nombre}</h3>
                <p>${pet.especie} • ${pet.raza}</p>
            </div>
        </div>
        <div class="pet-details">
            <div class="pet-detail">
                <i class="fas fa-calendar"></i>
                <span>${pet.edad} años</span>
            </div>
            <div class="pet-detail">
                <i class="fas fa-weight"></i>
                <span>${pet.peso} kg</span>
            </div>
            <div class="pet-detail">
                <i class="fas fa-heart"></i>
                <span>${pet.color}</span>
            </div>
        </div>
    `

  return div
}

function renderPayments() {
  const paymentsList = document.getElementById("paymentsList")
  if (!paymentsList) return

  paymentsList.innerHTML = ""

  payments.forEach((payment) => {
    const paymentElement = createPaymentElement(payment)
    paymentsList.appendChild(paymentElement)
  })
}

function createPaymentElement(payment) {
  const div = document.createElement("div")
  div.className = "list-item"

  div.innerHTML = `
        <div class="item-header">
            <div class="item-title">
                <i class="fas fa-credit-card"></i>
                <h3>${payment.servicio}</h3>
                <span class="badge ${payment.estado}">${getPaymentStatusLabel(payment.estado)}</span>
            </div>
            <div class="item-actions">
                ${
                  currentUser.rol === "cliente" && payment.estado === "pendiente"
                    ? `
                    <button class="btn-primary" onclick="processPayment(${payment.id})">
                        <i class="fas fa-credit-card"></i> Pagar
                    </button>
                `
                    : ""
                }
                ${
                  currentUser.rol === "admin" && payment.estado === "pendiente"
                    ? `
                    <button class="btn-secondary" onclick="markAsPaid(${payment.id})">
                        Marcar como Pagado
                    </button>
                `
                    : ""
                }
            </div>
        </div>
        <div class="item-details">
            <div><strong>Cliente:</strong> ${payment.cliente}</div>
            <div><strong>Mascota:</strong> ${payment.mascota}</div>
            <div><strong>Doctor:</strong> ${payment.doctor}</div>
            <div><strong>Fecha:</strong> ${formatDate(payment.fecha)}</div>
            <div><strong>Monto:</strong> $${payment.monto.toFixed(2)}</div>
            ${payment.numero_transaccion ? `<div><strong>Transacción:</strong> ${payment.numero_transaccion}</div>` : ""}
        </div>
    `

  return div
}

function renderMedicalRecords() {
  const medicalList = document.getElementById("medicalList")
  if (!medicalList) return

  medicalList.innerHTML = ""

  medicalRecords.forEach((record) => {
    const recordElement = createMedicalRecordElement(record)
    medicalList.appendChild(recordElement)
  })
}

function createMedicalRecordElement(record) {
  const div = document.createElement("div")
  div.className = "list-item"

  div.innerHTML = `
        <div class="item-header">
            <div class="item-title">
                <i class="fas fa-stethoscope"></i>
                <div>
                    <h3>${record.mascota}</h3>
                    <p class="text-sm text-gray-600">Propietario: ${record.propietario}</p>
                </div>
                <span class="badge ${record.tipo}">${getRecordTypeLabel(record.tipo)}</span>
            </div>
            <div class="text-right">
                <p class="text-sm text-gray-600">${formatDate(record.fecha)}</p>
                <p class="font-semibold text-green-600">$${record.costo.toFixed(2)}</p>
            </div>
        </div>
        <div class="item-details">
            <div><strong>Doctor:</strong> ${record.doctor}</div>
            <div><strong>Tipo:</strong> ${getRecordTypeLabel(record.tipo)}</div>
        </div>
        <div class="mt-3 space-y-3">
            <div class="bg-blue-50 p-3 rounded-lg">
                <p class="font-medium text-sm text-gray-700">Diagnóstico:</p>
                <p class="text-sm">${record.diagnostico}</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
                <p class="font-medium text-sm text-gray-700">Tratamiento:</p>
                <p class="text-sm">${record.tratamiento}</p>
            </div>
            ${
              record.medicamentos
                ? `
                <div class="bg-yellow-50 p-3 rounded-lg">
                    <p class="font-medium text-sm text-gray-700">Medicamentos:</p>
                    <p class="text-sm">${record.medicamentos}</p>
                </div>
            `
                : ""
            }
            ${
              record.notas
                ? `
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="font-medium text-sm text-gray-700">Notas:</p>
                    <p class="text-sm">${record.notas}</p>
                </div>
            `
                : ""
            }
        </div>
    `

  return div
}

function updateDashboardStats() {
  const stats = getDashboardStats()

  document.getElementById("stat1Label").textContent = stats.stat1.label
  document.getElementById("stat1Value").textContent = stats.stat1.value
  document.getElementById("stat1Icon").className = `fas ${stats.stat1.icon}`

  document.getElementById("stat2Label").textContent = stats.stat2.label
  document.getElementById("stat2Value").textContent = stats.stat2.value
  document.getElementById("stat2Icon").className = `fas ${stats.stat2.icon}`

  document.getElementById("stat3Label").textContent = stats.stat3.label
  document.getElementById("stat3Value").textContent = stats.stat3.value
  document.getElementById("stat3Icon").className = `fas ${stats.stat3.icon}`
}

function getDashboardStats() {
  switch (currentUser.rol) {
    case "cliente":
      return {
        stat1: { label: "Mis Mascotas", value: pets.length.toString(), icon: "fa-paw" },
        stat2: {
          label: "Citas Pendientes",
          value: appointments.filter((a) => a.estado === "pendiente").length.toString(),
          icon: "fa-clock",
        },
        stat3: { label: "Próxima Cita", value: "Mañana", icon: "fa-calendar" },
      }
    case "doctor":
      return {
        stat1: { label: "Citas Hoy", value: "8", icon: "fa-calendar" },
        stat2: { label: "Pacientes", value: "45", icon: "fa-paw" },
        stat3: { label: "Consultas", value: "156", icon: "fa-stethoscope" },
      }
    case "admin":
      return {
        stat1: { label: "Citas Hoy", value: "24", icon: "fa-calendar" },
        stat2: { label: "Doctores", value: "5", icon: "fa-users" },
        stat3: { label: "Clientes", value: "128", icon: "fa-user" },
      }
    default:
      return {
        stat1: { label: "Total", value: "0", icon: "fa-chart-bar" },
        stat2: { label: "Activos", value: "0", icon: "fa-check" },
        stat3: { label: "Pendientes", value: "0", icon: "fa-clock" },
      }
  }
}

function updatePaymentStats() {
  const total = payments.reduce((sum, p) => sum + p.monto, 0)
  const paid = payments.filter((p) => p.estado === "pagado").reduce((sum, p) => sum + p.monto, 0)
  const pending = payments.filter((p) => p.estado === "pendiente").reduce((sum, p) => sum + p.monto, 0)
  const overdue = payments.filter((p) => p.estado === "vencido").reduce((sum, p) => sum + p.monto, 0)

  document.getElementById("totalAmount").textContent = `$${total.toFixed(2)}`
  document.getElementById("paidAmount").textContent = `$${paid.toFixed(2)}`
  document.getElementById("pendingAmount").textContent = `$${pending.toFixed(2)}`
  document.getElementById("overdueAmount").textContent = `$${overdue.toFixed(2)}`
}

function handleNewAppointment() {
  const formData = new FormData(document.getElementById("appointmentForm"))

  const newAppointment = {
    id: appointments.length + 1,
    mascota_nombre: formData.get("mascota_nombre") || "Nueva Mascota",
    propietario: currentUser.rol === "cliente" ? currentUser.nombre : formData.get("propietario") || "Cliente",
    doctor: currentUser.rol === "doctor" ? currentUser.nombre : formData.get("doctor") || "Doctor Prueba",
    fecha: formData.get("fecha"),
    hora: formData.get("hora"),
    servicio: formData.get("servicio"),
    estado: "pendiente",
    notas: formData.get("notas") || "",
  }

  appointments.unshift(newAppointment)
  renderAppointments()
  hideAllModals()

  // Reset form
  document.getElementById("appointmentForm").reset()
}

function processPayment(paymentId) {
  const payment = payments.find((p) => p.id === paymentId)
  if (!payment) return

  document.getElementById("paymentAmount").textContent = `$${payment.monto.toFixed(2)}`
  document.getElementById("paymentService").textContent = payment.servicio

  showModal("paymentModal")
}

function handlePayment() {
  // Simular procesamiento de pago
  const paymentId = getCurrentPaymentId()
  const payment = payments.find((p) => p.id === paymentId)

  if (payment) {
    payment.estado = "pagado"
    payment.metodo_pago = "Tarjeta de Crédito"
    payment.numero_transaccion = `TXN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    renderPayments()
    updatePaymentStats()
    hideAllModals()

    alert("Pago procesado exitosamente")
  }
}

function getCurrentPaymentId() {
  // Esta función debería obtener el ID del pago actual del modal
  // Por simplicidad, retornamos el primer pago pendiente
  const pendingPayment = payments.find((p) => p.estado === "pendiente")
  return pendingPayment ? pendingPayment.id : null
}

function updateAppointmentStatus(appointmentId, newStatus) {
  const appointment = appointments.find((a) => a.id === appointmentId)
  if (appointment) {
    appointment.estado = newStatus
    renderAppointments()
  }
}

function markAsPaid(paymentId) {
  const payment = payments.find((p) => p.id === paymentId)
  if (payment) {
    payment.estado = "pagado"
    payment.metodo_pago = "Efectivo"
    payment.numero_transaccion = `ADM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    renderPayments()
    updatePaymentStats()
  }
}

// Utility functions
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

function getStatusLabel(status) {
  switch (status) {
    case "pendiente":
      return "Pendiente"
    case "confirmada":
      return "Confirmada"
    case "completada":
      return "Completada"
    case "cancelada":
      return "Cancelada"
    default:
      return status
  }
}

function getPaymentStatusLabel(status) {
  switch (status) {
    case "pendiente":
      return "Pendiente"
    case "pagado":
      return "Pagado"
    case "vencido":
      return "Vencido"
    default:
      return status
  }
}

function getRecordTypeLabel(type) {
  switch (type) {
    case "consulta":
      return "Consulta"
    case "vacunacion":
      return "Vacunación"
    case "cirugia":
      return "Cirugía"
    case "tratamiento":
      return "Tratamiento"
    case "emergencia":
      return "Emergencia"
    default:
      return type
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
