"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Payment {
  id: string
  clientName: string
  petName: string
  doctorName: string
  service: string
  amount: number
  date: string
  status: "pending" | "paid" | "overdue"
  paymentMethod?: string
  transactionId?: string
}

interface PaymentSystemProps {
  user: {
    id: string
    name: string
    email: string
    role: "client" | "doctor" | "admin"
  }
}

export default function PaymentSystem({ user }: PaymentSystemProps) {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      clientName: "Juan Pérez",
      petName: "Max",
      doctorName: "Dr. García",
      service: "Consulta General + Vacuna",
      amount: 85.0,
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: "2",
      clientName: "María López",
      petName: "Luna",
      doctorName: "Dr. Martínez",
      service: "Tratamiento Dermatológico",
      amount: 120.5,
      date: "2024-01-10",
      status: "paid",
      paymentMethod: "Tarjeta de Crédito",
      transactionId: "TXN-001234",
    },
    {
      id: "3",
      clientName: "Carlos Ruiz",
      petName: "Rocky",
      doctorName: "Dr. García",
      service: "Cirugía Menor",
      amount: 350.0,
      date: "2024-01-05",
      status: "overdue",
    },
  ])

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "paid":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "paid":
        return "Pagado"
      case "overdue":
        return "Vencido"
      default:
        return status
    }
  }

  const handlePayment = () => {
    if (selectedPayment) {
      const updatedPayment = {
        ...selectedPayment,
        status: "paid" as const,
        paymentMethod: "Tarjeta de Crédito",
        transactionId: `TXN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      }

      setPayments(payments.map((p) => (p.id === selectedPayment.id ? updatedPayment : p)))
      setIsPaymentDialogOpen(false)
      setSelectedPayment(null)
      setPaymentForm({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardName: "",
      })
    }
  }

  const filteredPayments = user.role === "client" ? payments.filter((p) => p.clientName === user.name) : payments

  const getTotalStats = () => {
    const total = filteredPayments.reduce((sum, p) => sum + p.amount, 0)
    const paid = filteredPayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
    const pending = filteredPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
    const overdue = filteredPayments.filter((p) => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0)

    return { total, paid, pending, overdue }
  }

  const stats = getTotalStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {user.role === "client" && "Mis Pagos"}
            {user.role === "doctor" && "Ingresos por Servicios"}
            {user.role === "admin" && "Gestión de Pagos"}
          </h2>
          <p className="text-gray-600">
            {user.role === "client" && "Gestiona los pagos de los servicios veterinarios"}
            {user.role === "doctor" && "Revisa los ingresos por tus consultas"}
            {user.role === "admin" && "Administra todos los pagos del sistema"}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">${stats.total.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pagado</p>
                <p className="text-2xl font-bold text-green-600">${stats.paid.toFixed(2)}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendiente</p>
                <p className="text-2xl font-bold text-yellow-600">${stats.pending.toFixed(2)}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vencido</p>
                <p className="text-2xl font-bold text-red-600">${stats.overdue.toFixed(2)}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">{payment.service}</h3>
                    <Badge className={getStatusColor(payment.status)}>{getStatusLabel(payment.status)}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Cliente:</span> {payment.clientName}
                    </div>
                    <div>
                      <span className="font-medium">Mascota:</span> {payment.petName}
                    </div>
                    <div>
                      <span className="font-medium">Doctor:</span> {payment.doctorName}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Fecha:</span> {new Date(payment.date).toLocaleDateString()}
                      {payment.transactionId && (
                        <span className="ml-4">
                          <span className="font-medium">ID Transacción:</span> {payment.transactionId}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">${payment.amount.toFixed(2)}</p>
                      {payment.paymentMethod && <p className="text-sm text-gray-600">{payment.paymentMethod}</p>}
                    </div>
                  </div>
                </div>

                {user.role === "client" && payment.status === "pending" && (
                  <div className="ml-4">
                    <Button
                      onClick={() => {
                        setSelectedPayment(payment)
                        setIsPaymentDialogOpen(true)
                      }}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pagar
                    </Button>
                  </div>
                )}

                {user.role === "admin" && payment.status === "pending" && (
                  <div className="ml-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const updatedPayment = { ...payment, status: "paid" as const }
                        setPayments(payments.map((p) => (p.id === payment.id ? updatedPayment : p)))
                      }}
                    >
                      Marcar como Pagado
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPayments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No hay pagos registrados</h3>
              <p className="text-gray-600">Los pagos aparecerán aquí cuando se generen servicios</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Procesar Pago</DialogTitle>
            <DialogDescription>
              {selectedPayment && `Pagar $${selectedPayment.amount.toFixed(2)} por ${selectedPayment.service}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentForm.cardNumber}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
              <Input
                id="cardName"
                placeholder="Juan Pérez"
                value={paymentForm.cardName}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentForm.expiryDate}
                  onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentForm.cvv}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                />
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full"
              disabled={!paymentForm.cardNumber || !paymentForm.cardName || !paymentForm.expiryDate || !paymentForm.cvv}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Procesar Pago ${selectedPayment?.amount.toFixed(2)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
