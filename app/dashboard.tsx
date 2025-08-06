"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Users, LogOut, Clock, User, PawPrint, Stethoscope, Bell, CreditCard, FileText } from "lucide-react"
import AppointmentSystem from "./components/appointment-system"
import PetManagement from "./components/pet-management"
import UserProfile from "./components/user-profile"
import PaymentSystem from "./components/payment-system"
import MedicalRecords from "./components/medical-records"

interface DashboardProps {
  user: {
    id: string
    name: string
    email: string
    role: "client" | "doctor" | "admin"
  }
  onLogout: () => void
}

type ActiveSection = "dashboard" | "appointments" | "pets" | "profile" | "users" | "payments" | "medical"

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "client":
        return "Cliente"
      case "doctor":
        return "Doctor"
      case "admin":
        return "Administrativo"
      default:
        return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "client":
        return "bg-blue-100 text-blue-800"
      case "doctor":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMenuItems = () => {
    const baseItems = [
      { id: "dashboard", label: "Dashboard", icon: Calendar },
      { id: "appointments", label: "Citas", icon: Clock },
      { id: "profile", label: "Perfil", icon: User },
    ]

    if (user.role === "client") {
      baseItems.splice(2, 0, { id: "pets", label: "Mis Mascotas", icon: PawPrint })
      baseItems.splice(3, 0, { id: "payments", label: "Mis Pagos", icon: CreditCard })
      baseItems.splice(4, 0, { id: "medical", label: "Historial Clínico", icon: FileText })
    }

    if (user.role === "doctor") {
      baseItems.splice(2, 0, { id: "medical", label: "Registros Médicos", icon: FileText })
      baseItems.splice(3, 0, { id: "payments", label: "Ingresos", icon: CreditCard })
    }

    if (user.role === "admin") {
      baseItems.push({ id: "users", label: "Usuarios", icon: Users })
      baseItems.push({ id: "payments", label: "Pagos", icon: CreditCard })
      baseItems.push({ id: "medical", label: "Registros Médicos", icon: FileText })
    }

    return baseItems
  }

  const renderDashboardContent = () => {
    const stats = {
      client: [
        { title: "Mis Mascotas", value: "3", icon: PawPrint, color: "text-blue-600" },
        { title: "Citas Pendientes", value: "2", icon: Clock, color: "text-orange-600" },
        { title: "Próxima Cita", value: "Mañana", icon: Calendar, color: "text-green-600" },
      ],
      doctor: [
        { title: "Citas Hoy", value: "8", icon: Calendar, color: "text-blue-600" },
        { title: "Pacientes", value: "45", icon: PawPrint, color: "text-green-600" },
        { title: "Consultas", value: "156", icon: Stethoscope, color: "text-purple-600" },
      ],
      admin: [
        { title: "Citas Hoy", value: "24", icon: Calendar, color: "text-blue-600" },
        { title: "Doctores", value: "5", icon: Users, color: "text-green-600" },
        { title: "Clientes", value: "128", icon: User, color: "text-purple-600" },
      ],
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido, {user.name}</h2>
          <p className="text-gray-600">
            {user.role === "client" && "Gestiona las citas y el cuidado de tus mascotas"}
            {user.role === "doctor" && "Revisa tu agenda y pacientes del día"}
            {user.role === "admin" && "Panel de administración del sistema"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats[user.role].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Próximas Citas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.role === "client" ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Consulta General - Max</p>
                        <p className="text-sm text-gray-600">Dr. García</p>
                      </div>
                      <Badge variant="outline">Mañana 10:00</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Vacunación - Luna</p>
                        <p className="text-sm text-gray-600">Dr. Martínez</p>
                      </div>
                      <Badge variant="outline">Viernes 15:30</Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Consulta - Rocky (Juan Pérez)</p>
                        <p className="text-sm text-gray-600">Consulta general</p>
                      </div>
                      <Badge variant="outline">14:00</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Cirugía - Mimi (Ana López)</p>
                        <p className="text-sm text-gray-600">Esterilización</p>
                      </div>
                      <Badge variant="outline">16:30</Badge>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Recordatorio de vacuna</p>
                    <p className="text-xs text-gray-600">Max necesita su refuerzo anual</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Cita confirmada</p>
                    <p className="text-xs text-gray-600">Tu cita de mañana está confirmada</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboardContent()
      case "appointments":
        return <AppointmentSystem user={user} />
      case "pets":
        return <PetManagement user={user} />
      case "profile":
        return <UserProfile user={user} />
      case "users":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Panel de administración de usuarios en desarrollo...</p>
              </CardContent>
            </Card>
          </div>
        )
      case "payments":
        return <PaymentSystem user={user} />
      case "medical":
        return <MedicalRecords user={user} />
      default:
        return renderDashboardContent()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">SPA VETERINARIO</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <Badge className={`text-xs ${getRoleColor(user.role)}`}>{getRoleLabel(user.role)}</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 space-y-2">
            <nav className="space-y-1">
              {getMenuItems().map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(item.id as ActiveSection)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}
