"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  CreditCard, Lock, Shield, ChevronLeft,
  Loader2, CheckCircle2, AlertCircle, Info,
  Banknote, WalletCards, PoundSterling, Eye, EyeOff,
  MapPin
} from "lucide-react"
import { cn } from "@/lib/utils"

const paymentTypes = [
  {
    id: "credit-card",
    name: "Credit Card",
    icon: CreditCard,
    description: "Pay with Visa, Mastercard, or American Express",
    brands: [
      { name: "visa", icon: Banknote },
      { name: "mastercard", icon: WalletCards },
      { name: "amex", icon: CreditCard }
    ]
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: PoundSterling,
    description: "Pay with your PayPal account",
    comingSoon: true
  }
]

const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g)
  const match = matches && matches[0] || ''
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' ')
  } else {
    return value
  }
}

const formatExpiry = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`
  }
  return v
}

const validateCard = (cardData) => {
  const errors = {}
  
  // Card number validation
  if (!cardData.number) {
    errors.number = 'Card number is required'
  } else if (cardData.number.replace(/\s/g, '').length !== 16) {
    errors.number = 'Invalid card number'
  }

  // Expiry validation
  if (!cardData.expiry) {
    errors.expiry = 'Expiry date is required'
  } else {
    const [month, year] = cardData.expiry.split('/')
    const now = new Date()
    const currentYear = now.getFullYear() % 100
    const currentMonth = now.getMonth() + 1

    if (parseInt(month) > 12 || parseInt(month) < 1) {
      errors.expiry = 'Invalid month'
    } else if (parseInt(year) < currentYear || 
              (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      errors.expiry = 'Card has expired'
    }
  }

  // CVC validation
  if (!cardData.cvc) {
    errors.cvc = 'CVC is required'
  } else if (cardData.cvc.length !== 3) {
    errors.cvc = 'Invalid CVC'
  }

  // Name validation
  if (!cardData.name) {
    errors.name = 'Cardholder name is required'
  }

  // Address validation
  if (!cardData.address.line1) {
    errors['address.line1'] = 'Address is required'
  }
  if (!cardData.address.city) {
    errors['address.city'] = 'City is required'
  }
  if (!cardData.address.state) {
    errors['address.state'] = 'State is required'
  }
  if (!cardData.address.postal_code) {
    errors['address.postal_code'] = 'Postal code is required'
  } else if (!/^\d{5}(-\d{4})?$/.test(cardData.address.postal_code)) {
    errors['address.postal_code'] = 'Invalid postal code'
  }

  return errors
}

// Add these input style constants
const inputStyles = {
  base: cn(
    "w-full px-4 py-3 rounded-xl", // Increased border radius
    "bg-secondary/50 border border-border/50",
    "focus:outline-none focus:ring-2 focus:ring-primary/20",
    "placeholder:text-muted-foreground/60",
    "transition-all duration-200"
  ),
  error: "border-red-500/50 focus:ring-red-500/20",
  icon: cn(
    "absolute right-3 top-1/2 -translate-y-1/2",
    "text-muted-foreground/60 hover:text-foreground",
    "transition-colors cursor-pointer"
  )
}

// Add this helper function to manage local storage
const localStorageKey = 'payment_methods'

const savePaymentMethod = (method) => {
  try {
    const existingMethods = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    const newMethods = [...existingMethods, method]
    localStorage.setItem(localStorageKey, JSON.stringify(newMethods))
    return true
  } catch (error) {
    console.error('Error saving payment method:', error)
    return false
  }
}

export default function AddPaymentMethodPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedType, setSelectedType] = useState("credit-card")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US"
    }
  })
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [showCVC, setShowCVC] = useState(false)

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000)
  }

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setCardData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setCardData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateCard(cardData)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      showToast('Please check the form for errors', 'error')
      return
    }

    setIsLoading(true)
    try {
      // Create a new payment method object
      const newPaymentMethod = {
        id: `card_${Date.now()}`,
        type: selectedType,
        brand: detectCardBrand(cardData.number), // Add this helper function
        last4: cardData.number.slice(-4),
        expMonth: parseInt(cardData.expiry.split('/')[0]),
        expYear: parseInt('20' + cardData.expiry.split('/')[1]),
        isDefault: false,
        billingDetails: {
          name: cardData.name,
          address: cardData.address
        },
        createdAt: new Date().toISOString()
      }

      // Save to localStorage
      const saved = savePaymentMethod(newPaymentMethod)
      
      if (saved) {
        showToast('Payment method added successfully')
        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push('/dashboard/billing/payment-methods')
      } else {
        throw new Error('Failed to save payment method')
      }
    } catch (error) {
      console.error('Error:', error)
      showToast('Failed to add payment method', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Add helper function to detect card brand
  const detectCardBrand = (number) => {
    const cleaned = number.replace(/\D/g, '')
    
    if (/^4/.test(cleaned)) {
      return 'visa'
    } else if (/^5[1-5]/.test(cleaned)) {
      return 'mastercard'
    } else if (/^3[47]/.test(cleaned)) {
      return 'amex'
    } else if (/^6(?:011|5)/.test(cleaned)) {
      return 'discover'
    }
    return 'unknown'
  }

  // Add card brand icon component
  const CardBrandIcon = ({ number }) => {
    const brand = detectCardBrand(number)
    const iconClasses = "h-6 w-6"
    
    switch (brand) {
      case 'visa':
        return <div className="text-blue-500"><Banknote className={iconClasses} /></div>
      case 'mastercard':
        return <div className="text-red-500"><WalletCards className={iconClasses} /></div>
      case 'amex':
        return <div className="text-green-500"><CreditCard className={iconClasses} /></div>
      default:
        return <div className="text-muted-foreground"><CreditCard className={iconClasses} /></div>
    }
  }

  // Add this to the card number input section
  const renderCardNumberInput = () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Card Number</label>
      <div className="relative">
        <input
          type="text"
          value={cardData.number}
          onChange={(e) => handleInputChange("number", formatCardNumber(e.target.value))}
          maxLength="19"
          placeholder="1234 5678 9012 3456"
          className={cn(
            inputStyles.base,
            errors.number && inputStyles.error
          )}
        />
        <div className={inputStyles.icon}>
          <CardBrandIcon number={cardData.number} />
        </div>
      </div>
      {errors.number && (
        <div className="text-sm text-red-500">{errors.number}</div>
      )}
    </div>
  )

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Payment Methods
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Add Payment Method
            </h1>
            <p className="text-muted-foreground">
              Add a new payment method to your account
            </p>
          </div>
        </div>

        {/* Payment Type Selection */}
        <div className="grid gap-4 sm:grid-cols-2">
          {paymentTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType(type.id)}
              disabled={type.comingSoon}
              className={cn(
                "relative p-6 rounded-xl border text-left",
                "transition-all duration-200",
                selectedType === type.id 
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "bg-card hover:border-primary/20",
                type.comingSoon && "opacity-60 cursor-not-allowed"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  selectedType === type.id ? "bg-primary/10" : "bg-secondary"
                )}>
                  <type.icon className={cn(
                    "h-6 w-6",
                    selectedType === type.id ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{type.name}</span>
                    {type.comingSoon && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                  {type.brands && (
                    <div className="flex items-center gap-2 mt-3">
                      {type.brands.map((brand) => (
                        <div
                          key={brand.name}
                          className="p-1.5 rounded-lg bg-secondary"
                        >
                          <brand.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Enhanced Card Form */}
        <AnimatePresence mode="wait">
          {selectedType === "credit-card" && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Card Details Section */}
              <div className="rounded-xl border bg-card overflow-hidden">
                <div className="border-b p-4 sm:p-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Card Details
                  </h3>
                </div>

                <div className="p-4 sm:p-6 space-y-6">
                  {renderCardNumberInput()}

                  {/* Expiry and CVC */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiry Date</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => handleInputChange("expiry", formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={cn(
                          inputStyles.base,
                          errors.expiry && inputStyles.error
                        )}
                      />
                      {errors.expiry && (
                        <div className="text-sm text-red-500">{errors.expiry}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">CVC</label>
                      <div className="relative">
                        <input
                          type={showCVC ? "text" : "password"}
                          value={cardData.cvc}
                          onChange={(e) => handleInputChange("cvc", e.target.value.slice(0, 3))}
                          placeholder="123"
                          maxLength="3"
                          className={cn(
                            inputStyles.base,
                            errors.cvc && inputStyles.error
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCVC(!showCVC)}
                          className={inputStyles.icon}
                        >
                          {showCVC ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.cvc && (
                        <div className="text-sm text-red-500">{errors.cvc}</div>
                      )}
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Doe"
                      className={cn(
                        inputStyles.base,
                        errors.name && inputStyles.error
                      )}
                    />
                    {errors.name && (
                      <div className="text-sm text-red-500">{errors.name}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing Address Section */}
              <div className="rounded-xl border bg-card overflow-hidden">
                <div className="border-b p-4 sm:p-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Billing Address
                  </h3>
                </div>

                <div className="p-4 sm:p-6 space-y-6">
                  {/* Street Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Street Address</label>
                    <input
                      type="text"
                      value={cardData.address.line1}
                      onChange={(e) => handleInputChange("address.line1", e.target.value)}
                      placeholder="123 Main St"
                      className={cn(
                        inputStyles.base,
                        errors['address.line1'] && inputStyles.error
                      )}
                    />
                    {errors['address.line1'] && (
                      <div className="text-sm text-red-500">{errors['address.line1']}</div>
                    )}
                  </div>

                  {/* City, State, ZIP Grid */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    {/* City */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <input
                        type="text"
                        value={cardData.address.city}
                        onChange={(e) => handleInputChange("address.city", e.target.value)}
                        placeholder="San Francisco"
                        className={cn(
                          inputStyles.base,
                          errors['address.city'] && inputStyles.error
                        )}
                      />
                      {errors['address.city'] && (
                        <div className="text-sm text-red-500">{errors['address.city']}</div>
                      )}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">State</label>
                      <select
                        value={cardData.address.state}
                        onChange={(e) => handleInputChange("address.state", e.target.value)}
                        className={cn(
                          inputStyles.base,
                          errors['address.state'] && inputStyles.error
                        )}
                      >
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        {/* Add more states */}
                      </select>
                      {errors['address.state'] && (
                        <div className="text-sm text-red-500">{errors['address.state']}</div>
                      )}
                    </div>

                    {/* ZIP Code */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ZIP Code</label>
                      <input
                        type="text"
                        value={cardData.address.postal_code}
                        onChange={(e) => handleInputChange("address.postal_code", e.target.value)}
                        placeholder="94111"
                        maxLength="10"
                        className={cn(
                          inputStyles.base,
                          errors['address.postal_code'] && inputStyles.error
                        )}
                      />
                      {errors['address.postal_code'] && (
                        <div className="text-sm text-red-500">{errors['address.postal_code']}</div>
                      )}
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <select
                      value={cardData.address.country}
                      onChange={(e) => handleInputChange("address.country", e.target.value)}
                      className={cn(inputStyles.base)}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      {/* Add more countries */}
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className={cn(
                "flex items-start gap-3 p-4 rounded-xl",
                "bg-secondary/50 border border-border/50"
              )}>
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <div className="font-medium">Secure Payment Processing</div>
                  <div className="text-sm text-muted-foreground">
                    Your payment information is encrypted and securely processed. We never store your full card details.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-sm font-medium",
                    "border border-border/50 hover:bg-secondary/80",
                    "transition-colors duration-200"
                  )}
                >
                  Cancel
                </button>
                
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "px-6 py-2.5 rounded-xl",
                    "bg-primary text-primary-foreground",
                    "text-sm font-medium",
                    "hover:opacity-90 transition-opacity",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "flex items-center gap-2"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Add Payment Method
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={cn(
                "fixed bottom-4 right-4 z-50",
                "px-4 py-2 rounded-xl shadow-lg",
                "text-sm font-medium",
                toast.type === "error" 
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              )}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 