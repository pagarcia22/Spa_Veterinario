"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Edit, Save, X } from "lucide-react"

interface UserProfileProps {
  user: {
    id: string
    name: string
    email: string
    role: "client" | "doctor" | "admin"
  }
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: "+1 234 567 8900",
    address: "123 Main St, Ciudad, País",
    bio:
      user.role === "doctor"
        ? "Veterinario especializado en medicina interna y cirugía menor. Con más de 10 años de experiencia cuidando mascotas."
        : user.role === "admin"
          ? "Administrador del sistema VetCare, encargado de la gestión operativa de la clínica veterinaria."
          : "Amante de los animales y propietario responsable. Siempre busco el mejor cuidado para mis mascotas.",
  })

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

  const handleSave = () => {
    // Aquí se guardarían los cambios en la base de datos
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Restaurar datos originales
    setProfileData({
      name: user.name,
      email: user.email,
      phone: "+1 234 567 8900",
      address: "123 Main St, Ciudad, País",
      bio:
        user.role === "doctor"
          ? "Veterinario especializado en medicina interna y cirugía menor. Con más de 10 años de experiencia cuidando mascotas."
          : user.role === "admin"
            ? "Administrador del sistema VetCare, encargado de la gestión operativa de la clínica veterinaria."
            : "Amante de los animales y propietario responsable. Siempre busco el mejor cuidado para mis mascotas.",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mi Perfil</h2>
          <p className="text-gray-600">Gestiona tu información personal y preferencias</p>
        </div>

        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="text-2xl">{profileData.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <h3 className="text-xl font-semibold mb-2">{profileData.name}</h3>
            <Badge className={`mb-4 ${getRoleColor(user.role)}`}>{getRoleLabel(user.role)}</Badge>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-center">{profileData.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              {isEditing ? "Edita tu información personal" : "Tu información personal actual"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{profileData.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{profileData.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{profileData.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <p className="p-2 bg-gray-50 rounded-md">{getRoleLabel(user.role)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{profileData.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Cuéntanos un poco sobre ti..."
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-md">{profileData.bio}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information based on role */}
      {user.role === "doctor" && (
        <Card>
          <CardHeader>
            <CardTitle>Información Profesional</CardTitle>
            <CardDescription>Detalles sobre tu práctica veterinaria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Especialidades</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">Medicina Interna</Badge>
                  <Badge variant="secondary">Cirugía Menor</Badge>
                  <Badge variant="secondary">Dermatología</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Años de Experiencia</Label>
                <p className="mt-2 text-lg font-semibold">10+ años</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Licencia Profesional</Label>
                <p className="mt-2">MVP-2024-001234</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Horario de Atención</Label>
                <p className="mt-2">
                  Lun-Vie: 8:00-18:00
                  <br />
                  Sáb: 8:00-14:00
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {user.role === "client" && (
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Atención</CardTitle>
            <CardDescription>Configura tus preferencias para el cuidado de tus mascotas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Doctor Preferido</Label>
                <p className="mt-2">Dr. García</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Horario Preferido</Label>
                <p className="mt-2">Mañanas (9:00-12:00)</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Notificaciones</Label>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">✓ Recordatorios de citas</p>
                  <p className="text-sm">✓ Recordatorios de vacunas</p>
                  <p className="text-sm">✓ Promociones especiales</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Método de Contacto</Label>
                <p className="mt-2">Email y SMS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
