"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stethoscope } from "lucide-react"
import Dashboard from "./dashboard"

type UserRole = "client" | "doctor" | "admin"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export default function VeterinaryApp() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    role: "" as UserRole | "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.email && loginForm.password && loginForm.role) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: loginForm.email.split("@")[0],
        email: loginForm.email,
        role: loginForm.role,
      }
      setCurrentUser(user)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setLoginForm({ email: "", password: "", role: "" })
  }

  if (currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">SPA VETERINARIO</CardTitle>
          <CardDescription>Sistema Integral de Gestión Veterinaria</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Tipo de Usuario</Label>
              <Select
                value={loginForm.role}
                onValueChange={(value: UserRole) => setLoginForm({ ...loginForm, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Cliente</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="admin">Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-2">Usuarios de prueba:</p>
            <div className="space-y-1 text-xs">
              <p>
                <strong>Cliente:</strong> cliente@test.com
              </p>
              <p>
                <strong>Doctor:</strong> doctor@test.com
              </p>
              <p>
                <strong>Admin:</strong> admin@test.com
              </p>
              <p className="text-gray-500">Contraseña: cualquiera</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
