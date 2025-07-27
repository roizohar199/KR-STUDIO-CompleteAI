import React from 'react';
import { AlertTriangle, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const PaymentAlert = ({ status = 'active', daysUntilExpiry = 30 }) => {
  const getAlertConfig = () => {
    switch (status) {
      case 'expired':
        return {
          icon: AlertTriangle,
          color: 'bg-red-500/10 border-red-500/20',
          textColor: 'text-red-400',
          title: 'המנוי פג תוקף',
          message: 'יש לחדש את המנוי כדי להמשיך להשתמש בשירות',
          action: 'חדש מנוי',
          actionColor: 'bg-red-500 hover:bg-red-600'
        };
      case 'expiring-soon':
        return {
          icon: Clock,
          color: 'bg-yellow-500/10 border-yellow-500/20',
          textColor: 'text-yellow-400',
          title: 'המנוי עומד לפוג',
          message: `המנוי יפוג בעוד ${daysUntilExpiry} ימים`,
          action: 'חדש עכשיו',
          actionColor: 'bg-yellow-500 hover:bg-yellow-600'
        };
      case 'payment-failed':
        return {
          icon: CreditCard,
          color: 'bg-red-500/10 border-red-500/20',
          textColor: 'text-red-400',
          title: 'תשלום נכשל',
          message: 'התשלום האחרון נכשל. יש לבדוק את אמצעי התשלום',
          action: 'עדכן תשלום',
          actionColor: 'bg-red-500 hover:bg-red-600'
        };
      case 'free-limit-reached':
        return {
          icon: AlertTriangle,
          color: 'bg-orange-500/10 border-orange-500/20',
          textColor: 'text-orange-400',
          title: 'הגעת למגבלת הפרויקטים',
          message: 'השתמשת בכל הפרויקטים הזמינים במנוי שלך. שדרג למנוי גבוה יותר להמשך שימוש',
          action: 'שדרג עכשיו',
          actionColor: 'bg-orange-500 hover:bg-orange-600'
        };
      default:
        return {
          icon: CheckCircle,
          color: 'bg-green-500/10 border-green-500/20',
          textColor: 'text-green-400',
          title: 'המנוי פעיל',
          message: 'כל התכונות זמינות לשימוש',
          action: null,
          actionColor: null
        };
    }
  };

  const config = getAlertConfig();
  const Icon = config.icon;

  if (status === 'active') {
    return null; // Don't show alert for active subscriptions
  }

  return (
    <div className={`p-4 rounded-lg border ${config.color} mb-6`}>
      <div className="flex items-start space-x-3 space-x-reverse">
        <Icon className={`w-5 h-5 mt-0.5 ${config.textColor}`} />
        <div className="flex-1">
          <h3 className={`font-medium ${config.textColor}`}>{config.title}</h3>
          <p className="text-gray-300 text-sm mt-1">{config.message}</p>
          {config.action && (
            <Button 
              className={`mt-3 ${config.actionColor} text-white`}
              size="sm"
            >
              {config.action}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentAlert; 