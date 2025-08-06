"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Plus, Calendar, FileText, Heart, Weight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface User {
  id: string
  name: string
  email: string
  role: "client" | "doctor" | "admin"
}

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: number
  weight: number
  color: string
  owner: string
  medicalHistory: MedicalRecord[]
}

interface MedicalRecord {
  id: string
  date: string
  type: "consultation" | "vaccination" | "surgery" | "treatment"
  description: string
  doctor: string
  notes?: string
}

interface PetManagementProps {
  user: User
}

export default function PetManagement({ user }: PetManagementProps) {
  const [pets, setPets] = useState<Pet[]>([
    {
      id: "1",
      name: "Max",
      species: "Perro",
      breed: "Golden Retriever",
      age: 3,
      weight: 28.5,
      color: "Dorado",
      owner: user.name,
      medicalHistory: [
        {
          id: "1",
          date: "2024-01-10",
          type: "consultation",
          description: "Consulta general de rutina",
          doctor: "Dr. García",
          notes: "Mascota en excelente estado de salud",
        },
        {
          id: "2",
          date: "2023-12-15",
          type: "vaccination",
          description: "Vacuna antirrábica anual",
          doctor: "Dr. Martínez",
        },
      ],
    },
    {
      id: "2",
      name: "Luna",
      species: "Gato",
      breed: "Siamés",
      age: 2,
      weight: 4.2,
      color: "Gris y blanco",
      owner: user.name,
      medicalHistory: [
        {
          id: "3",
          date: "2024-01-05",
          type: "treatment",
          description: "Tratamiento para parásitos",
          doctor: "Dr. López",
          notes: "Respuesta positiva al tratamiento",
        },
      ],
    },
    {
      id: "3",
      name: "Rocky",
      species: "Perro",
      breed: "Bulldog Francés",
      age: 5,
      weight: 12.8,
      color: "Negro",
      owner: user.name,
      medicalHistory: [
        {
          id: "4",
          date: "2023-11-20",
          type: "surgery",
          description: "Cirugía de esterilización",
          doctor: "Dr. García",
          notes: "Recuperación exitosa",
        },
      ],
    },
  ])

  const [newPet, setNewPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
  })

  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPetDetailOpen, setIsPetDetailOpen] = useState(false)

  const handleCreatePet = () => {
    const pet: Pet = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPet.name,
      species: newPet.species,
      breed: newPet.breed,
      age: Number.parseInt(newPet.age),
      weight: Number.parseFloat(newPet.weight),
      color: newPet.color,
      owner: user.name,
      medicalHistory: [],
    }
    setPets([...pets, pet])
    setNewPet({
      name: "",
      species: "",
      breed: "",
      age: "",
      weight: "",
      color: "",
    })
    setIsDialogOpen(false)
  }

  const getRecordTypeLabel = (type: string) => {
    switch (type) {
      case "consultation":
        return "Consulta"
      case "vaccination":
        return "Vacunación"
      case "surgery":
        return "Cirugía"
      case "treatment":
        return "Tratamiento"
      default:
        return type
    }
  }

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-blue-100 text-blue-800"
      case "vaccination":
        return "bg-green-100 text-green-800"
      case "surgery":
        return "bg-red-100 text-red-800"
      case "treatment":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mis Mascotas</h2>
          <p className="text-gray-600">Gestiona la información y historial médico de tus mascotas</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Mascota
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Mascota</DialogTitle>
              <DialogDescription>Completa la información básica de tu mascota</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  placeholder="Ej: Max"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Especie</Label>
                <Select value={newPet.species} onValueChange={(value) => setNewPet({ ...newPet, species: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la especie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Perro">Perro</SelectItem>
                    <SelectItem value="Gato">Gato</SelectItem>
                    <SelectItem value="Conejo">Conejo</SelectItem>
                    <SelectItem value="Ave">Ave</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Raza</Label>
                <Input
                  id="breed"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                  placeholder="Ej: Golden Retriever"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Edad (años)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPet.age}
                    onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                    placeholder="25.5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={newPet.color}
                  onChange={(e) => setNewPet({ ...newPet, color: e.target.value })}
                  placeholder="Ej: Dorado"
                />
              </div>

              <Button
                onClick={handleCreatePet}
                className="w-full"
                disabled={!newPet.name || !newPet.species || !newPet.breed || !newPet.age || !newPet.weight}
              >
                Registrar Mascota
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Card key={pet.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent
              className="p-6"
              onClick={() => {
                setSelectedPet(pet)
                setIsPetDetailOpen(true)
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <PawPrint className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{pet.name}</h3>
                  <p className="text-sm text-gray-600">
                    {pet.species} • {pet.breed}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{pet.age} años</span>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4" />
                  <span>{pet.weight} kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{pet.color}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">{pet.medicalHistory.length} registros médicos</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {pets.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <PawPrint className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes mascotas registradas</h3>
              <p className="text-gray-600">
                Registra tu primera mascota para comenzar a gestionar su información médica
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pet Detail Dialog */}
      <Dialog open={isPetDetailOpen} onOpenChange={setIsPetDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedPet && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <PawPrint className="h-6 w-6 text-blue-600" />
                  {selectedPet.name}
                </DialogTitle>
                <DialogDescription>Información completa y historial médico</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Información General</TabsTrigger>
                  <TabsTrigger value="history">Historial Médico</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Información Básica</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <Label className="text-xs text-gray-500">Nombre</Label>
                          <p className="font-medium">{selectedPet.name}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Especie</Label>
                          <p className="font-medium">{selectedPet.species}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Raza</Label>
                          <p className="font-medium">{selectedPet.breed}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Color</Label>
                          <p className="font-medium">{selectedPet.color}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Datos Físicos</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <Label className="text-xs text-gray-500">Edad</Label>
                          <p className="font-medium">{selectedPet.age} años</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Peso</Label>
                          <p className="font-medium">{selectedPet.weight} kg</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Propietario</Label>
                          <p className="font-medium">{selectedPet.owner}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Historial Médico</h3>
                    <Badge variant="outline">{selectedPet.medicalHistory.length} registros</Badge>
                  </div>

                  <div className="space-y-4">
                    {selectedPet.medicalHistory.map((record) => (
                      <Card key={record.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-600" />
                              <div>
                                <h4 className="font-medium">{record.description}</h4>
                                <p className="text-sm text-gray-600">Dr. {record.doctor}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getRecordTypeColor(record.type)}>
                                {getRecordTypeLabel(record.type)}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{new Date(record.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          {record.notes && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-700">{record.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}

                    {selectedPet.medicalHistory.length === 0 && (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600">No hay registros médicos disponibles</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
