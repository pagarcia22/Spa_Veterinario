"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, PawPrint, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Appointment {
  id: string
  petName: string
  ownerName: string
  doctorName: string
  date: string
  time: string
  service: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
}

interface AppointmentSystemProps {
  user: {
    id: string
    name: string
    email: string
    role: "client" | "doctor" | "admin"
  }
}

export default function AppointmentSystem({ user }: AppointmentSystemProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      petName: "Max",
      ownerName: "Juan Pérez",
      doctorName: "Dr. García",
      date: "2024-01-15",
      time: "10:00",
      service: "Consulta General",
      status: "confirmed",
      notes: "Revisión rutinaria",
    },
    {
      id: "2",
      petName: "Luna",
      ownerName: "María López",
      doctorName: "Dr. Martínez",
      date: "2024-01-16",
      time: "15:30",
      service: "Vacunación",
      status: "pending",
    },
    {
      id: "3",
      petName: "Rocky",
      ownerName: "Carlos Ruiz",
      doctorName: "Dr. García",
      date: "2024-01-14",
      time: "14:00",
      service: "Cirugía Menor",
      status: "completed",
    },
  ])

  const [newAppointment, setNewAppointment] = useState({
    petName: "",
    ownerName: user.role === "client" ? user.name : "",
    doctorName: "",
    date: "",
    time: "",
    service: "",
    notes: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateAppointment = () => {
    const appointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAppointment,
      status: "pending",
    }
    setAppointments([...appointments, appointment])
    setNewAppointment({
      petName: "",
      ownerName: user.role === "client" ? user.name : "",
      doctorName: "",
      date: "",
      time: "",
      service: "",
      notes: "",
    })
    setIsDialogOpen(false)
  }

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "confirmed":
        return "Confirmada"
      case "completed":
        return "Completada"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  const filteredAppointments =
    user.role === "client" ? appointments.filter((apt) => apt.ownerName === user.name) : appointments

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sistema de Citas</h2>
          <p className="text-gray-600">
            {user.role === "client" && "Gestiona las citas de tus mascotas"}
            {user.role === "doctor" && "Revisa y gestiona tus citas programadas"}
            {user.role === "admin" && "Administra todas las citas del sistema"}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Cita
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Agendar Nueva Cita</DialogTitle>
              <DialogDescription>Completa los datos para agendar una nueva cita</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="petName">Nombre de la Mascota</Label>
                <Input
                  id="petName"
                  value={newAppointment.petName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, petName: e.target.value })}
                  placeholder="Ej: Max"
                />
              </div>

              {user.role !== "client" && (
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Nombre del Propietario</Label>
                  <Input
                    id="ownerName"
                    value={newAppointment.ownerName}
                    onChange={(e) => setNewAppointment({ ...newAppointment, ownerName: e.target.value })}
                    placeholder="Nombre completo"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor</Label>
                <Select
                  value={newAppointment.doctorName}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, doctorName: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. García">Dr. García</SelectItem>
                    <SelectItem value="Dr. Martínez">Dr. Martínez</SelectItem>
                    <SelectItem value="Dr. López">Dr. López</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Servicio</Label>
                <Select
                  value={newAppointment.service}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consulta General">Consulta General</SelectItem>
                    <SelectItem value="Vacunación">Vacunación</SelectItem>
                    <SelectItem value="Cirugía">Cirugía</SelectItem>
                    <SelectItem value="Emergencia">Emergencia</SelectItem>
                    <SelectItem value="Control">Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas (Opcional)</Label>
                <Textarea
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  placeholder="Información adicional..."
                  rows={3}
                />
              </div>

              <Button
                onClick={handleCreateAppointment}
                className="w-full"
                disabled={
                  !newAppointment.petName ||
                  !newAppointment.doctorName ||
                  !newAppointment.date ||
                  !newAppointment.time ||
                  !newAppointment.service
                }
              >
                Agendar Cita
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <PawPrint className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">{appointment.petName}</h3>
                    <Badge className={getStatusColor(appointment.status)}>{getStatusLabel(appointment.status)}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4" />
                      <span>Propietario: {appointment.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4" />
                      <span>Doctor: {appointment.doctorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Fecha: {new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Hora: {appointment.time}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="font-medium text-gray-800">Servicio: {appointment.service}</p>
                    {appointment.notes && <p className="text-sm text-gray-600 mt-1">Notas: {appointment.notes}</p>}
                  </div>
                </div>

                {(user.role === "doctor" || user.role === "admin") && appointment.status === "pending" && (
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirmar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                  </div>
                )}

                {(user.role === "doctor" || user.role === "admin") && appointment.status === "confirmed" && (
                  <Button size="sm" onClick={() => updateAppointmentStatus(appointment.id, "completed")}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No hay citas programadas</h3>
              <p className="text-gray-600">Agenda tu primera cita haciendo clic en "Nueva Cita"</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
