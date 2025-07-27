import React, { useState } from 'react';
import { 
  CreditCard, 
  X, 
  Lock, 
  Shield, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const PaymentModal = ({ isOpen, onClose, subscription, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'כרטיס אשראי',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '💳',
      description: 'תשלום מהיר ובטוח'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'תשלום מהיר עם Apple Pay'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: '🤖',
      description: 'תשלום מהיר עם Google Pay'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
    }, 3000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-studio-gray rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-studio-dark">
          <div className="flex items-center">
            <CreditCard className="w-6 h-6 text-white ml-2" />
            <h2 className="text-xl font-bold text-white">תשלום מאובטח</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Subscription Summary */}
          <div className="bg-studio-dark rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-2">סיכום הזמנה</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">מנוי {subscription.name}</span>
              <span className="text-white font-bold">₪{subscription.price}/חודש</span>
            </div>
            {subscription.isIntroPrice && (
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-400 line-through">₪{subscription.regularPrice}</span>
                <span className="text-xs text-green-400 mr-2">חיסכון של ₪{subscription.regularPrice - subscription.price}!</span>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-4">בחר אמצעי תשלום</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-studio-primary bg-studio-primary/10'
                      : 'border-studio-dark bg-studio-dark hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-studio-primary rounded-lg flex items-center justify-center mr-3">
                      {typeof method.icon === 'string' ? (
                        <span className="text-white text-lg">{method.icon}</span>
                      ) : (
                        <method.icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <div className="text-white font-medium">{method.name}</div>
                      <div className="text-gray-400 text-sm">{method.description}</div>
                    </div>
                    {paymentMethod === method.id && (
                      <CheckCircle className="w-5 h-5 text-studio-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentMethod === 'credit-card' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  מספר כרטיס
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                  maxLength={19}
                  className="bg-studio-dark border-studio-dark text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    תאריך תפוגה
                  </label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                    maxLength={5}
                    className="bg-studio-dark border-studio-dark text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CVV
                  </label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                    maxLength={4}
                    className="bg-studio-dark border-studio-dark text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  שם בעל הכרטיס
                </label>
                <Input
                  type="text"
                  placeholder="שם מלא"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  className="bg-studio-dark border-studio-dark text-white"
                />
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="bg-studio-dark rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-green-400 ml-2" />
              <span className="text-green-400 text-sm font-medium">תשלום מאובטח</span>
            </div>
            <p className="text-gray-400 text-xs">
              כל התשלומים מוצפנים ומאובטחים. המידע שלך מוגן על ידי SSL 256-bit.
            </p>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-12 text-lg font-semibold studio-gradient hover:studio-gradient-hover"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                מעבד תשלום...
              </div>
            ) : (
              <div className="flex items-center">
                <Lock className="w-5 h-5 ml-2" />
                שלם ₪{subscription.price}
              </div>
            )}
          </Button>

          {/* Terms */}
          <p className="text-gray-400 text-xs text-center mt-4">
            בלחיצה על "שלם" אתה מסכים ל
            <a href="#" className="text-studio-primary hover:underline">תנאי השימוש</a>
            ו
            <a href="#" className="text-studio-primary hover:underline">מדיניות הפרטיות</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 