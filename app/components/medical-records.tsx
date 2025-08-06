"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Stethoscope, Pill, DollarSign } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface MedicalRecord {
  id: string
  petName: string
  ownerName: string
  doctorName: string
  date: string
  type: "consultation" | "vaccination" | "surgery" | "treatment" | "emergency"
  diagnosis: string
  treatment: string
  medications: string
  notes: string
  cost: number
  status: "completed" | "in-progress" | "scheduled"
}

interface MedicalRecordsProps {
  user: {
    id: string
    name: string
    email: string
    role: "client" | "doctor" | "admin"
  }
}

export default function MedicalRecords({ user }: MedicalRecordsProps) {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      petName: "Max",
      ownerName: "Juan Pérez",
      doctorName: "Dr. García",
      date: "2024-01-15",
      type: "consultation",
      diagnosis: "Otitis externa leve en oído derecho",
      treatment: "Limpieza auricular y aplicación de gotas antibióticas",
      medications: "Otomax gotas - 1 gota cada 12 horas por 7 días",
      notes: "Control en 1 semana. Evitar que se moje las orejas.",
      cost: 85.0,
      status: "completed",
    },
    {
      id: "2",
      petName: "Luna",
      ownerName: "María López",
      doctorName: "Dr. Martínez",
      date: "2024-01-12",
      type: "vaccination",
      diagnosis: "Vacunación preventiva anual",
      treatment: "Aplicación de vacuna múltiple (DHPP) y antirrábica",
      medications: "No requiere medicación",
      notes: "Próxima vacunación en 12 meses. Mascota en excelente estado.",
      cost: 65.0,
      status: "completed",
    },
    {
      id: "3",
      petName: "Rocky",
      ownerName: "Carlos Ruiz",
      doctorName: "Dr. García",
      date: "2024-01-08",
      type: "surgery",
      diagnosis: "Lipoma benigno en flanco izquierdo",
      treatment: "Extirpación quirúrgica de masa tumoral",
      medications:
        "Amoxicilina 250mg - 1 tableta cada 12 horas por 10 días\nTramadol 50mg - 1/2 tableta cada 8 horas por 5 días",
      notes: "Retirar puntos en 10 días. Mantener herida limpia y seca.",
      cost: 350.0,
      status: "completed",
    },
  ])

  const [newRecord, setNewRecord] = useState({
    petName: "",
    ownerName: "",
    type: "" as MedicalRecord["type"] | "",
    diagnosis: "",
    treatment: "",
    medications: "",
    notes: "",
    cost: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateRecord = () => {
    const record: MedicalRecord = {
      id: Math.random().toString(36).substr(2, 9),
      petName: newRecord.petName,
      ownerName: newRecord.ownerName,
      doctorName: user.name,
      date: new Date().toISOString().split("T")[0],
      type: newRecord.type as MedicalRecord["type"],
      diagnosis: newRecord.diagnosis,
      treatment: newRecord.treatment,
      medications: newRecord.medications,
      notes: newRecord.notes,
      cost: Number.parseFloat(newRecord.cost),
      status: "completed",
    }

    setRecords([record, ...records])
    setNewRecord({
      petName: "",
      ownerName: "",
      type: "",
      diagnosis: "",
      treatment: "",
      medications: "",
      notes: "",
      cost: "",
    })
    setIsDialogOpen(false)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "consultation":
        return "Consulta"
      case "vaccination":
        return "Vacunación"
      case "surgery":
        return "Cirugía"
      case "treatment":
        return "Tratamiento"
      case "emergency":
        return "Emergencia"
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-blue-100 text-blue-800"
      case "vaccination":
        return "bg-green-100 text-green-800"
      case "surgery":
        return "bg-red-100 text-red-800"
      case "treatment":
        return "bg-yellow-100 text-yellow-800"
      case "emergency":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredRecords =
    user.role === "client"
      ? records.filter((r) => r.ownerName === user.name)
      : user.role === "doctor"
        ? records.filter((r) => r.doctorName === user.name)
        : records

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {user.role === "client" && "Historial Clínico"}
            {user.role === "doctor" && "Registros Médicos"}
            {user.role === "admin" && "Todos los Registros Médicos"}
          </h2>
          <p className="text-gray-600">
            {user.role === "client" && "Historial médico completo de tus mascotas"}
            {user.role === "doctor" && "Crea y gestiona registros médicos"}
            {user.role === "admin" && "Supervisa todos los registros del sistema"}
          </p>
        </div>

        {user.role === "doctor" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crear Registro Médico</DialogTitle>
                <DialogDescription>Completa la información del diagnóstico y tratamiento</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Nombre de la Mascota</Label>
                    <Input
                      id="petName"
                      value={newRecord.petName}
                      onChange={(e) => setNewRecord({ ...newRecord, petName: e.target.value })}
                      placeholder="Ej: Max"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Propietario</Label>
                    <Input
                      id="ownerName"
                      value={newRecord.ownerName}
                      onChange={(e) => setNewRecord({ ...newRecord, ownerName: e.target.value })}
                      placeholder="Nombre del propietario"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Consulta</Label>
                    <Select
                      value={newRecord.type}
                      onValueChange={(value: MedicalRecord["type"]) => setNewRecord({ ...newRecord, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consulta General</SelectItem>
                        <SelectItem value="vaccination">Vacunación</SelectItem>
                        <SelectItem value="surgery">Cirugía</SelectItem>
                        <SelectItem value="treatment">Tratamiento</SelectItem>
                        <SelectItem value="emergency">Emergencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Costo del Servicio ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={newRecord.cost}
                      onChange={(e) => setNewRecord({ ...newRecord, cost: e.target.value })}
                      placeholder="85.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnóstico</Label>
                  <Textarea
                    id="diagnosis"
                    value={newRecord.diagnosis}
                    onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                    placeholder="Describe el diagnóstico detallado..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatment">Tratamiento Aplicado</Label>
                  <Textarea
                    id="treatment"
                    value={newRecord.treatment}
                    onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
                    placeholder="Describe el tratamiento realizado..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Medicamentos Recetados</Label>
                  <Textarea
                    id="medications"
                    value={newRecord.medications}
                    onChange={(e) => setNewRecord({ ...newRecord, medications: e.target.value })}
                    placeholder="Lista de medicamentos con dosis y frecuencia..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas Adicionales</Label>
                  <Textarea
                    id="notes"
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                    placeholder="Instrucciones para el propietario, próximas citas, etc..."
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleCreateRecord}
                  className="w-full"
                  disabled={
                    !newRecord.petName ||
                    !newRecord.ownerName ||
                    !newRecord.type ||
                    !newRecord.diagnosis ||
                    !newRecord.treatment ||
                    !newRecord.cost
                  }
                >
                  Crear Registro Médico
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{record.petName}</CardTitle>
                    <p className="text-sm text-gray-600">Propietario: {record.ownerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getTypeColor(record.type)}>{getTypeLabel(record.type)}</Badge>
                  <p className="text-sm text-gray-600 mt-1">{new Date(record.date).toLocaleDateString()}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Doctor</Label>
                  <p className="mt-1">{record.doctorName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Costo del Servicio
                  </Label>
                  <p className="mt-1 text-lg font-semibold text-green-600">${record.cost.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Diagnóstico</Label>
                  <div className="mt-1 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm">{record.diagnosis}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Tratamiento</Label>
                  <div className="mt-1 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm">{record.treatment}</p>
                  </div>
                </div>

                {record.medications && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Pill className="h-4 w-4" />
                      Medicamentos
                    </Label>
                    <div className="mt-1 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm whitespace-pre-line">{record.medications}</p>
                    </div>
                  </div>
                )}

                {record.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Notas e Instrucciones</Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm">{record.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredRecords.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No hay registros médicos</h3>
              <p className="text-gray-600">
                {user.role === "client" && "Los registros médicos de tus mascotas aparecerán aquí"}
                {user.role === "doctor" && "Crea tu primer registro médico"}
                {user.role === "admin" && "No hay registros médicos en el sistema"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
